import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourcesHero from "@/components/ResourcesHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, Clock, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [resourcesRef, resourcesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});

  // Helper function to normalize image URLs
  const normalizeImageUrl = (url?: string): string => {
    if (!url) return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80";
    if (url.startsWith('http')) return url;
    
    // Clean the URL
    let normalizedUrl = url.trim();
    
    // Ensure it starts with /
    if (!normalizedUrl.startsWith('/')) {
      normalizedUrl = '/' + normalizedUrl;
    }
    
    // Convert /uploads/ to /public/uploads/ if needed
    if (normalizedUrl.startsWith('/uploads/')) {
      normalizedUrl = normalizedUrl.replace('/uploads/', '/public/uploads/');
    } else if (!normalizedUrl.startsWith('/public/uploads/')) {
      // If it's just a filename, add the full path
      const filename = normalizedUrl.replace(/^\//, '');
      normalizedUrl = `/public/uploads/${filename}`;
    }
    
    console.log('Image URL normalized:', { original: url, normalized: normalizedUrl });
    return normalizedUrl;
  };

  // Fetch all resources from database
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public-blogs.php`);
        const data = await response.json();

        console.log('Fetched blog data:', data);

        if (data.success && data.data) {
          // Transform database posts to match the existing format
          const transformedPosts = data.data.map((post: any) => {
            console.log('Processing post:', post.id, 'Title:', post.title, 'Image:', post.featured_image);
            const normalizedImage = post.featured_image ? normalizeImageUrl(post.featured_image) : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80";
            console.log('Normalized image URL:', normalizedImage);
            
            return {
              id: post.id.toString(),
              title: post.title || 'Untitled',
              slug: post.slug || post.id.toString(),
              type: post.type || 'Blog Post',
              excerpt: post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No excerpt available'),
              content: post.content || '',
              author: post.author || "Cybaem Tech",
              date: new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }),
              readTime: Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(' ').length || 100) / 200) + " min read",
              image: normalizedImage,
              category: post.type === "Blog Post" ? "Blog" : post.type || "Blog",
              tags: post.tags ? post.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [],
              featured: false
            };
          });

          console.log('Transformed posts:', transformedPosts);
          setBlogPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Handle ePaper download
  const handleDownloadEPaper = (ePaper: any) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = ePaper.downloadUrl;
    link.download = `${ePaper.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // All resources come from database only
  const allResources = blogPosts;

  // Filter resources
  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags && resource.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesType = selectedType === "All" || resource.category === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType, blogPosts]);

  return (
    <div className="min-h-screen bg-black">



      <Header />

      <ResourcesHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Resources Grid */}
      <section
        ref={resourcesRef}
        className={`py-16 md:py-20 transition-all duration-1000 ${resourcesInView ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Count */}
            <div className="mb-8 text-gray-300">
              <p className="text-lg">
                Showing <span className="text-cyan-400 font-semibold">{filteredResources.length}</span> {selectedType === "All" ? "resources" : selectedType.toLowerCase() + "s"}
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
              </div>
            )}

            {/* Resources Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, index) => (
                  <Card
                    key={`${resource.category}-${resource.id}`}
                    className={`bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group overflow-hidden ${resourcesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden bg-gray-900 min-h-[192px] flex items-center justify-center">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 bg-gray-800 block"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image failed to load:', resource.image);
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src.includes('/public/uploads/')) {
                            const altUrl = target.src.replace('/public/uploads/', '/uploads/');
                            console.log('Trying alternative URL:', altUrl);
                            target.src = altUrl;
                          } else {
                            console.log('Using fallback image');
                            target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80';
                            target.alt = 'Default blog image';
                          }
                          setImageLoadingStates(prev => ({ ...prev, [resource.id]: false }));
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', resource.image);
                          setImageLoadingStates(prev => ({ ...prev, [resource.id]: false }));
                        }}
                      />
                      {/* Loading placeholder */}
                      <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500 transition-opacity duration-300 ${imageLoadingStates[resource.id] !== false ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <svg className="w-8 h-8 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className={`${resource.category === "Blog" ? "bg-blue-600" :
                          resource.category === "Case Study" ? "bg-cyan-600" :
                            "bg-teal-600"
                          } text-white`}>
                          {resource.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {resource.date}
                        </span>
                        {'readTime' in resource && resource.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {resource.readTime}
                          </span>
                        )}
                        {'pages' in resource && resource.pages && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {resource.pages}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {resource.title}
                      </h3>

                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {resource.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags && resource.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                          <span key={`${resource.id}-tag-${tagIndex}`} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {resource.category === "Blog" ? (
                        <Button
                          asChild
                          className="w-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        >
                          <Link to={`/${resource.type?.toLowerCase().replace(/\s+/g, '-') || 'blog'}/${(resource.slug || resource.id).replace(/\s+/g, '')}`}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Blog
                          </Link>
                        </Button>
                      ) : resource.category === "ePaper" ? (
                        null
                      ) : (
                        <Button
                          asChild
                          className="w-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        >
                          <Link to={`/${resource.type?.toLowerCase().replace(/\s+/g, '-') || 'case-study'}/${(resource.slug || resource.id).replace(/\s+/g, '')}`}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Case Study
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredResources.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-4">
                    No resources found matching your criteria.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("All");
                    }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Expert Guidance?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our solutions can help transform your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
            >
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 backdrop-blur-sm"
            >
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
