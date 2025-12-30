import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Facebook, Linkedin, Mail, MessageCircle, Share2, Loader2, Clipboard } from "lucide-react";
import { toast } from "sonner";
import Header from "./Header";
import Footer from "./Footer";
import { API_BASE_URL } from "@/config/api";
import BlogSEO from "@/SEO/BlogSEO";

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  type: string;
  author: string;
  author_linkedin?: string;
  author_title?: string;
  author_photo?: string;
  featured_image: string;
  views: number;
  created_at: string;
  updated_at: string;
  tags?: string;

  // SEO Fields
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_author?: string;
  robots?: string;

  // Geo Location
  geo_region?: string;
  geo_placename?: string;
  geo_position?: string;
  geo_icbm?: string;

  // Open Graph
  og_type?: string;
  og_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_site_name?: string;

  // Twitter
  twitter_card_type?: string;
  twitter_url?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;

  // Canonical & Alternate
  canonical_url?: string;
  alternate_hreflang_en?: string;
  alternate_hreflang_default?: string;

  // Schema
  schema_organization?: string;
  schema_website?: string;
  schema_breadcrumb?: string;
  schema_article?: string;
  schema_faq?: string;

  // Analytics
  google_analytics_id1?: string;
  google_analytics_id2?: string;
}

interface Comment {
  id: number;
  blog_post_id: number;
  name: string;
  email: string;
  comment: string;
  status: string;
  created_at: string;
}

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  slug?: string;
  featured_image: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug, id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toc, setToc] = useState<Array<{ text: string; id: string }>>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [commentFormData, setCommentFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [authorPhotoError, setAuthorPhotoError] = useState(false);
  const [photoRetryKey, setPhotoRetryKey] = useState(0);
  const defaultImage = 'https://placehold.co/600x400'; // Or your preferred default image URL
  // Helper function to normalize image URLs to absolute paths
  const normalizeImageUrl = (url?: string): string => {
    if (!url) return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
    
    console.log('Normalizing image URL:', url);
    
    // If already a complete URL, return as-is
    if (url.startsWith('http')) return url;
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    let normalizedUrl = url.startsWith('/') ? url : '/' + url;
    
    // Handle legacy paths
    if (normalizedUrl.includes('/lovable-uploads/')) {
      normalizedUrl = normalizedUrl.replace('/lovable-uploads/', '/public/uploads/');
    }
    
    // Convert /uploads/ to /public/uploads/ if needed
    if (normalizedUrl.startsWith('/uploads/') && !normalizedUrl.startsWith('/public/uploads/')) {
      normalizedUrl = normalizedUrl.replace('/uploads/', '/public/uploads/');
    }
    
    // For filename only (no directory), prepend /public/uploads/
    if (!normalizedUrl.includes('/uploads/') && normalizedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      normalizedUrl = '/public/uploads/' + normalizedUrl.replace(/^\//, '');
    }
    
    const finalUrl = baseUrl + normalizedUrl;
    console.log('Final normalized URL:', finalUrl);
    return finalUrl;
  };

  // Reset author photo error and retry key when the photo URL changes
  useEffect(() => {
    setAuthorPhotoError(false);
    setPhotoRetryKey(0);
  }, [post?.author_photo]);

  // Retry loading author photo every 10 seconds if it failed
  useEffect(() => {
    if (!authorPhotoError || !post?.author_photo) return;

    const retryTimer = setTimeout(() => {
      setPhotoRetryKey(prev => prev + 1);
    }, 10000);

    return () => clearTimeout(retryTimer);
  }, [authorPhotoError, post?.author_photo]);

  // Fetch blog post from API (supports both slug and id)
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug && !id) return;

      try {
        setLoading(true);
        // Use slug if available (new format), otherwise use id (legacy format)
        const queryParam = slug ? `slug=${encodeURIComponent(slug)}` : `id=${id}`;
        const response = await fetch(`${API_BASE_URL}/public-blogs.php?${queryParam}`);

        // Get response as text first, then try to parse as JSON
        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          console.error('Response text:', text);
          throw new Error('Invalid response from server. Please check your database configuration.');
        }

        if (!response.ok) {
          throw new Error(data.error || data.message || 'Failed to fetch blog post');
        }

        if (data.success && data.data) {
          console.log('Blog post data received:', data.data);
          
          // Process the content to handle any encoding issues
          let processedContent = data.data.content || '';
          
          // Decode HTML entities if needed
          const tempElement = document.createElement('div');
          tempElement.innerHTML = processedContent;
          processedContent = tempElement.innerHTML;
          
          // Process image URLs within content
          processedContent = processedContent.replace(
            /src="(\/[^"]*\.(jpg|jpeg|png|gif|webp))"/gi,
            (match, src) => {
              const normalizedSrc = normalizeImageUrl(src);
              return `src="${normalizedSrc}"`;
            }
          );
          
          // Ensure featured image URL is properly formatted
          const processedPost = {
            ...data.data,
            featured_image: data.data.featured_image ? normalizeImageUrl(data.data.featured_image) : null,
            content: processedContent,
            excerpt: data.data.excerpt || '',
            title: data.data.title || 'Untitled',
            author: data.data.author || 'Cybaem Tech',
            tags: data.data.tags || ''
          };
          
          console.log('Processed blog post:', processedPost);
          setPost(processedPost);
        } else {
          setError(data.error || data.message || 'Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, id]);

  // Fetch approved comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return;

      try {
        const response = await fetch(`${API_BASE_URL}/comments.php?blog_id=${post.id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setComments(data.data);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [post?.id]);

  // Fetch related posts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post?.id || !post?.type) return;

      try {
        const response = await fetch(`${API_BASE_URL}/public-blogs.php`);
        const data = await response.json();

        if (data.success && data.data) {
          const filtered = data.data
            .filter((p: RelatedPost) => p.id !== post.id)
            .slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    fetchRelatedPosts();
  }, [post?.id, post?.type]);

  // Handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!post?.id) return;

    setSubmittingComment(true);

    try {
      const response = await fetch(`${API_BASE_URL}/comments.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blog_post_id: parseInt(post.id),
          name: commentFormData.name,
          email: commentFormData.email,
          comment: commentFormData.comment
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Comment submitted successfully! It will be visible after admin approval.');
        setCommentFormData({ name: '', email: '', comment: '' });
      } else {
        toast.error(data.message || 'Failed to submit comment');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      toast.error('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Extract headings from content to build dynamic TOC
  useEffect(() => {
    if (post?.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const headings = tempDiv.querySelectorAll('h2');
      const tocItems = Array.from(headings).map(heading => ({
        text: heading.textContent || '',
        id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || ''
      }));
      setToc(tocItems);
    }
  }, [post]);

  // Add IDs to h2 headings in the rendered content for TOC navigation
  useEffect(() => {
    if (toc.length > 0) {
      const contentDiv = document.querySelector('.prose');
      if (contentDiv) {
        const headings = contentDiv.querySelectorAll('h2');
        headings.forEach((heading, index) => {
          if (toc[index]) {
            heading.id = toc[index].id;
          }
        });
      }
    }
  }, [toc, post]);

  // Get current page URL
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const postTitle = post?.title || '';
  const postExcerpt = post?.excerpt || '';

  // Share functions
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' - ' + currentUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postExcerpt + '\n\n' + currentUrl)}`;
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('Link copied to clipboard');
    } catch (err) {
      console.error('Copy failed', err);
      toast.error('Failed to copy link');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto py-16 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Blog post not found.</h2>
          <p className="text-gray-600">{error || 'The article you are looking for does not exist.'}</p>
          <Link to="/resources" className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition">
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 scroll-smooth">
      {post && <BlogSEO post={post} />}
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Main Content Card with Shadow */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{post.title}</h1>

          {/* Author Info Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                {post.author_photo ? (
                  <>
                    <img
                      key={`author-photo-${photoRetryKey}`}
                      src={normalizeImageUrl(post.author_photo)}
                      alt={post.author || "Author"}
                      className={`w-12 h-12 rounded-full object-cover border-2 border-primary ${authorPhotoError ? 'hidden' : 'block'}`}
                      onError={() => setAuthorPhotoError(true)}
                      onLoad={() => setAuthorPhotoError(false)}
                    />
                    {authorPhotoError && (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-2 border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-gray-900">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center border-2 border-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-gray-900">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                {post.author_linkedin ? (
                  <a
                    href={post.author_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {post.author}
                  </a>
                ) : (
                  <div className="text-gray-900 font-semibold">
                    {post.author}
                  </div>
                )}
                {post.author_title && (
                  <div className="text-gray-600 text-sm">{post.author_title}</div>
                )}
              </div>
            </div>

            {/* Date and Views */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views} views</span>
              </div>
            </div>
          </div>

          {/* Share Article Section - Colorful Icons */}
          <div className="flex items-center gap-3 mb-6 py-3 border-t border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share Article</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={shareOnFacebook}
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#1565D8] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#094D92] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={shareViaEmail}
                className="w-9 h-9 rounded-full bg-[#0078D4] hover:bg-[#005A9E] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                title="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button
                onClick={copyLinkToClipboard}
                className="w-9 h-9 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                title="Copy link"
                aria-label="Copy link"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </div>
          </div>

          <img 
            src={post.featured_image || normalizeImageUrl(post.featured_image) || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'} 
            alt={post.title} 
            className="w-full h-72 object-cover rounded-xl mb-8 shadow-md"
            onError={(e) => {
              console.log('Image load error for:', post.featured_image);
              e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
            }}
          />
          <div 
            className="prose prose-lg mb-8 text-gray-800 [&_h2]:font-bold [&_h2]:underline [&_h2]:decoration-primary [&_h2]:underline-offset-4 [&_h2]:mb-4 [&_h2]:mt-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md" 
            dangerouslySetInnerHTML={{ 
              __html: post.content && post.content.trim() !== '' 
                ? post.content 
                : '<p class="text-gray-500 italic">Content is being loaded...</p>' 
            }} 
          />
          {/* Debug information in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-4 bg-gray-100 rounded">
              <summary className="cursor-pointer text-sm font-semibold">Debug Info</summary>
              <pre className="mt-2 text-xs overflow-auto">
                Content length: {post.content?.length || 0}<br/>
                Featured image: {post.featured_image}<br/>
                Raw content preview: {post.content?.substring(0, 200) || 'No content'}
              </pre>
            </details>
          )}
          {/* Tags Section */}
          {post.tags && post.tags.trim() !== '' && (
            <div className="bg-gray-100 border border-gray-200 rounded p-4 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, index) => {
                  const trimmedTag = tag.trim();
                  return trimmedTag ? (
                    <span
                      key={index}
                      className="bg-primary/10 hover:bg-primary/20 text-primary text-sm px-3 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      {trimmedTag}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Display Approved Comments */}
          {comments.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-100 border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{comment.name}</div>
                        <div className="text-xs text-gray-600">
                          {new Date(comment.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comment Section */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Leave a Comment</h3>
            </div>
            <p className="text-gray-600 mb-6">We'd love to hear your thoughts! Share your feedback below.</p>
            <form onSubmit={handleCommentSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={commentFormData.name}
                    onChange={(e) => setCommentFormData({ ...commentFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={commentFormData.email}
                    onChange={(e) => setCommentFormData({ ...commentFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comment <span className="text-primary">*</span>
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  required
                  value={commentFormData.comment}
                  onChange={(e) => setCommentFormData({ ...commentFormData, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>
              <button
                type="submit"
                disabled={submittingComment}
                className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                {submittingComment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Post Comment'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Related Blogs Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={relatedPost.slug ? `/blog-post/${relatedPost.slug}` : `/blog/${relatedPost.id}`}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={normalizeImageUrl(relatedPost.featured_image)}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase shadow-md">
                        {relatedPost.type || 'Blog'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">
                      {new Date(relatedPost.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
