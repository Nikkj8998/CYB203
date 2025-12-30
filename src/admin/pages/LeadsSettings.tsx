import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = '/backend/api/crm-leads.php';

interface Setting {
  id: number;
  setting_type: string;
  setting_value: string;
  display_order: number;
  is_active: boolean;
}

interface SettingsGroup {
  [key: string]: Setting[];
}

const SETTING_TYPES = [
  { key: 'lead_status', label: 'Lead Status' },
  { key: 'lead_source', label: 'Lead Source' },
  { key: 'lead_quality', label: 'Lead Quality' },
  { key: 'service_interest', label: 'Service Interest' },
  { key: 'lead_owner', label: 'Lead Owners' },
];

export const LeadsSettings = () => {
  const [settings, setSettings] = useState<SettingsGroup>({});
  const [loading, setLoading] = useState(true);
  const [newValues, setNewValues] = useState<{ [key: string]: string }>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}?action=settings`);
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (type: string) => {
    const value = newValues[type]?.trim();
    if (!value) {
      toast.error('Please enter a value');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}?action=settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setting_type: type, setting_value: value }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Setting added successfully');
        setNewValues({ ...newValues, [type]: '' });
        loadSettings();
      } else {
        toast.error(data.message || 'Failed to add setting');
      }
    } catch (error) {
      toast.error('Failed to add setting');
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editValue.trim()) {
      toast.error('Please enter a value');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}?action=settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, setting_value: editValue }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Setting updated successfully');
        setEditingId(null);
        setEditValue('');
        loadSettings();
      } else {
        toast.error(data.message || 'Failed to update setting');
      }
    } catch (error) {
      toast.error('Failed to update setting');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;

    try {
      const response = await fetch(`${API_BASE}?action=settings&id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Setting deleted successfully');
        loadSettings();
      } else {
        toast.error(data.message || 'Failed to delete setting');
      }
    } catch (error) {
      toast.error('Failed to delete setting');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SETTING_TYPES.map(({ key, label }) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {(settings[key] || []).map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md group"
                  >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    {editingId === setting.id ? (
                      <>
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 h-8"
                          onKeyDown={(e) => e.key === 'Enter' && handleUpdate(setting.id)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUpdate(setting.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(null);
                            setEditValue('');
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <span
                          className="flex-1 text-sm cursor-pointer"
                          onClick={() => {
                            setEditingId(setting.id);
                            setEditValue(setting.setting_value);
                          }}
                        >
                          {setting.setting_value}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 text-red-600"
                          onClick={() => handleDelete(setting.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={`Add new ${label.toLowerCase()}`}
                  value={newValues[key] || ''}
                  onChange={(e) => setNewValues({ ...newValues, [key]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd(key)}
                  className="flex-1"
                />
                <Button size="sm" onClick={() => handleAdd(key)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
