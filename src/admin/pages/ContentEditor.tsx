import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from 'sonner';
import {
  ArrowLeft, Save, Upload, Loader2, Globe, Search, ChevronDown, ChevronUp, Eye,
  FileText, Tag, Share2, Twitter, Facebook, Link2, Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { RichTextEditor } from '../components/RichTextEditor';

interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  tags?: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  type: string;
  author: string;
  authorLinkedIn?: string;
  authorTitle?: string;
  authorPhoto?: string;
  date: string;
  views: number;
  image?: string;
  includeInSitemap?: boolean;

  // Basic SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaAuthor?: string;
  robots?: string;

  // Geo Location
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  geoIcbm?: string;

  // Open Graph (complete)
  ogType?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogSiteName?: string;

  // Twitter Card (complete)
  twitterCardType?: string;
  twitterUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;

  // Canonical & Alternate
  canonicalUrl?: string;
  alternateHreflangEn?: string;
  alternateHreflangDefault?: string;

  // Schema Markups (JSON strings)
  schemaOrganization?: string;
  schemaWebsite?: string;
  schemaBreadcrumb?: string;
  schemaArticle?: string;
  schemaFaq?: string;

  // Analytics
  googleAnalyticsId1?: string;
  googleAnalyticsId2?: string;
}

