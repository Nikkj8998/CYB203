import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RefreshCw,
  Plus,
  Edit,
  FileSpreadsheet,
  Download,
  Upload,
  Link,
  Clock,
  Play,
  AlertCircle,
  Copy,
  ExternalLink,
  Trash2,
  Calendar
} from 'lucide-react';

interface SpreadsheetConfig {
  id: number;
  name: string;
  url: string;
  last_synced?: string | null;
  is_active: boolean;
  sync_interval: number;
  auto_sync: boolean;
  created_at?: string;
  updated_at?: string;
}

interface SpreadsheetImportResult {
  spreadsheetId: number;
  spreadsheetName: string;
  success: number;
  failed: number;
  errors: string[];
  timestamp: string;
  duplicates?: number;
  status?: 'success' | 'partial' | 'all_duplicates' | 'no_data' | 'error';
}

interface SpreadsheetRow {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  sourcePage?: string;
  selectedPlan?: string;
}

const API_BASE_URL = '/backend/api/leads.php';

const api = {
  spreadsheets: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}?action=spreadsheets`, { credentials: 'include' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    create: async (spreadsheet: Partial<SpreadsheetConfig>) => {
      try {
        const response = await fetch(`${API_BASE_URL}?action=spreadsheets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(spreadsheet),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    update: async (id: number, updates: Partial<SpreadsheetConfig>) => {
      try {
        const response = await fetch(`${API_BASE_URL}?action=spreadsheets`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id, ...updates }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    delete: async (id: number) => {
      try {
        const response = await fetch(`${API_BASE_URL}?action=spreadsheets&id=${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  },
  leads: {
    getAll: async () => {
      try {
        const response = await fetch('/backend/api/crm-leads.php', { credentials: 'include' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.success ? result.data : [];
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    create: async (lead: any) => {
      try {
        const response = await fetch('/backend/api/crm-leads.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            full_name: lead.name,
            email: lead.email,
            mobile_number: lead.phone,
            phone: lead.phone,
            company_name: lead.company || '',
            location: lead.country || '',
            message: lead.message || '',
            original_message: lead.message || '',
            notes: lead.notes || '',
            lead_source: lead.source || 'Import',
            lead_status: 'New - Not Contacted',
            entry_source: 'import'
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error: any) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }
};

const syncIntervalOptions = [
  { value: '5', label: '5 minutes' },
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '1440', label: '24 hours' },
];

const extractSpreadsheetId = (url: string): string | null => {
  try {
    const patterns = [
      /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
      /\/d\/([a-zA-Z0-9-_]+)\//,
      /key=([a-zA-Z0-9-_]+)/,
      /\/d\/([a-zA-Z0-9-_]+)(\?|$)/,
      /\/d\/([a-zA-Z0-9-_]+)(\/|$)/,
      /\/([a-zA-Z0-9-_]{44})\//
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  } catch (error) {
    return null;
  }
};

const convertToCsvUrl = (url: string): string | null => {
  try {
    if (url.includes('/export?format=csv')) return url;
    if (url.endsWith('.csv')) return url;
    const spreadsheetId = extractSpreadsheetId(url);
    if (!spreadsheetId) return null;
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}`;
  } catch (error) {
    return null;
  }
};

const getReadableSheetsUrl = (url: string): string => {
  const spreadsheetId = extractSpreadsheetId(url);
  if (spreadsheetId) return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  return url;
};

const parseCSV = (csvText: string): SpreadsheetRow[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else current += char;
    }
    result.push(current.trim());
    return result;
  };

  const cleanPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    return phone.toString().replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim();
  };

  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const rows: SpreadsheetRow[] = [];
  const seenPhones = new Set<string>();
  const seenEmails = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]).map(v => v.trim().replace(/"/g, ''));
    const row: SpreadsheetRow = { name: '', email: '', phone: '', country: '', message: '', sourcePage: '', selectedPlan: '' };

    headers.forEach((header, index) => {
      const value = values[index] || '';
      switch (header) {
        case 'name': case 'full name': case 'contact name': row.name = value; break;
        case 'email': case 'email address': row.email = value.toLowerCase(); break;
        case 'phone': case 'mobile': row.phone = cleanPhoneNumber(value); break;
        case 'country': case 'location': row.country = value; break;
        case 'message': case 'comments': row.message = value; break;
        case 'source': row.sourcePage = value; break;
        case 'plan': case 'service': row.selectedPlan = value; break;
      }
    });

    if (!row.name || !row.email) continue;
    if (seenEmails.has(row.email)) continue;
    if (row.phone && seenPhones.has(row.phone)) continue;

    seenEmails.add(row.email);
    if (row.phone) seenPhones.add(row.phone);
    rows.push(row);
  }
  return rows;
};

