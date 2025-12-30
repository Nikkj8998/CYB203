import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    User,
    Eye,
    Tag,
    ImageIcon
} from 'lucide-react';
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
import { toast } from 'sonner';
import { api } from '../services/api';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    tags?: string;
    excerpt: string;
    content: string;
    status: 'published' | 'draft';
    type: string;
    author: string;
    author_linkedin?: string;
    author_title?: string;
    author_photo?: string;
    created_at: string;
    updated_at?: string;
    views: number;
    featured_image?: string;
    include_in_sitemap?: boolean;
}

export const ContentDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        if (id) {
            loadPost();
        }
    }, [id]);

    const loadPost = async () => {
        try {
            setLoading(true);
            const response = await api.blogs.getById(parseInt(id!));
            if (response.success) {
                setPost(response.data);
            } else {
                toast.error('Failed to load post');
                navigate('/admin/content');
            }
        } catch (error) {
            toast.error('Error loading post');
            console.error(error);
            navigate('/admin/content');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!post) return;

        try {
            const response = await api.blogs.delete(post.id);
            if (response.success) {
                toast.success('Post deleted successfully');
                navigate('/admin/content');
            } else {
                toast.error('Failed to delete post');
            }
        } catch (error) {
            toast.error('Error deleting post');
            console.error(error);
        }
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (!post) {
        return <div className="text-center py-12">Post not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/admin/content">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Blog Details</h1>
                        <p className="text-gray-500 mt-1">View and manage blog post</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link to={`/admin/content/edit/${post.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Main Content Card */}
            <Card>
                <CardHeader className="space-y-4">
                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="w-full max-h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Title and Badges */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                            </Badge>
                            <Badge variant="outline">{post.type}</Badge>
                            {post.include_in_sitemap && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    In Sitemap
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-500">Author</p>
                                <p className="font-medium text-gray-900">{post.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-500">Created</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-500">Views</p>
                                <p className="font-medium text-gray-900">{post.views}</p>
                            </div>
                        </div>
                        {post.tags && (
                            <div className="flex items-center gap-2 text-sm">
                                <Tag className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-500">Tags</p>
                                    <p className="font-medium text-gray-900">{post.tags}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Slug */}
                    {post.slug && (
                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-500">URL Slug</p>
                            <p className="font-mono text-sm bg-gray-50 px-3 py-2 rounded border border-gray-200 mt-1">
                                /{post.type}/{post.slug}
                            </p>
                        </div>
                    )}
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Excerpt */}
                    {post.excerpt && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excerpt</h3>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {post.excerpt}
                            </p>
                        </div>
                    )}

                    {/* Content */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Content</h3>
                        <div
                            className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Author Details */}
                    {(post.author_title || post.author_linkedin || post.author_photo) && (
                        <div className="pt-6 border-t">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Details</h3>
                            <div className="flex items-start gap-4">
                                {post.author_photo ? (
                                    <img
                                        src={post.author_photo}
                                        alt={post.author}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-900">{post.author}</p>
                                    {post.author_title && (
                                        <p className="text-sm text-gray-600">{post.author_title}</p>
                                    )}
                                    {post.author_linkedin && (
                                        <a
                                            href={post.author_linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Last Updated */}
                    {post.updated_at && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
                            <Calendar className="h-4 w-4" />
                            <span>
                                Last updated: {new Date(post.updated_at).toLocaleString()}
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post "{post.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
