import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Check, X, Trash2, MessageSquare } from 'lucide-react';
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setLoading(true);
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
        toast.success('Comment approved');
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
        toast.success('Comment deleted');
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
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comment Moderation</h1>
          <p className="text-gray-500 mt-1">Review and manage blog comments</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{comments.length} total</span>
          </div>
          <Badge variant="secondary">{pendingCount} pending</Badge>
          <Badge variant="default">{approvedCount} approved</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search comments by name, email, or content..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border rounded-md min-w-[140px]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredComments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No comments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.name}</span>
                        <span className="text-sm text-gray-500 truncate">{comment.email}</span>
                        <Badge 
                          variant={
                            comment.status === 'approved' ? 'default' : 
                            comment.status === 'pending' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {comment.status}
                        </Badge>
                      </div>
                      {comment.blog_title && (
                        <div className="text-sm text-gray-600 mb-2">
                          On: <span className="font-medium">{comment.blog_title}</span>
                        </div>
                      )}
                      <p className="text-gray-700 mt-2 break-words">{comment.comment}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(comment.created_at).toLocaleString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 lg:flex-shrink-0">
                      {comment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(comment.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 flex-1 sm:flex-initial"
                          >
                            <Check className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Approve</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(comment.id)}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 flex-1 sm:flex-initial"
                          >
                            <X className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Reject</span>
                          </Button>
                        </>
                      )}
                      {comment.status === 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(comment.id)}
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 flex-1 sm:flex-initial"
                        >
                          <X className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Unapprove</span>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteId(comment.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
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
  );
};
