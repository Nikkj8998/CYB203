import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Check, 
  X, 
  Trash2, 
  MessageSquare, 
  Filter, 
  RefreshCw,
  User,
  Mail,
  FileText,
  Calendar,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/config/api';
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

interface Comment {
  id: number;
  blog_post_id: number;
  blog_title?: string;
  name: string;
  email: string;
  comment: string;
  status: string;
  created_at: string;
}

export const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);
      
      const response = await fetch(`${API_BASE_URL}/comments.php`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      } else {
        toast.error('Failed to load comments');
      }
    } catch (error) {
      toast.error('Error loading comments');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments.php?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, status: 'approved' } : comment
        ));
        toast.success('Comment approved successfully');
      } else {
        toast.error('Failed to approve comment');
      }
    } catch (error) {
      toast.error('Error approving comment');
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments.php?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, status: 'rejected' } : comment
        ));
        toast.success('Comment rejected');
      } else {
        toast.error('Failed to reject comment');
      }
    } catch (error) {
      toast.error('Error rejecting comment');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments.php?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setComments(comments.filter(comment => comment.id !== id));
        setDeleteId(null);
        toast.success('Comment permanently deleted');
      } else {
        toast.error('Failed to delete comment');
      }
    } catch (error) {
      toast.error('Error deleting comment');
      console.error(error);
    }
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.blog_title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || comment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = comments.filter(c => c.status === 'pending').length;
  const approvedCount = comments.filter(c => c.status === 'approved').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Comment Moderation
          </h1>
          <p className="text-gray-500 mt-1">Manage engagement and maintain quality in your blog discussions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Pending</span>
              <span className="text-lg font-bold text-amber-600 leading-none">{pendingCount}</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Approved</span>
              <span className="text-lg font-bold text-emerald-600 leading-none">{approvedCount}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadComments(true)} 
            disabled={refreshing}
            className="rounded-xl h-11 px-4 bg-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Filter by author, email, or content..." 
            className="pl-10 h-11 rounded-xl bg-white border-gray-100 shadow-sm focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 ml-2" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] h-11 rounded-xl bg-white border-gray-100 shadow-sm">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Comments</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <Card className="border-dashed border-2 bg-gray-50/50">
          <CardContent className="py-20 text-center">
            <div className="mx-auto h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
              <MessageSquare className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find any comments matching your current filters or search criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredComments.map((comment) => (
            <Card key={comment.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row min-h-[140px]">
                <div className={`w-1.5 lg:w-2 ${
                  comment.status === 'approved' ? 'bg-emerald-500' : 
                  comment.status === 'pending' ? 'bg-amber-500' : 
                  'bg-red-400'
                }`} />
                
                <div className="flex-1 p-6 lg:p-7 flex flex-col">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-sm">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-900 text-lg">{comment.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                          <Mail className="h-3.5 w-3.5" />
                          {comment.email}
                        </div>
                        <Badge 
                          variant="outline"
                          className={`uppercase tracking-wider text-[10px] font-bold px-2.5 py-0.5 border-none ${
                            comment.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 
                            comment.status === 'pending' ? 'bg-amber-50 text-amber-700' : 
                            'bg-red-50 text-red-700'
                          }`}
                        >
                          {comment.status}
                        </Badge>
                      </div>

                      {comment.blog_title && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <FileText className="h-4 w-4 text-gray-300" />
                          Article: <span className="text-primary hover:underline cursor-pointer">{comment.blog_title}</span>
                        </div>
                      )}

                      <div className="relative pl-4 border-l-2 border-gray-100">
                        <p className="text-gray-700 leading-relaxed italic break-words">
                          "{comment.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(comment.created_at).toLocaleString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-center gap-2 self-end lg:self-start">
                      {comment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-100 rounded-xl px-4 h-10 w-full lg:w-32"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(comment.id)}
                            className="border-gray-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100 rounded-xl px-4 h-10 w-full lg:w-32"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      {comment.status === 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(comment.id)}
                          className="border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl px-4 h-10 w-full lg:w-32"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Suspend
                        </Button>
                      )}
                      {comment.status === 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(comment.id)}
                          className="border-gray-200 hover:bg-emerald-50 text-emerald-600 rounded-xl px-4 h-10 w-full lg:w-32"
                        >
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Re-approve
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(comment.id)}
                        className="h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
            <AlertDialogTitle className="text-center text-xl font-bold">Remove Comment?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action will permanently delete the comment. You cannot undo this once confirmed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-3 pt-4">
            <AlertDialogCancel className="rounded-xl border-gray-200">Cancel</AlertDialogCancel>
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
