import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2,
  Search,
  Link as LinkIcon,
  Copy
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface MediaItem {
  id: number;
  url: string;
  name: string;
  uploadDate: string;
  size: string;
}

export const MediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = () => {
    const storedMedia = localStorage.getItem('adminMedia');
    if (storedMedia) {
      setMediaItems(JSON.parse(storedMedia));
    } else {
      const sampleMedia: MediaItem[] = [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
          name: 'Cloud Computing',
          uploadDate: new Date().toISOString().split('T')[0],
          size: '2.3 MB'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
          name: 'Cybersecurity',
          uploadDate: new Date().toISOString().split('T')[0],
          size: '1.8 MB'
        }
      ];
      localStorage.setItem('adminMedia', JSON.stringify(sampleMedia));
      setMediaItems(sampleMedia);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      if (!newImageName) {
        setNewImageName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleAddImage = async () => {
    if (uploadMethod === 'url') {
      if (!newImageUrl || !newImageName) {
        toast.error('Please provide both image URL and name');
        return;
      }

      const newMedia: MediaItem = {
        id: Date.now(),
        url: newImageUrl,
        name: newImageName,
        uploadDate: new Date().toISOString().split('T')[0],
        size: 'N/A'
      };

      const updatedMedia = [...mediaItems, newMedia];
      localStorage.setItem('adminMedia', JSON.stringify(updatedMedia));
      setMediaItems(updatedMedia);
      setNewImageUrl('');
      setNewImageName('');
      setDialogOpen(false);
      toast.success('Image added successfully');
    } else {
      if (!selectedFile || !newImageName) {
        toast.error('Please select a file and provide a name');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        
        const newMedia: MediaItem = {
          id: Date.now(),
          url: base64Url,
          name: newImageName,
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(selectedFile.size / 1024).toFixed(2)} KB`
        };

        const updatedMedia = [...mediaItems, newMedia];
        localStorage.setItem('adminMedia', JSON.stringify(updatedMedia));
        setMediaItems(updatedMedia);
        setSelectedFile(null);
        setNewImageName('');
        setDialogOpen(false);
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = (id: number) => {
    const updatedMedia = mediaItems.filter(item => item.id !== id);
    localStorage.setItem('adminMedia', JSON.stringify(updatedMedia));
    setMediaItems(updatedMedia);
    toast.success('Image deleted successfully');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 mt-1">Manage all your images and media files</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
              <DialogDescription>
                Upload an image file or add an image by URL
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  type="button"
                  variant={uploadMethod === 'file' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('file')}
                  className="flex-1"
                >
                  Upload File
                </Button>
                <Button 
                  type="button"
                  variant={uploadMethod === 'url' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('url')}
                  className="flex-1"
                >
                  Use URL
                </Button>
              </div>

              {uploadMethod === 'file' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="imageFile">Select Image File *</Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                    <p className="text-xs text-gray-500">Max size: 5MB. Supported: JPG, PNG, GIF, WebP</p>
                  </div>
                  {selectedFile && (
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p><strong>Selected:</strong> {selectedFile.name}</p>
                      <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="imageName">Image Name *</Label>
                <Input
                  id="imageName"
                  placeholder="Enter image name"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddImage} className="flex-1">
                  {uploadMethod === 'file' ? 'Upload' : 'Add'} Image
                </Button>
                <Button variant="outline" onClick={() => {
                  setDialogOpen(false);
                  setSelectedFile(null);
                  setNewImageUrl('');
                  setNewImageName('');
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search images..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No images found</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Add Your First Image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative group">
                    <img 
                      src={item.url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleCopyUrl(item.url)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy URL
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm text-gray-900 truncate mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.uploadDate}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <LinkIcon className="h-3 w-3" />
                      <span className="truncate flex-1">{item.url}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
