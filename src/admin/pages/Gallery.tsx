import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Image, Plus, Edit, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/config/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  display_order: number;
  status: string;
  created_at: string;
}

export const Gallery = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'celebration',
    display_order: 0,
    status: 'active'
  });

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/gallery.php?status=all`);
      const data = await response.json();

      if (data.success) {
        setGalleries(data.data);
      } else {
        toast.error('Failed to load gallery items');
      }
    } catch (error) {
      toast.error('Error loading gallery items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        image_url: item.image_url,
        category: item.category,
        display_order: item.display_order,
        status: item.status
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        image_url: '',
        category: 'celebration',
        display_order: galleries.length,
        status: 'active'
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingItem(null);
    setSelectedFile(null);
    setFormData({
      title: '',
      image_url: '',
      category: 'celebration',
      display_order: 0,
      status: 'active'
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setSelectedFile(file);
      toast.success('Image selected: ' + file.name);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', selectedFile);
      formDataUpload.append('name', selectedFile.name);

      const response = await fetch(`${API_BASE_URL}/media.php`, {
        method: 'POST',
        credentials: 'include',
        body: formDataUpload
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Image uploaded successfully');
        return data.data.url;
      } else {
        toast.error(data.message || 'Upload failed');
        return null;
      }
    } catch (error) {
      toast.error('Error uploading image');
      console.error(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    // Upload file first if one is selected
    let imageUrl = formData.image_url;

    if (selectedFile) {
      const uploadedUrl = await handleUploadFile();
      if (!uploadedUrl) {
        toast.error('Failed to upload image');
        return;
      }
      imageUrl = uploadedUrl;
    }

    if (!formData.title || !imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const submitData = {
        ...formData,
        image_url: imageUrl
      };

      const url = editingItem
        ? `${API_BASE_URL}/gallery.php?id=${editingItem.id}`
        : `${API_BASE_URL}/gallery.php`;

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingItem ? 'Gallery item updated successfully' : 'Gallery item created successfully');
        handleCloseDialog();
        loadGalleries();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Error saving gallery item');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Gallery item deleted successfully');
        setDeleteId(null);
        loadGalleries();
      } else {
        toast.error(data.message || 'Failed to delete item');
      }
    } catch (error) {
      toast.error('Error deleting gallery item');
      console.error(error);
    }
  };

  const toggleStatus = async (item: GalleryItem) => {
    try {
      const newStatus = item.status === 'active' ? 'inactive' : 'active';

      const response = await fetch(`${API_BASE_URL}/gallery.php?id=${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...item,
          status: newStatus
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Gallery item ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        loadGalleries();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Manage Life at CybaemTech celebrations and events</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Gallery Items ({galleries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {galleries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No gallery items found</p>
              <Button onClick={() => handleOpenDialog()} className="mt-4">
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Order: {item.display_order}</span>
                      <span>{item.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(item)}
                        className="flex-1"
                      >
                        {item.status === 'active' ? (
                          <><EyeOff className="h-4 w-4 mr-1" /> Hide</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-1" /> Show</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:text-red-700"
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

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the gallery item details below.' : 'Add a new celebration or event to the gallery.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Diwali Celebration, Annual Function"
              />
            </div>
            <div className="space-y-2">
              <Label>Image *</Label>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Browse Image
                </Button>
                {selectedFile && (
                  <span className="flex items-center text-sm text-green-600 font-medium">
                    ✓ {selectedFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">Select an image file from your computer to upload</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Or enter Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="/uploads/... or https://..."
              />
              <p className="text-xs text-gray-500">Alternatively, paste an existing image URL</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="celebration, event, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} disabled={uploading}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={uploading}>
              {uploading ? 'Uploading...' : (editingItem ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this gallery item? This action cannot be undone.
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
