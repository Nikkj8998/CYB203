import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Trash2, 
  Save, 
  GripVertical, 
  Settings2, 
  Activity, 
  Target, 
  Star, 
  Briefcase, 
  UserCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

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
  { key: 'lead_status', label: 'Lead Status', icon: Activity, color: 'blue' },
  { key: 'lead_source', label: 'Lead Source', icon: Target, color: 'indigo' },
  { key: 'lead_quality', label: 'Lead Quality', icon: Star, color: 'amber' },
  { key: 'service_interest', label: 'Service Interest', icon: Briefcase, color: 'emerald' },
  { key: 'lead_owner', label: 'Lead Owners', icon: UserCircle, color: 'purple' },
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Settings2 className="h-8 w-8 text-primary" />
            CRM Configuration
          </h1>
          <p className="text-gray-500 mt-1">Manage dropdown options and categories for your leads system.</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadSettings} className="bg-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {SETTING_TYPES.map(({ key, label, icon: Icon, color }) => (
          <Card key={key} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4 bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-600`}>
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 mb-6 min-h-[100px]">
                {(settings[key] || []).length > 0 ? (
                  (settings[key] || []).map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl group hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-200"
                    >
                      <GripVertical className="h-4 w-4 text-gray-300 cursor-grab" />
                      {editingId === setting.id ? (
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 h-9 focus-visible:ring-primary"
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate(setting.id)}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            className="h-9 px-3 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleUpdate(setting.id)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 px-3"
                            onClick={() => {
                              setEditingId(null);
                              setEditValue('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span
                            className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
                            onClick={() => {
                              setEditingId(setting.id);
                              setEditValue(setting.setting_value);
                            }}
                          >
                            {setting.setting_value}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Badge variant="outline" className="mr-2 font-normal text-[10px] uppercase tracking-wider">Default</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(setting.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                    <div className="p-3 bg-gray-50 rounded-full mb-2">
                      <Icon className="h-6 w-6 opacity-20" />
                    </div>
                    <p className="text-xs">No options defined</p>
                  </div>
                )}
              </div>

              <div className="relative pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Input
                    placeholder={`New ${label.toLowerCase()}...`}
                    value={newValues[key] || ''}
                    onChange={(e) => setNewValues({ ...newValues, [key]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd(key)}
                    className="flex-1 h-10 bg-gray-50 border-transparent focus:bg-white transition-colors"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleAdd(key)}
                    className="h-10 px-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
