import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  MapPin, 
  Briefcase, 
  Loader2, 
  Clock, 
  ChevronRight, 
  Search,
  Calendar,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-500 font-medium">Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            Career Management
          </h1>
          <p className="text-gray-500 mt-1">Design and publish professional job opportunities for your team.</p>
        </div>
        <Button asChild className="shadow-sm">
          <Link to="/admin/jobs/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Post New Opening
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm max-w-md">
        <div className="pl-3 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
        <Input 
          placeholder="Search by title or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 px-0 h-9"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="border-dashed border-2 bg-gray-50/50">
          <CardContent className="py-20 text-center">
            <div className="mx-auto h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
              <Briefcase className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No positions found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              {searchTerm ? "We couldn't find any jobs matching your search." : "Your talent pipeline is empty. Start by posting your first career opportunity."}
            </p>
            {!searchTerm && (
              <Button asChild variant="outline" className="bg-white">
                <Link to="/admin/jobs/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post First Job
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 relative">
              <div className="flex flex-col lg:flex-row">
                <div className={`w-2 h-full absolute left-0 top-0 bottom-0 ${job.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <div className="flex-1 p-6 lg:p-8 pl-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {job.title}
                        </h2>
                        <Badge 
                          variant={job.status === 'active' ? 'default' : 'secondary'}
                          className={`uppercase tracking-wider text-[10px] font-bold px-2.5 py-0.5 ${
                            job.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50' 
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                            <MapPin className="h-3.5 w-3.5" />
                          </div>
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600">
                            <Layers className="h-3.5 w-3.5" />
                          </div>
                          {job.type}
                        </div>
                        {job.experience && (
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-amber-50 text-amber-600">
                              <Clock className="h-3.5 w-3.5" />
                            </div>
                            {job.experience}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-gray-50 text-gray-600">
                            <Calendar className="h-3.5 w-3.5" />
                          </div>
                          {new Date(job.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-start">
                      <Button variant="outline" size="icon" asChild className="h-10 w-10 rounded-xl bg-white hover:bg-primary/5 hover:text-primary border-gray-200">
                        <Link to={`/admin/jobs/edit/${job.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteId(job.id)}
                        className="h-10 w-10 rounded-xl bg-white text-red-500 hover:text-white hover:bg-red-500 border-gray-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden">
                          <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-full flex items-center justify-center">
                            {String.fromCharCode(64 + i)}
                          </div>
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                        +12
                      </div>
                      <span className="ml-4 text-xs font-medium text-gray-400 self-center">Applications received</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5 font-semibold group/btn">
                      <Link to={`/admin/jobs/edit/${job.id}`}>
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
          <AlertDialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <AlertDialogTitle className="text-center text-xl font-bold">Delete Job Posting?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action cannot be undone. This will permanently remove the position.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-3 pt-4">
            <AlertDialogCancel className="rounded-xl border-gray-200 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