export const ContentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorPhotoInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingAuthorPhoto, setUploadingAuthorPhoto] = useState(false);

  const ogImageInputRef = useRef<HTMLInputElement>(null);
  const twitterImageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSeoImage, setUploadingSeoImage] = useState(false);

  const [formData, setFormData] = useState<BlogPost>({
    id: Date.now(),
    title: '',
    slug: '',
    tags: '',
    excerpt: '',
    content: '',
    status: 'draft',
    type: 'Blog Post',
    author: 'admin (Rohan bhosale)',
    authorLinkedIn: '',
    authorTitle: 'CEO @ CybaemTech',
    authorPhoto: '',
    date: new Date().toISOString().split('T')[0],
    views: 0,
    image: '',
    includeInSitemap: true,

    // Basic SEO
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaAuthor: '',
    robots: 'index, follow',

    // Geo Location
    geoRegion: 'IN-MH',
    geoPlacename: 'Pune',
    geoPosition: '18.5204;73.8567',
    geoIcbm: '18.5204, 73.8567',

    // Open Graph
    ogType: 'article',
    ogUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogSiteName: 'Cybaem Tech',

    // Twitter Card
    twitterCardType: 'summary_large_image',
    twitterUrl: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',

    // Canonical & Alternate
    canonicalUrl: '',
    alternateHreflangEn: '',
    alternateHreflangDefault: '',

    // Schema Markups
    schemaOrganization: '',
    schemaWebsite: '',
    schemaBreadcrumb: '',
    schemaArticle: '',
    schemaFaq: '',

    // Analytics
    googleAnalyticsId1: '',
    googleAnalyticsId2: ''
  });

  const [seoOpen, setSeoOpen] = useState(false);
  const [showSeoPreview, setShowSeoPreview] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const response = await api.blogs.getById(parseInt(id));
          if (response.success && response.data) {
            setFormData({
              id: response.data.id,
              title: response.data.title,
              slug: response.data.slug || '',
              tags: response.data.tags || '',
              excerpt: response.data.excerpt,
              content: response.data.content,
              status: response.data.status,
              type: response.data.type,
              author: response.data.author,
              authorLinkedIn: response.data.author_linkedin || '',
              authorTitle: response.data.author_title || '',
              authorPhoto: response.data.author_photo || '',
              date: response.data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
              views: response.data.views || 0,
              image: response.data.featured_image || '',
              includeInSitemap: response.data.include_in_sitemap !== 0,
              metaTitle: response.data.meta_title || '',
              metaDescription: response.data.meta_description || '',
              metaKeywords: response.data.meta_keywords || '',
              ogTitle: response.data.og_title || '',
              ogDescription: response.data.og_description || '',
              ogImage: response.data.og_image || '',
              ogType: response.data.og_type || 'article',
              ogUrl: response.data.og_url || '',
              ogSiteName: response.data.og_site_name || 'Cybaem Tech',
              twitterCardType: response.data.twitter_card_type || 'summary_large_image',
              twitterUrl: response.data.twitter_url || '',
              twitterTitle: response.data.twitter_title || '',
              twitterDescription: response.data.twitter_description || '',
              twitterImage: response.data.twitter_image || '',
              canonicalUrl: response.data.canonical_url || '',
              metaAuthor: response.data.meta_author || '',
              robots: response.data.robots || 'index, follow',
              geoRegion: response.data.geo_region || 'IN-MH',
              geoPlacename: response.data.geo_placename || 'Pune',
              geoPosition: response.data.geo_position || '18.5204;73.8567',
              geoIcbm: response.data.geo_icbm || '18.5204, 73.8567',
              alternateHreflangEn: response.data.alternate_hreflang_en || '',
              alternateHreflangDefault: response.data.alternate_hreflang_default || '',
              schemaOrganization: response.data.schema_organization || '',
              schemaWebsite: response.data.schema_website || '',
              schemaBreadcrumb: response.data.schema_breadcrumb || '',
              schemaArticle: response.data.schema_article || '',
              schemaFaq: response.data.schema_faq || '',
              googleAnalyticsId1: response.data.google_analytics_id1 || '',
              googleAnalyticsId2: response.data.google_analytics_id2 || ''
            });
          }
        } catch (error) {
          console.error('Failed to load post:', error);
          toast.error('Failed to load post');
        }
      };
      fetchPost();
    }
  }, [id, isEditing]);

  const handleSeoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'ogImage' | 'twitterImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingSeoImage(true);
      // Use a unique filename prefix based on field
      const prefix = field === 'ogImage' ? 'og_' : 'twitter_';
      const fileName = `${prefix}${file.name.split('.')[0]}`;

      const response = await api.media.uploadFile(file, fileName);

      if (response.success && response.data?.url) {
        handleChange(field, response.data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading image');
    } finally {
      setUploadingSeoImage(false);
      // Reset input
      if (field === 'ogImage' && ogImageInputRef.current) ogImageInputRef.current.value = '';
      if (field === 'twitterImage' && twitterImageInputRef.current) twitterImageInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let blogId = isEditing ? parseInt(id!) : null;
      let response;

      // 1. Save Blog Post (Content only)
      if (isEditing) {
        response = await api.blogs.update(blogId!, formData);
      } else {
        response = await api.blogs.create(formData);
        if (response.success && response.id) {
          blogId = response.id;
        }
      }

      if (response.success) {
        // 2. Save SEO Data (if blog post saved successfully)
        if (blogId) {
          try {
            const seoData = {
              blog_post_id: blogId,
              meta_title: formData.metaTitle,
              meta_description: formData.metaDescription,
              meta_keywords: formData.metaKeywords,
              meta_author: formData.metaAuthor,
              robots: formData.robots,
              geo_region: formData.geoRegion,
              geo_placename: formData.geoPlacename,
              geo_position: formData.geoPosition,
              geo_icbm: formData.geoIcbm,
              og_type: formData.ogType,
              og_url: formData.ogUrl,
              og_title: formData.ogTitle,
              og_description: formData.ogDescription,
              og_image: formData.ogImage,
              og_site_name: formData.ogSiteName,
              twitter_card_type: formData.twitterCardType,
              twitter_url: formData.twitterUrl,
              twitter_title: formData.twitterTitle,
              twitter_description: formData.twitterDescription,
              twitter_image: formData.twitterImage,
              canonical_url: formData.canonicalUrl,
              alternate_hreflang_en: formData.alternateHreflangEn,
              alternate_hreflang_default: formData.alternateHreflangDefault,
              schema_organization: formData.schemaOrganization,
              schema_website: formData.schemaWebsite,
              schema_breadcrumb: formData.schemaBreadcrumb,
              schema_article: formData.schemaArticle,
              schema_faq: formData.schemaFaq,
              google_analytics_id1: formData.googleAnalyticsId1,
              google_analytics_id2: formData.googleAnalyticsId2
            };

            // Use fetch directly to call the new SEO API
            await fetch('/backend/api/seo-metatags.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(seoData),
            });

          } catch (seoError) {
            console.error('Error saving SEO data:', seoError);
            toast.warning('Blog saved, but SEO data update failed');
          }

          // 3. If blog is published, generate static HTML and update config
          if (formData.status === 'published') {
            try {
              const publishResponse = await fetch(`/backend/api/blog-publisher.php?action=generate-blog&blog_id=${blogId}`, {
                method: 'POST'
              });
              const publishData = await publishResponse.json();

              if (publishData.success) {
                toast.success('Blog published! Static HTML generated.');
              } else {
                console.warn('HTML generation warning:', publishData.error);
                toast.info('Blog saved but HTML generation had an issue. Check server logs.');
              }
            } catch (publishError) {
              console.error('Error generating blog HTML:', publishError);
              toast.warning('Blog saved, but HTML generation failed. It will be generated on next publish.');
            }
          }
        }

        toast.success(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
        navigate('/admin/content');
      } else {
        toast.error(response.message || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('An error occurred while saving the post');
    }
  };

  const handleChange = (field: keyof BlogPost, value: string | boolean) => {
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        title: value as string,
        slug: prev.slug === '' || !isEditing ? (value as string).replace(/\s+/g, '') : prev.slug
      }));
    } else if (field === 'includeInSitemap') {
      setFormData(prev => ({ ...prev, includeInSitemap: value === 'true' || value === true }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      const fileName = file.name.split('.')[0];
      const response = await api.media.uploadFile(file, fileName);

      if (response.success && response.data?.url) {
        setFormData(prev => ({ ...prev, image: response.data.url }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(response.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading the image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAuthorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingAuthorPhoto(true);
      const fileName = `author_${file.name.split('.')[0]}`;
      const response = await api.media.uploadFile(file, fileName);

      if (response.success && response.data?.url) {
        setFormData(prev => ({ ...prev, authorPhoto: response.data.url }));
        toast.success('Author photo uploaded successfully!');
      } else {
        toast.error(response.message || 'Failed to upload author photo');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading the author photo');
    } finally {
      setUploadingAuthorPhoto(false);
      if (authorPhotoInputRef.current) {
        authorPhotoInputRef.current.value = '';
      }
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/content')} className="flex-shrink-0 mt-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {isEditing ? 'Update your blog post' : 'Write a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Manual URL</Label>
                  <Input
                    id="slug"
                    placeholder="e-commerce-platform-scaling (leave empty for auto-generated)"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Custom URL slug for this post. Leave empty to auto-generate from title.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Cloud Migration, Finance, Digital Transformation"
                    value={formData.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Add tags separated by commas (e.g., Cloud Migration, Finance, Digital Transformation)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your post"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleChange('content', value)}
                    placeholder="Write your post content here..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Case Study">Case Study</SelectItem>
                      <SelectItem value="White Paper">White Paper</SelectItem>
                      <SelectItem value="eBook">eBook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="admin (Rohan bhosale)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorLinkedIn">Author LinkedIn Profile</Label>
                  <Input
                    id="authorLinkedIn"
                    value={formData.authorLinkedIn}
                    onChange={(e) => handleChange('authorLinkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                  <p className="text-xs text-gray-500">
                    LinkedIn profile URL for the author (optional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorTitle">Author Position/Title</Label>
                  <Input
                    id="authorTitle"
                    value={formData.authorTitle}
                    onChange={(e) => handleChange('authorTitle', e.target.value)}
                    placeholder="CEO @ CybaemTech"
                  />
                  <p className="text-xs text-gray-500">
                    Author's position or title (e.g., "CEO @ CybaemTech")
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorPhoto">Author Photo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="authorPhoto"
                      placeholder="https://example.com/author-photo.jpg"
                      value={formData.authorPhoto}
                      onChange={(e) => handleChange('authorPhoto', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => authorPhotoInputRef.current?.click()}
                      disabled={uploadingAuthorPhoto}
                    >
                      {uploadingAuthorPhoto ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </Button>
                    <input
                      ref={authorPhotoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAuthorPhotoUpload}
                      className="hidden"
                    />
                  </div>
                  {formData.authorPhoto && (
                    <div className="mt-2">
                      <img
                        src={formData.authorPhoto}
                        alt="Author preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload author's profile photo (optional, will display admin icon by default)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded-md border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeInSitemap"
                      checked={formData.includeInSitemap || false}
                      onChange={(e) => handleChange('includeInSitemap', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <Label htmlFor="includeInSitemap" className="cursor-pointer flex items-center gap-2">
                        <Globe className="h-4 w-4 text-cyan-600" />
                        Include in Sitemap
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        Include this blog post in sitemap.xml for search engines
                      </p>
                    </div>
                  </div>
                </div>

                {/* SEO Settings Toggle Button - Stays in sidebar */}
                <div className="space-y-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant={seoOpen ? "default" : "outline"}
                    onClick={() => setSeoOpen(!seoOpen)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>SEO Settings</span>
                    </div>
                    {seoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    {seoOpen ? 'Click to hide' : 'Click to configure'} SEO metadata
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Submit buttons stay in sidebar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button type="submit" className="flex-1 w-full">
                <Save className="mr-2 h-4 w-4" />
                Submit
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/content')} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* SEO Settings Section - Full Width Below Grid */}
        {seoOpen && (
          <div className="mt-6">
            <Card className="overflow-hidden border-2 border-cyan-300 shadow-lg">
              <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
                <CardHeader className="pb-3 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border-b">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-400 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
                          <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-lg shadow-lg">
                            <Search className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            SEO Settings
                            <Sparkles className="h-4 w-4 text-cyan-600" />
                          </CardTitle>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Optimize for search engines and social media
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {seoOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-cyan-600 transition-colors" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-cyan-600 transition-colors" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-6 pt-6">
                    {/* Basic SEO Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-cyan-100">
                        <div className="bg-cyan-100 p-1.5 rounded-md">
                          <FileText className="h-4 w-4 text-cyan-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Basic SEO</h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="metaTitle" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-cyan-600" />
                            Meta Title
                          </Label>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${(formData.metaTitle?.length || 0) > 60
                            ? 'bg-red-100 text-red-700'
                            : (formData.metaTitle?.length || 0) > 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                            }`}>
                            {formData.metaTitle?.length || 0}/60
                          </span>
                        </div>
                        <Input
                          id="metaTitle"
                          placeholder="Custom SEO title (defaults to post title if empty)"
                          value={formData.metaTitle}
                          onChange={(e) => handleChange('metaTitle', e.target.value)}
                          maxLength={60}
                          className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          Recommended: 50-60 characters for optimal display
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="metaDescription" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-cyan-600" />
                            Meta Description
                          </Label>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${(formData.metaDescription?.length || 0) > 160
                            ? 'bg-red-100 text-red-700'
                            : (formData.metaDescription?.length || 0) > 150
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                            }`}>
                            {formData.metaDescription?.length || 0}/160
                          </span>
                        </div>
                        <Textarea
                          id="metaDescription"
                          placeholder="SEO description for search results (defaults to excerpt if empty)"
                          value={formData.metaDescription}
                          onChange={(e) => handleChange('metaDescription', e.target.value)}
                          rows={3}
                          maxLength={160}
                          className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          Recommended: 150-160 characters for best results
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaKeywords" className="text-sm font-medium flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-cyan-600" />
                          Meta Keywords
                        </Label>
                        <Input
                          id="metaKeywords"
                          placeholder="SEO keywords (comma-separated)"
                          value={formData.metaKeywords}
                          onChange={(e) => handleChange('metaKeywords', e.target.value)}
                          className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          Defaults to post tags if empty
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaAuthor" className="text-sm font-medium flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-cyan-600" />
                          Meta Author
                        </Label>
                        <Input
                          id="metaAuthor"
                          placeholder="Author name for meta tag"
                          value={formData.metaAuthor}
                          onChange={(e) => handleChange('metaAuthor', e.target.value)}
                          className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="robots" className="text-sm font-medium flex items-center gap-1.5">
                          <Search className="h-3.5 w-3.5 text-cyan-600" />
                          Robots Meta Tag
                        </Label>
                        <Input
                          id="robots"
                          placeholder="index, follow"
                          value={formData.robots}
                          onChange={(e) => handleChange('robots', e.target.value)}
                          className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                          Controls search engine indexing (e.g., "index, follow" or "noindex, nofollow")
                        </p>
                      </div>
                    </div>

                    {/* Geo Location Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-emerald-100">
                        <div className="bg-emerald-100 p-1.5 rounded-md">
                          <Globe className="h-4 w-4 text-emerald-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Geo Location (Local SEO)</h3>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="geoRegion" className="text-sm font-medium flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-emerald-600" />
                              Region
                            </Label>
                            <Input
                              id="geoRegion"
                              placeholder="IN-MH"
                              value={formData.geoRegion}
                              onChange={(e) => handleChange('geoRegion', e.target.value)}
                              className="bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="geoPlacename" className="text-sm font-medium flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-emerald-600" />
                              Place Name
                            </Label>
                            <Input
                              id="geoPlacename"
                              placeholder="Pune"
                              value={formData.geoPlacename}
                              onChange={(e) => handleChange('geoPlacename', e.target.value)}
                              className="bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="geoPosition" className="text-sm font-medium flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-emerald-600" />
                            Geo Position (Latitude;Longitude)
                          </Label>
                          <Input
                            id="geoPosition"
                            placeholder="18.5204;73.8567"
                            value={formData.geoPosition}
                            onChange={(e) => handleChange('geoPosition', e.target.value)}
                            className="bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="geoIcbm" className="text-sm font-medium flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-emerald-600" />
                            ICBM Coordinates (Latitude, Longitude)
                          </Label>
                          <Input
                            id="geoIcbm"
                            placeholder="18.5204, 73.8567"
                            value={formData.geoIcbm}
                            onChange={(e) => handleChange('geoIcbm', e.target.value)}
                            className="bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-100">
                        <div className="bg-blue-100 p-1.5 rounded-md">
                          <Share2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Open Graph (Social Media)</h3>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="ogTitle" className="text-sm font-medium flex items-center gap-1.5">
                            <Facebook className="h-3.5 w-3.5 text-blue-600" />
                            OG Title
                          </Label>
                          <Input
                            id="ogTitle"
                            placeholder="Title for social media sharing"
                            value={formData.ogTitle}
                            onChange={(e) => handleChange('ogTitle', e.target.value)}
                            maxLength={100}
                            className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ogDescription" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-blue-600" />
                            OG Description
                          </Label>
                          <Textarea
                            id="ogDescription"
                            placeholder="Description for social media sharing"
                            value={formData.ogDescription}
                            onChange={(e) => handleChange('ogDescription', e.target.value)}
                            rows={2}
                            maxLength={200}
                            className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ogImage" className="text-sm font-medium flex items-center gap-1.5">
                            <Upload className="h-3.5 w-3.5 text-blue-600" />
                            OG Image URL
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="ogImage"
                              placeholder="https://example.com/og-image.jpg"
                              value={formData.ogImage}
                              onChange={(e) => handleChange('ogImage', e.target.value)}
                              className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500 flex-1"
                            />
                            <input
                              type="file"
                              ref={ogImageInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleSeoImageUpload(e, 'ogImage')}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => ogImageInputRef.current?.click()}
                              disabled={uploadingSeoImage}
                              className="border-blue-200 hover:bg-blue-50 text-blue-600"
                            >
                              {uploadingSeoImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </Button>
                          </div>
                          {formData.ogImage && (
                            <div className="mt-2 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-blue-200">
                              <img
                                src={formData.ogImage}
                                alt="OG Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                              />
                            </div>
                          )}
                          <p className="text-xs text-blue-700 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            Defaults to featured image (1200x630px recommended)
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ogType" className="text-sm font-medium flex items-center gap-1.5">
                              <FileText className="h-3.5 w-3.5 text-blue-600" />
                              OG Type
                            </Label>
                            <Input
                              id="ogType"
                              placeholder="article"
                              value={formData.ogType}
                              onChange={(e) => handleChange('ogType', e.target.value)}
                              className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="ogSiteName" className="text-sm font-medium flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-blue-600" />
                              OG Site Name
                            </Label>
                            <Input
                              id="ogSiteName"
                              placeholder="Cybaem Tech"
                              value={formData.ogSiteName}
                              onChange={(e) => handleChange('ogSiteName', e.target.value)}
                              className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ogUrl" className="text-sm font-medium flex items-center gap-1.5">
                            <Link2 className="h-3.5 w-3.5 text-blue-600" />
                            OG URL
                          </Label>
                          <Input
                            id="ogUrl"
                            placeholder="https://www.cybaemtech.com/blog/post-slug"
                            value={formData.ogUrl}
                            onChange={(e) => handleChange('ogUrl', e.target.value)}
                            className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                          <p className="text-xs text-blue-700 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            Canonical URL for Open Graph (auto-generated if empty)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Twitter Card Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-sky-100">
                        <div className="bg-sky-100 p-1.5 rounded-md">
                          <Twitter className="h-4 w-4 text-sky-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Twitter Card</h3>
                      </div>

                      <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-lg border border-sky-200">
                        <div className="space-y-2">
                          <Label htmlFor="twitterCardType" className="text-sm font-medium flex items-center gap-1.5">
                            <Twitter className="h-3.5 w-3.5 text-sky-600" />
                            Twitter Card Type
                          </Label>
                          <Select value={formData.twitterCardType || 'summary_large_image'} onValueChange={(value) => handleChange('twitterCardType', value)}>
                            <SelectTrigger className="bg-white border-sky-200 focus:border-sky-500 focus:ring-sky-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="summary">Summary</SelectItem>
                              <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterTitle" className="text-sm font-medium flex items-center gap-1.5">
                            <Twitter className="h-3.5 w-3.5 text-sky-600" />
                            Twitter Title
                          </Label>
                          <Input
                            id="twitterTitle"
                            placeholder="Title for Twitter card"
                            value={formData.twitterTitle}
                            onChange={(e) => handleChange('twitterTitle', e.target.value)}
                            className="bg-white border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterDescription" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-sky-600" />
                            Twitter Description
                          </Label>
                          <Textarea
                            id="twitterDescription"
                            placeholder="Description for Twitter card"
                            value={formData.twitterDescription}
                            onChange={(e) => handleChange('twitterDescription', e.target.value)}
                            rows={2}
                            className="bg-white border-sky-200 focus:border-sky-500 focus:ring-sky-500 resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterImage" className="text-sm font-medium flex items-center gap-1.5">
                            <Upload className="h-3.5 w-3.5 text-sky-600" />
                            Twitter Image URL
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="twitterImage"
                              placeholder="https://example.com/twitter-image.jpg"
                              value={formData.twitterImage}
                              onChange={(e) => handleChange('twitterImage', e.target.value)}
                              className="bg-white border-sky-200 focus:border-sky-500 focus:ring-sky-500 flex-1"
                            />
                            <input
                              type="file"
                              ref={twitterImageInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleSeoImageUpload(e, 'twitterImage')}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => twitterImageInputRef.current?.click()}
                              disabled={uploadingSeoImage}
                              className="border-sky-200 hover:bg-sky-50 text-sky-600"
                            >
                              {uploadingSeoImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </Button>
                          </div>
                          {formData.twitterImage && (
                            <div className="mt-2 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-sky-200">
                              <img
                                src={formData.twitterImage}
                                alt="Twitter Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterUrl" className="text-sm font-medium flex items-center gap-1.5">
                            <Link2 className="h-3.5 w-3.5 text-sky-600" />
                            Twitter URL
                          </Label>
                          <Input
                            id="twitterUrl"
                            placeholder="https://www.cybaemtech.com/blog/post-slug"
                            value={formData.twitterUrl}
                            onChange={(e) => handleChange('twitterUrl', e.target.value)}
                            className="bg-white border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-indigo-100">
                        <div className="bg-indigo-100 p-1.5 rounded-md">
                          <Link2 className="h-4 w-4 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Advanced</h3>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="canonicalUrl" className="text-sm font-medium flex items-center gap-1.5">
                            <Link2 className="h-3.5 w-3.5 text-indigo-600" />
                            Canonical URL
                          </Label>
                          <Input
                            id="canonicalUrl"
                            placeholder="https://www.cybaemtech.com/blog-post/your-post"
                            value={formData.canonicalUrl}
                            onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                            className="bg-white border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <p className="text-xs text-indigo-700 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                            Auto-generated if empty
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="alternateHreflangEn" className="text-sm font-medium flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-indigo-600" />
                              Alternate (English)
                            </Label>
                            <Input
                              id="alternateHreflangEn"
                              placeholder="https://www.cybaemtech.com/en/blog/post"
                              value={formData.alternateHreflangEn}
                              onChange={(e) => handleChange('alternateHreflangEn', e.target.value)}
                              className="bg-white border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="alternateHreflangDefault" className="text-sm font-medium flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-indigo-600" />
                              Alternate (Default)
                            </Label>
                            <Input
                              id="alternateHreflangDefault"
                              placeholder="https://www.cybaemtech.com/blog/post"
                              value={formData.alternateHreflangDefault}
                              onChange={(e) => handleChange('alternateHreflangDefault', e.target.value)}
                              className="bg-white border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Schema Markup Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-purple-100">
                        <div className="bg-purple-100 p-1.5 rounded-md">
                          <FileText className="h-4 w-4 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Schema Markup (JSON-LD)</h3>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 space-y-4">
                        <p className="text-xs text-purple-700">
                          Add structured data as JSON-LD. Article schema is auto-generated.
                        </p>

                        <div className="space-y-2">
                          <Label htmlFor="schemaOrganization" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-purple-600" />
                            Organization Schema
                          </Label>
                          <Textarea
                            id="schemaOrganization"
                            placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                            value={formData.schemaOrganization}
                            onChange={(e) => handleChange('schemaOrganization', e.target.value)}
                            rows={3}
                            className="bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schemaWebsite" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-purple-600" />
                            Website Schema
                          </Label>
                          <Textarea
                            id="schemaWebsite"
                            placeholder='{"@context": "https://schema.org", "@type": "WebSite", ...}'
                            value={formData.schemaWebsite}
                            onChange={(e) => handleChange('schemaWebsite', e.target.value)}
                            rows={3}
                            className="bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schemaBreadcrumb" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-purple-600" />
                            Breadcrumb Schema
                          </Label>
                          <Textarea
                            id="schemaBreadcrumb"
                            placeholder='{"@context": "https://schema.org", "@type": "BreadcrumbList", ...}'
                            value={formData.schemaBreadcrumb}
                            onChange={(e) => handleChange('schemaBreadcrumb', e.target.value)}
                            rows={3}
                            className="bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schemaArticle" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-purple-600" />
                            BlogPosting / Article Schema
                          </Label>
                          <Textarea
                            id="schemaArticle"
                            placeholder='{"@context": "https://schema.org", "@type": "BlogPosting", "headline": "...", "author": {...}, "publisher": {...}, ...}'
                            value={formData.schemaArticle}
                            onChange={(e) => handleChange('schemaArticle', e.target.value)}
                            rows={5}
                            className="bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none font-mono text-xs"
                          />
                          <p className="text-xs text-purple-700 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                            Auto-generated if empty. Override with custom BlogPosting schema.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schemaFaq" className="text-sm font-medium flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-purple-600" />
                            FAQ Schema
                          </Label>
                          <Textarea
                            id="schemaFaq"
                            placeholder='{"@context": "https://schema.org", "@type": "FAQPage", ...}'
                            value={formData.schemaFaq}
                            onChange={(e) => handleChange('schemaFaq', e.target.value)}
                            rows={3}
                            className="bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 resize-none font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Google Analytics Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-100">
                        <div className="bg-orange-100 p-1.5 rounded-md">
                          <Search className="h-4 w-4 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900">Google Analytics</h3>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="googleAnalyticsId1" className="text-sm font-medium flex items-center gap-1.5">
                              <Search className="h-3.5 w-3.5 text-orange-600" />
                              GA Tracking ID 1
                            </Label>
                            <Input
                              id="googleAnalyticsId1"
                              placeholder="G-XXXXXXXXXX"
                              value={formData.googleAnalyticsId1}
                              onChange={(e) => handleChange('googleAnalyticsId1', e.target.value)}
                              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="googleAnalyticsId2" className="text-sm font-medium flex items-center gap-1.5">
                              <Search className="h-3.5 w-3.5 text-orange-600" />
                              GA Tracking ID 2
                            </Label>
                            <Input
                              id="googleAnalyticsId2"
                              placeholder="G-YYYYYYYYYY"
                              value={formData.googleAnalyticsId2}
                              onChange={(e) => handleChange('googleAnalyticsId2', e.target.value)}
                              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-orange-700 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          Add your Google Analytics measurement IDs for tracking
                        </p>
                      </div>
                    </div>

                    {/* SEO Preview */}
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSeoPreview(!showSeoPreview)}
                        className="w-full bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border-2 border-cyan-200 hover:border-cyan-300 text-gray-900 font-medium"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {showSeoPreview ? 'Hide' : 'Preview'} SEO
                      </Button>

                      {showSeoPreview && (
                        <div className="mt-4 p-5 bg-white rounded-xl border-2 border-gray-200 shadow-md">
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                            <Search className="h-4 w-4 text-gray-500" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Google Search Preview</p>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-blue-600 text-lg font-medium hover:underline cursor-pointer truncate">
                              {formData.metaTitle || formData.title || 'Post Title'} | Cybaem Tech
                            </p>
                            <p className="text-green-700 text-sm truncate flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              www.cybaemtech.com › {formData.type?.toLowerCase().replace(/\s+/g, '-') || 'blog-post'} › {formData.slug || 'post-slug'}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                              {formData.metaDescription || formData.excerpt || 'Post description will appear here...'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        )}
      </form>
    </div>
  );
};
