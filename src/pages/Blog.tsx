import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User, ArrowRight, Mail, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  tags?: string;
  excerpt: string;
  content: string;
  type: string;
  author: string;
  featured_image: string;
  views: number;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (url?: string): string => {
    if (!url || url === '') {
      return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
    }
    
    console.log('Blog.tsx - Normalizing image URL:', url);
    
    // If already a complete URL, return as-is
    if (url.startsWith('http')) {
      return url;
    }
    
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
    
    const baseUrl = window.location.origin;
    const finalUrl = baseUrl + normalizedUrl;
    console.log('Blog.tsx - Final normalized URL:', finalUrl);
    return finalUrl;
  };

  const categories = [
    "All Posts",
    "Cybersecurity",
    "AI & Machine Learning",
    "Business Strategy",
    "Cloud Computing",
    "Digital Transformation"
  ];

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/public-blogs.php`);
        const data = await response.json();

        console.log('Blog API response:', data);

        if (data.success && data.data) {
          // Process the posts to ensure proper formatting
          const processedPosts = data.data.map((post: any) => ({
            ...post,
            featured_image: post.featured_image ? getImageUrl(post.featured_image) : null,
            excerpt: post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No excerpt available'),
            title: post.title || 'Untitled',
            author: post.author || 'Cybaem Tech',
            slug: post.slug || post.id.toString()
          }));

          console.log('Processed blog posts:', processedPosts);
          setPosts(processedPosts);
        } else {
          console.error('API response error:', data);
          setError('Failed to load blog posts');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "All Posts" || post.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, posts]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">CT</span>
              </div>
              <h1 className="text-2xl font-bold">CybaemTech Blog</h1>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Technology <span className="text-primary">Insights</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the latest trends in cybersecurity, AI, digital transformation, and innovative
                technology solutions from our expert team.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-gray-600">Loading articles...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                    <div className="relative">
                      <img
                        src={getImageUrl(post.featured_image)}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          console.error('Image failed to load:', getImageUrl(post.featured_image));
                          const target = e.currentTarget as HTMLImageElement;
                          // Try alternative paths before falling back to default
                          if (target.src.includes('/public/uploads/')) {
                            // Try without public prefix
                            const altUrl = target.src.replace('/public/uploads/', '/uploads/');
                            console.log('Trying alternative URL:', altUrl);
                            target.src = altUrl;
                          } else {
                            // Use fallback image
                            target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
                            target.alt = 'Default blog image';
                          }
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', getImageUrl(post.featured_image));
                        }}
                      />
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{post.type}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>👤 {post.author}</span>
                        <span>📅 {formatDate(post.created_at)}</span>
                        <span>👁️ {post.views} views</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-3 flex-1">{post.excerpt}</p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.split(',').map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-800 text-white px-3 py-1 rounded"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link to={`/${post.type.toLowerCase().replace(/\s+/g, '-')}/${(post.slug || post.id).toString().replace(/\s+/g, '')}`} className="text-blue-600 hover:underline mt-auto inline-flex items-center gap-1">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Posts");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Technology Insights</h3>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest articles on cybersecurity, AI, and digital transformation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