export const LeadsIntegrations = () => {
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetConfig[]>([]);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  const [spreadsheetName, setSpreadsheetName] = useState('');
  const [isAddingSpreadsheet, setIsAddingSpreadsheet] = useState(false);
  const [editingSpreadsheetId, setEditingSpreadsheetId] = useState<number | null>(null);
  const [syncHistory, setSyncHistory] = useState<SpreadsheetImportResult[]>([]);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importResults, setImportResults] = useState<SpreadsheetImportResult | null>(null);
  const [syncIntervals, setSyncIntervals] = useState<Record<string, NodeJS.Timeout>>({});
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSpreadsheets();
    return () => Object.values(syncIntervals).forEach(clearInterval);
  }, []);

  const loadSpreadsheets = async () => {
    try {
      setLoading(true);
      const response = await api.spreadsheets.getAll();
      if (response?.success) {
        const data = response.data || [];
        setSpreadsheets(data);
        data.forEach((s: SpreadsheetConfig) => {
          if (s.auto_sync && s.is_active) startAutoSync(s);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const startAutoSync = (s: SpreadsheetConfig) => {
    if (syncIntervals[s.id]) clearInterval(syncIntervals[s.id]);
    const interval = setInterval(() => processSpreadsheet(s), s.sync_interval * 60 * 1000);
    setSyncIntervals(prev => ({ ...prev, [s.id]: interval }));
  };

  const stopAutoSync = (id: number) => {
    if (syncIntervals[id]) {
      clearInterval(syncIntervals[id]);
      setSyncIntervals(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const testSpreadsheetUrl = async (url: string) => {
    setIsTesting(true);
    try {
      const csvUrl = convertToCsvUrl(url);
      if (!csvUrl) throw new Error('Invalid URL');
      const res = await fetch(csvUrl, { method: 'HEAD' });
      setTestResult(res.ok ? { success: true, message: '✓ Valid URL' } : { success: false, message: '✗ Access Denied' });
    } catch (e: any) {
      setTestResult({ success: false, message: e.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddSpreadsheet = async () => {
    try {
      const res = await api.spreadsheets.create({ name: spreadsheetName, url: spreadsheetUrl, is_active: true, sync_interval: 5, auto_sync: false });
      if (res.success) {
        setSpreadsheets(prev => [...prev, res.data]);
        setIsAddingSpreadsheet(false);
        setSpreadsheetName('');
        setSpreadsheetUrl('');
        toast.success('Added successfully');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleEditSpreadsheet = async (s: SpreadsheetConfig) => {
    try {
      const res = await api.spreadsheets.update(s.id, s);
      if (res.success) {
        setSpreadsheets(prev => prev.map(item => item.id === s.id ? res.data : item));
        setEditingSpreadsheetId(null);
        if (res.data.auto_sync && res.data.is_active) startAutoSync(res.data);
        else stopAutoSync(s.id);
        toast.success('Updated');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDeleteSpreadsheet = async (id: number) => {
    try {
      const res = await api.spreadsheets.delete(id);
      if (res.success) {
        setSpreadsheets(prev => prev.filter(s => s.id !== id));
        stopAutoSync(id);
        toast.success('Deleted');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const processSpreadsheet = async (s: SpreadsheetConfig) => {
    setImporting(true);
    try {
      const csvUrl = convertToCsvUrl(s.url);
      if (!csvUrl) throw new Error('Invalid URL');
      const res = await fetch(csvUrl);
      const rows = parseCSV(await res.text());
      
      let success = 0;
      let dupes = 0;
      let fails = 0;
      const errors: string[] = [];

      for (const row of rows) {
        try {
          const result = await api.leads.create({ ...row, source: 'Google Sheets' });
          if (result.success) success++;
          else fails++;
        } catch (e: any) {
          if (e.message.toLowerCase().includes('duplicate')) dupes++;
          else {
            fails++;
            errors.push(e.message);
          }
        }
      }

      const result: SpreadsheetImportResult = {
        spreadsheetId: s.id,
        spreadsheetName: s.name,
        success,
        failed: fails,
        duplicates: dupes,
        errors: errors.slice(0, 5),
        timestamp: new Date().toISOString(),
        status: success > 0 ? (fails > 0 ? 'partial' : 'success') : 'error'
      };

      setImportResults(result);
      setSyncHistory(prev => [result, ...prev.slice(0, 9)]);
      toast.success(`Imported ${success} leads from ${s.name}`);
    } catch (e: any) {
      toast.error(`Error processing ${s.name}: ${e.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleProcessAllSpreadsheets = async () => {
    const active = spreadsheets.filter(s => s.is_active);
    if (active.length === 0) {
      toast.info('No active spreadsheets to sync');
      return;
    }
    for (const s of active) {
      await processSpreadsheet(s);
    }
  };

  const toggleSpreadsheetActive = (s: SpreadsheetConfig) => {
    handleEditSpreadsheet({ ...s, is_active: !s.is_active });
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const leads = await api.leads.getAll();
      if (!leads || leads.length === 0) {
        toast.info('No leads found to export');
        return;
      }
      const ws = XLSX.utils.json_to_sheet(leads);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");
      XLSX.writeFile(wb, `leads_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Leads exported successfully');
    } catch (e: any) {
      toast.error('Export failed: ' + e.message);
    } finally {
      setExporting(false);
    }
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      setImporting(true);
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws) as any[];

        let success = 0;
        let dupes = 0;
        let fails = 0;

        for (const row of data) {
          try {
            const formattedLead = {
              name: row.name || row['Full Name'] || row['Name'],
              email: row.email || row['Email Address'] || row['Email'],
              phone: row.phone || row['Mobile Number'] || row['Phone'],
              country: row.country || row['Location'] || row['Country'],
              message: row.message || row['Message'],
              source: 'Excel Import'
            };

            if (!formattedLead.name || !formattedLead.email) continue;

            const result = await api.leads.create(formattedLead);
            if (result.success) success++;
            else fails++;
          } catch (e: any) {
            if (e.message.toLowerCase().includes('duplicate')) dupes++;
            else fails++;
          }
        }
        toast.success(`Import complete: ${success} imported, ${dupes} duplicates skipped`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: any) {
        toast.error('Import failed: ' + err.message);
      } finally {
        setImporting(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;

  return (
    <div className="space-y-8 pb-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Link className="h-6 w-6" />
          </div>
          Data Integrations
        </h2>
        <p className="text-gray-500 max-w-2xl text-sm">
          Connect and synchronize your leads data from external sources.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-0 shadow-xl overflow-hidden bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <FileSpreadsheet className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Google Sheets Integration</CardTitle>
                    <p className="text-blue-100 text-xs mt-1">Automated lead importing</p>
                  </div>
                </div>
                <Button 
                  onClick={handleProcessAllSpreadsheets}
                  disabled={importing}
                  className="bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-lg font-bold"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${importing ? 'animate-spin' : ''}`} />
                  Sync All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {spreadsheets.length === 0 && !isAddingSpreadsheet && (
                  <p className="text-center text-slate-400 py-8">No spreadsheets connected yet.</p>
                )}
                {spreadsheets.map((s) => (
                  <div key={s.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    {editingSpreadsheetId === s.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input value={s.name} onChange={e => setSpreadsheets(prev => prev.map(i => i.id === s.id ? { ...i, name: e.target.value } : i))} />
                          <Select value={s.sync_interval.toString()} onValueChange={v => setSpreadsheets(prev => prev.map(i => i.id === s.id ? { ...i, sync_interval: parseInt(v) } : i))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{syncIntervalOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Switch checked={s.auto_sync} onCheckedChange={v => setSpreadsheets(prev => prev.map(i => i.id === s.id ? { ...i, auto_sync: v } : i))} />
                            <Label>Auto-sync</Label>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingSpreadsheetId(null)}>Cancel</Button>
                            <Button size="sm" onClick={() => handleEditSpreadsheet(s)}>Save</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Switch checked={s.is_active} onCheckedChange={() => toggleSpreadsheetActive(s)} />
                            <div className="flex flex-col">
                              <h4 className="font-bold text-slate-800">{s.name}</h4>
                              <a 
                                href={getReadableSheetsUrl(s.url)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-[300px]"
                              >
                                <Link className="h-2 w-2" />
                                {s.url}
                              </a>
                            </div>
                          </div>
                          <div className="flex gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.last_synced ? new Date(s.last_synced).toLocaleString() : 'Never'}</span>
                            {s.auto_sync && <span className="text-blue-600 font-medium">Every {s.sync_interval}m</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => processSpreadsheet(s)} disabled={importing}><Play className="h-4 w-4 mr-2" /> Sync</Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingSpreadsheetId(s.id)}><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteSpreadsheet(s.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isAddingSpreadsheet ? (
                  <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Name" value={spreadsheetName} onChange={e => setSpreadsheetName(e.target.value)} />
                      <Input placeholder="URL" value={spreadsheetUrl} onChange={e => setSpreadsheetUrl(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setIsAddingSpreadsheet(false)}>Cancel</Button>
                      <Button onClick={handleAddSpreadsheet}>Add Sheet</Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full py-12 border-dashed border-2 rounded-2xl group" onClick={() => setIsAddingSpreadsheet(true)}>
                    <Plus className="h-6 w-6 mb-2" />
                    <span>Add New Spreadsheet</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white p-6 flex flex-row items-center gap-3">
              <Upload className="h-6 w-6" />
              <CardTitle>Direct Import & Export</CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleImportExcel}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 h-24 flex flex-col gap-2 rounded-2xl"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importing}
                >
                  <Upload className={`h-6 w-6 ${importing ? 'animate-spin' : ''}`} /> 
                  {importing ? 'Importing...' : 'Import Excel'}
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 rounded-2xl border-blue-200 text-blue-700"
                onClick={handleExportExcel}
                disabled={exporting}
              >
                <Download className={`h-6 w-6 ${exporting ? 'animate-spin' : ''}`} /> 
                {exporting ? 'Exporting...' : 'Export Excel'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-800 text-white p-5 flex flex-row items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-lg">Sync History</CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
              {syncHistory.length === 0 ? (
                <p className="p-8 text-center text-slate-400 text-sm">No sync history yet.</p>
              ) : syncHistory.map((h, i) => (
                <div key={i} className="p-4 border-b hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm truncate">{h.spreadsheetName}</span>
                    <Badge className={h.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>{h.status}</Badge>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>+{h.success} leads, {h.duplicates || 0} dups</span>
                    <span>{new Date(h.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-2xl p-8 text-center space-y-4 shadow-xl border-0">
            <AlertCircle className="h-10 w-10 mx-auto text-blue-300 opacity-50" />
            <h4 className="text-xl font-bold">Automation Tip</h4>
            <p className="text-blue-100 text-xs leading-relaxed opacity-80">
              Enable Auto-sync to import leads every 5 minutes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
