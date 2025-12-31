import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MapPin, 
  Briefcase, 
  Loader2, 
  Clock, 
  ChevronRight, 
  Search,
  Calendar,
  Building2,
  RefreshCw,
  Filter,
  CheckSquare,
  Square,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  experience?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  status: string;
  created_at: string;
}

export const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.jobs.getAll();
      if (response.success && response.data) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.jobs.delete(id);
      if (response.success) {
        toast.success('Job deleted successfully');
        fetchJobs();
      } else {
        toast.error(response.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    } finally {
      setDeleteId(null);
    }
  };

  const handleBulkDelete = async () => {
    try {
      // In a real app, we'd have a bulk delete API. 
      // For now, we'll delete one by one as we did in JobApplications or assume an API exists.
      // Since functionality shouldn't change, I'll stick to what's available or pattern used elsewhere.
      const deletePromises = selectedJobs.map(id => api.jobs.delete(id));
      await Promise.all(deletePromises);
      toast.success(`Deleted ${selectedJobs.length} jobs successfully`);
      setSelectedJobs([]);
      setBulkDeleteDialogOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete some jobs');
    }
  };

  const toggleSelectJob = (id: number) => {
    setSelectedJobs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(j => j.id));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-gray-500 font-medium">Loading career opportunities...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Career Management</h1>
            <p className="text-gray-500">Post and manage job opportunities for your team</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchJobs}
              className="hidden sm:flex"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button asChild>
              <Link to="/admin/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm ring-1 ring-gray-200">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {selectedJobs.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setBulkDeleteDialogOpen(true)}
                    className="h-10 px-4"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedJobs.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[40px] pl-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSelectAll}
                        className="h-8 w-8 text-gray-400 hover:text-primary"
                      >
                        {selectedJobs.length === filteredJobs.length && filteredJobs.length > 0 ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">Position</TableHead>
                    <TableHead className="font-semibold text-gray-900">Location</TableHead>
                    <TableHead className="font-semibold text-gray-900">Type</TableHead>
                    <TableHead className="font-semibold text-gray-900">Experience</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900">Posted Date</TableHead>
                    <TableHead className="text-right pr-6 font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all' ? "No jobs match your filters." : "No job postings found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs.map((job) => (
                      <TableRow 
                        key={job.id} 
                        className={`hover:bg-gray-50/50 transition-colors ${selectedJobs.includes(job.id) ? 'bg-blue-50/30' : ''}`}
                      >
                        <TableCell className="pl-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSelectJob(job.id)}
                            className={`h-8 w-8 ${selectedJobs.includes(job.id) ? 'text-primary' : 'text-gray-300'}`}
                          >
                            {selectedJobs.includes(job.id) ? (
                              <CheckSquare className="h-4 w-4" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="h-3 w-3" />
                            {job.experience || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium bg-gray-50 text-gray-600 border-gray-200">
                            {job.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {job.experience || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              job.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            } text-[10px] font-bold uppercase tracking-wider`}
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(job.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/jobs/edit/${job.id}`} className="flex items-center">
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Job
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => setDeleteId(job.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialogs */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job posting. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Jobs</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedJobs.length} selected job postings? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
