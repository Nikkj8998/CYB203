import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  CheckCircle2,
  FileText,
  Calendar,
  MapPin,
  Briefcase,
  X,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { api } from '../services/api';

interface JobApplication {
  id: number;
  job_id: number;
  job_title: string;
  department: string;
  location: string;
  type: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  years_of_experience: string;
  current_company?: string;
  current_role?: string;
  notice_period: string;
  expected_salary?: string;
  cover_letter?: string;
  resume_path: string;
  status: string;
  created_at: string;
}

export const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      
      const response = await api.jobApplications.getAll();
      
      if (!response.success && response.authenticated === false) {
        toast.error('Please login to access this page');
        navigate('/admin/login');
        return;
      }
      
      if (response.success && response.data) {
        setApplications(response.data);
      } else {
        setApplications([]);
        toast.error(response.message || 'Failed to load job applications');
      }
    } catch (error) {
      setApplications([]);
      toast.error('Error loading job applications');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleViewApplication = (application: JobApplication) => {
    setSelectedApplication(application);
    setViewDialogOpen(true);
  };

  const handleDownloadResume = (id: number, fullName: string) => {
    const downloadUrl = api.jobApplications.downloadResume(id);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Resume_${fullName.replace(/\s/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Resume download started');
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await api.jobApplications.updateStatus(id, status);
      
      if (!response.success && response.authenticated === false) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
        return;
      }
      
      if (response.success) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status } : app
        ));
        toast.success('Application status updated');
      } else {
        toast.error(response.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.jobApplications.delete(id);
      
      if (!response.success && response.authenticated === false) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
        return;
      }
      
      if (response.success) {
        setApplications(applications.filter(app => app.id !== id));
        setDeleteId(null);
        toast.success('Application deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete application');
      }
    } catch (error) {
      toast.error('Error deleting application');
      console.error(error);
    }
  };

  const handleCallApplicant = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${name}...`);
  };

  const handleEmailApplicant = (email: string, name: string, jobTitle: string) => {
    const subject = encodeURIComponent(`Regarding your application for ${jobTitle}`);
    const body = encodeURIComponent(`Dear ${name},\n\nThank you for applying for the ${jobTitle} position at Cybaem Tech.\n\n`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.job_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.phone || '').includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const statusConfigs: Record<string, { color: string, label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      reviewed: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Reviewed' },
      shortlisted: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Shortlisted' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' },
      contacted: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Contacted' }
    };
    
    const config = statusConfigs[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', label: status };
    
    return (
      <Badge className={`${config.color} border text-xs px-2 py-1 font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Job Applications</h1>
            <p className="text-gray-500">Manage and review all job applications</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => loadApplications(false)}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, phone, or job title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Applications will appear here once candidates apply'}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedApplications.map((application) => (
                        <TableRow key={application.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">#{application.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{application.full_name || 'N/A'}</span>
                              <span className="text-xs text-gray-500">{application.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{application.job_title || 'N/A'}</span>
                              <span className="text-xs text-gray-500">{application.department}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(application.created_at)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={application.status}
                              onValueChange={(value) => handleStatusChange(application.id, value)}
                            >
                              <SelectTrigger className="h-8 w-[130px] text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCallApplicant(application.phone, application.full_name)}
                                title="Call"
                              >
                                <Phone className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEmailApplicant(application.email, application.full_name, application.job_title)}
                                title="Email"
                              >
                                <Mail className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewApplication(application)}
                                title="View Details"
                              >
                                <Eye className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDownloadResume(application.id, application.full_name)}
                                title="Download Resume"
                              >
                                <Download className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setDeleteId(application.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* View Application Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Complete information about the applicant
              </DialogDescription>
            </DialogHeader>
            
            {selectedApplication && (
              <div className="space-y-6 mt-4">
                {/* Applicant Info */}
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Full Name</p>
                      <p className="font-medium text-gray-900">{selectedApplication.full_name}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Email</p>
                      <p className="font-medium text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Phone</p>
                      <p className="font-medium text-gray-900">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">LinkedIn</p>
                      {selectedApplication.linkedin_url ? (
                        <a 
                          href={selectedApplication.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          View Profile
                        </a>
                      ) : (
                        <p className="text-gray-400">Not provided</p>
                      )}
                    </div>
                    {selectedApplication.portfolio_url && (
                      <div className="md:col-span-2">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Portfolio</p>
                        <a 
                          href={selectedApplication.portfolio_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium break-all"
                        >
                          {selectedApplication.portfolio_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Info */}
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-blue-900">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Job Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-blue-600/70 font-semibold">Position</p>
                      <p className="font-medium text-blue-900">{selectedApplication.job_title}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-blue-600/70 font-semibold">Department</p>
                      <p className="font-medium text-blue-900">{selectedApplication.department}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-blue-600/70 font-semibold">Location</p>
                      <p className="font-medium text-blue-900 inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {selectedApplication.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-blue-600/70 font-semibold">Job Type</p>
                      <p className="font-medium text-blue-900">{selectedApplication.type}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="bg-green-50/50 rounded-lg p-4 border border-green-100">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-900">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/70 font-semibold">Experience</p>
                      <p className="font-medium text-green-900">{selectedApplication.years_of_experience}</p>
                    </div>
                    {selectedApplication.current_company && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-green-600/70 font-semibold">Current Company</p>
                        <p className="font-medium text-green-900">{selectedApplication.current_company}</p>
                      </div>
                    )}
                    {selectedApplication.current_role && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-green-600/70 font-semibold">Current Role</p>
                        <p className="font-medium text-green-900">{selectedApplication.current_role}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/70 font-semibold">Notice Period</p>
                      <p className="font-medium text-green-900">{selectedApplication.notice_period}</p>
                    </div>
                    {selectedApplication.expected_salary && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-green-600/70 font-semibold">Expected Salary</p>
                        <p className="font-medium text-green-900">{selectedApplication.expected_salary}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover Letter */}
                {selectedApplication.cover_letter && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-600" />
                      Cover Letter
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-6 border-t mt-6">
                  <Button
                    onClick={() => handleCallApplicant(selectedApplication.phone, selectedApplication.full_name)}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Applicant
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleEmailApplicant(selectedApplication.email, selectedApplication.full_name, selectedApplication.job_title)}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadResume(selectedApplication.id, selectedApplication.full_name)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this job application and the associated resume file. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
