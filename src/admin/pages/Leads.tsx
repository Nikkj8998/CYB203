import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Trash2,
  Phone,
  Mail,
  RefreshCw,
  Plus,
  Edit,
  Filter,
  Upload,
  FileSpreadsheet,
  X,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Building2,
  Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { API_BASE_URL } from '@/config/api';

interface Lead {
  id: number;
  lead_status: string;
  full_name: string;
  company_name: string;
  phone: string;
  email: string;
  lead_source: string;
  created_at: string;
  message: string;
  notes: string;
  updated_at: string;
  // Additional fields for form
  location?: string;
  website?: string;
  campaign_name?: string;
  service_interest?: string;
  lead_quality?: string;
  lead_owner?: string;
  preferred_channel?: string;
  expected_deal_value?: number;
  // Legacy field mappings for compatibility
  status?: string;
  company?: string;
  source?: string;
  questions?: string;
  note?: string;
}

interface SpreadsheetConfig {
  id: number;
  name: string;
  url: string;
  last_synced?: string | null;
  is_active: boolean;
  sync_interval: number;
  auto_sync: boolean;
}

const LEADS_API = `${API_BASE_URL}/leads.php`;
// Simple endpoint for testing
const SIMPLE_LEADS_API = `${API_BASE_URL}/simple-leads.php`;

const api = {
  leads: {
    getAll: async (filters?: { search?: string; status?: string; source?: string }) => {
      try {
        const response = await fetch(LEADS_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('API Error:', error);
        // Return empty result structure on error
        return {
          success: true,
          data: [],
          message: '0 leads found'
        };
      }
    },
    create: async (lead: Partial<Lead>) => {
      try {
        const response = await fetch(LEADS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    update: async (id: number, updates: Partial<Lead>) => {
      try {
        const response = await fetch(LEADS_API, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...updates }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    delete: async (id: number) => {
      try {
        const response = await fetch(`${LEADS_API}?id=${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    deleteBulk: async (ids: number[]) => {
      try {
        const response = await fetch(LEADS_API, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  },
  spreadsheets: {
    getAll: async () => {
      try {
        const response = await fetch(`${LEADS_API}?action=spreadsheets`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    create: async (spreadsheet: Partial<SpreadsheetConfig>) => {
      try {
        const response = await fetch(`${LEADS_API}?action=spreadsheets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(spreadsheet),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    delete: async (id: number) => {
      try {
        const response = await fetch(`${LEADS_API}?action=spreadsheets&id=${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    import: async (url: string, name: string) => {
      try {
        const response = await fetch(`${LEADS_API}?action=import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, name }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }
};

const statusOptions = [
  { value: 'New - Not Contacted', label: 'New - Not Contacted', color: 'bg-blue-100 text-blue-800 border border-blue-200' },
  { value: 'Contacted', label: 'Contacted', color: 'bg-indigo-100 text-indigo-800 border border-indigo-200' },
  { value: 'In Pipeline', label: 'In Pipeline', color: 'bg-purple-100 text-purple-800 border border-purple-200' },
  { value: 'Closed - Won', label: 'Closed - Won', color: 'bg-green-100 text-green-800 border border-green-200' },
  { value: 'Closed - Lost', label: 'Closed - Lost', color: 'bg-red-100 text-red-800 border border-red-200' },
  { value: 'Dead / Junk', label: 'Dead / Junk', color: 'bg-gray-100 text-gray-800 border border-gray-200' },
  { value: 'Cold', label: 'Cold', color: 'bg-slate-100 text-slate-800 border border-slate-200' },
];

const sourceOptions = [
  { value: 'Website', label: 'Website', color: 'bg-green-100 text-green-800' },
  { value: 'META ADS', label: 'META ADS', color: 'bg-blue-100 text-blue-800' },
  { value: 'GOOGLE ADS', label: 'GOOGLE ADS', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'REFERRAL', label: 'REFERRAL', color: 'bg-purple-100 text-purple-800' },
  { value: 'SPREADSHEET', label: 'SPREADSHEET', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'Other', label: 'Other', color: 'bg-gray-100 text-gray-800' },
];

export const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [junkId, setJunkId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    full_name: '',
    company_name: '',
    phone: '',
    email: '',
    lead_source: 'Website',
    message: '',
    notes: '',
    lead_status: 'New - Not Contacted'
  });

  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const leadsPerPage = 10;

  const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  const [spreadsheetName, setSpreadsheetName] = useState('');
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetConfig[]>([]);
  const [isAddingSpreadsheet, setIsAddingSpreadsheet] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    loadLeads();
    loadSpreadsheets();
  }, []);

  const loadSpreadsheets = async () => {
    try {
      const response = await api.spreadsheets.getAll();
      if (response?.success) {
        setSpreadsheets(response.data || []);
      }
    } catch (error) {
      console.error('Error loading spreadsheets:', error);
    }
  };

  const loadLeads = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);

      const filters: { search?: string; status?: string; source?: string } = {};
      if (searchQuery) filters.search = searchQuery;
      if (statusFilter !== 'all') filters.status = statusFilter;
      if (sourceFilter !== 'all') filters.source = sourceFilter;

      const response = await api.leads.getAll(filters);

      if (response?.success) {
        setLeads(response.data || []);
      } else {
        setLeads([]);
        toast.error(response?.message || 'Failed to load leads');
      }
    } catch (error) {
      console.error('Error loading leads:', error);
      setLeads([]);
      toast.error('Error loading leads');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLeads(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter, sourceFilter]);

  const handleAddSpreadsheet = async () => {
    if (!spreadsheetName.trim() || !spreadsheetUrl.trim()) {
      toast.error('Please enter both name and URL');
      return;
    }

    try {
      const response = await api.spreadsheets.create({
        name: spreadsheetName,
        url: spreadsheetUrl,
        is_active: true,
        sync_interval: 5,
        auto_sync: false
      });

      if (response.success) {
        setSpreadsheets(prev => [...prev, response.data]);
        setSpreadsheetName('');
        setSpreadsheetUrl('');
        setIsAddingSpreadsheet(false);
        toast.success('Spreadsheet added successfully');
      } else {
        toast.error(response.message || 'Failed to add spreadsheet');
      }
    } catch (error: any) {
      toast.error('Error adding spreadsheet: ' + error.message);
    }
  };

  const handleImportSpreadsheet = async (spreadsheet: SpreadsheetConfig) => {
    setImporting(true);
    try {
      const response = await api.spreadsheets.import(spreadsheet.url, spreadsheet.name);
      if (response.success) {
        toast.success(`Imported ${response.data.success} leads successfully`);
        loadLeads(false);
      } else {
        toast.error(response.message || 'Import failed');
      }
    } catch (error: any) {
      toast.error('Error importing: ' + error.message);
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteSpreadsheet = async (id: number) => {
    try {
      const response = await api.spreadsheets.delete(id);
      if (response.success) {
        setSpreadsheets(prev => prev.filter(s => s.id !== id));
        toast.success('Spreadsheet deleted');
      }
    } catch (error: any) {
      toast.error('Error deleting spreadsheet');
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailsOpen(true);
  };

  const handleAddLead = () => {
    setNewLead({
      full_name: '',
      company: '',
      phone: '',
      email: '',
      source: 'Other',
      questions: '',
      note: '',
      status: 'New'
    });
    setAddDialogOpen(true);
  };

  const handleSaveNewLead = async () => {
    if (!newLead.full_name && !newLead.email) {
      toast.error('Name or email is required');
      return;
    }

    try {
      // Map form fields to API field names
      const apiPayload = {
        full_name: newLead.full_name || '',
        mobile_number: newLead.phone || '',
        email: newLead.email || '',
        company_name: newLead.company_name || newLead.company || '',
        location: newLead.location || '',
        website: newLead.website || '',
        lead_source: newLead.lead_source || newLead.source || 'Website',
        campaign_name: newLead.campaign_name || '',
        service_interest: newLead.service_interest || '',
        lead_status: newLead.lead_status || newLead.status || 'New - Not Contacted',
        lead_quality: newLead.lead_quality || '',
        lead_owner: newLead.lead_owner || '',
        preferred_channel: newLead.preferred_channel || '',
        expected_deal_value: newLead.expected_deal_value || 0,
        original_message: newLead.questions || newLead.message || '',
        notes: newLead.note || newLead.notes || ''
      };

      const response = await api.leads.create(apiPayload);
      if (response.success) {
        toast.success('Lead created successfully');
        setAddDialogOpen(false);
        setNewLead({}); // Reset form
        loadLeads(false);
      } else {
        toast.error(response.message || 'Failed to create lead');
      }
    } catch (error: any) {
      toast.error('Error creating lead: ' + error.message);
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead({ ...lead });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingLead) return;

    try {
      const response = await api.leads.update(editingLead.id, editingLead);
      if (response.success) {
        toast.success('Lead updated successfully');
        setEditDialogOpen(false);
        if (selectedLead?.id === editingLead.id) {
          setSelectedLead(editingLead);
        }
        loadLeads(false);
      } else {
        toast.error(response.message || 'Failed to update lead');
      }
    } catch (error: any) {
      toast.error('Error updating lead: ' + error.message);
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteId) return;

    try {
      const response = await api.leads.delete(deleteId);
      if (response.success) {
        toast.success('Lead deleted successfully');
        setDeleteId(null);
        if (selectedLead?.id === deleteId) {
          setDetailsOpen(false);
          setSelectedLead(null);
        }
        loadLeads(false);
      } else {
        toast.error(response.message || 'Failed to delete lead');
      }
    } catch (error: any) {
      toast.error('Error deleting lead: ' + error.message);
    }
  };

  const handleMarkAsJunk = async () => {
    if (!junkId) return;

    try {
      const response = await api.leads.update(junkId, { status: 'Junk/Dead' });
      if (response.success) {
        toast.success('Lead marked as Junk/Dead');
        setJunkId(null);
        loadLeads(false);
      } else {
        toast.error(response.message || 'Failed to update lead');
      }
    } catch (error: any) {
      toast.error('Error updating lead: ' + error.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) return;

    try {
      const response = await api.leads.deleteBulk(selectedLeads);
      if (response.success) {
        toast.success(`Deleted ${selectedLeads.length} leads`);
        setSelectedLeads([]);
        setBulkDeleteDialogOpen(false);
        loadLeads(false);
      } else {
        toast.error(response.message || 'Failed to delete leads');
      }
    } catch (error: any) {
      toast.error('Error deleting leads: ' + error.message);
    }
  };

  const toggleSelectLead = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pageLeadIds = paginatedLeads.map(l => l.id);
    const allSelected = pageLeadIds.every(id => selectedLeads.includes(id));
    if (allSelected) {
      setSelectedLeads(prev => prev.filter(id => !pageLeadIds.includes(id)));
    } else {
      setSelectedLeads(prev => [...new Set([...prev, ...pageLeadIds])]);
    }
  };

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find(s => s.value === status);
    const displayText = status === 'New - Not Contacted' ? 'New' : 
                       status === 'Closed - Won' ? 'Won' :
                       status === 'Closed - Lost' ? 'Lost' :
                       status === 'Dead / Junk' ? 'Junk' :
                       status === 'In Pipeline' ? 'Pipeline' :
                       status || 'New';
    
    return (
      <Badge 
        className={`${option?.color || 'bg-gray-100 text-gray-800 border border-gray-200'} text-xs px-2 py-1 whitespace-nowrap font-medium`}
        title={status || 'New'}
      >
        {displayText}
      </Badge>
    );
  };

  const getSourceBadge = (source: string) => {
    const option = sourceOptions.find(s => s.value === source);
    return (
      <Badge className={option?.color || 'bg-gray-100 text-gray-800'}>
        {source || 'Other'}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const paginatedLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-gray-500">Manage and track your sales leads</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => loadLeads(false)}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleAddLead}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, company, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Lead Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lead Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {sourceOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No leads found
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Lead ID</TableHead>
                        <TableHead className="w-[140px]">Status</TableHead>
                        <TableHead className="w-[150px]">Full Name</TableHead>
                        <TableHead className="w-[120px]">Company</TableHead>
                        <TableHead className="w-[120px]">Phone</TableHead>
                        <TableHead className="w-[180px]">Email</TableHead>
                        <TableHead className="w-[100px]">Source</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[200px]">Questions</TableHead>
                        <TableHead className="w-[150px]">Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLeads.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-gray-50">
                          <TableCell 
                            className="font-mono text-sm text-blue-600 hover:text-blue-800 cursor-pointer hover:underline w-[100px]"
                            onClick={() => handleViewLead(lead)}
                          >
                            LEAD-{String(lead.id).padStart(4, '0')}
                          </TableCell>
                          <TableCell className="w-[140px]">{getStatusBadge(lead.lead_status || lead.status)}</TableCell>
                          <TableCell className="font-medium w-[150px]">{lead.full_name || '-'}</TableCell>
                          <TableCell className="w-[120px]">{lead.company_name || lead.company || '-'}</TableCell>
                          <TableCell className="w-[120px]">{lead.phone || '-'}</TableCell>
                          <TableCell className="w-[180px]">{lead.email || '-'}</TableCell>
                          <TableCell className="w-[100px]">{getSourceBadge(lead.lead_source || lead.source)}</TableCell>
                          <TableCell className="text-sm text-gray-500 w-[100px]">
                            {formatDate(lead.created_at)}
                          </TableCell>
                          <TableCell className="w-[200px]" title={lead.message || lead.questions}>
                            <div className="truncate">
                              {lead.message || lead.questions || '-'}
                            </div>
                          </TableCell>
                          <TableCell className="w-[150px] truncate" title={lead.notes || lead.note}>
                            {lead.notes || lead.note || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * leadsPerPage + 1} to {Math.min(currentPage * leadsPerPage, leads.length)} of {leads.length} leads
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="py-2 px-3 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Spreadsheet Integration
              </h2>
              <Button variant="outline" onClick={() => setIsAddingSpreadsheet(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Spreadsheet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {spreadsheets.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No spreadsheets configured. Add a Google Sheets URL to import leads.
              </div>
            ) : (
              <div className="space-y-3">
                {spreadsheets.map((sheet) => (
                  <div key={sheet.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{sheet.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{sheet.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleImportSpreadsheet(sheet)}
                        disabled={importing}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSpreadsheet(sheet.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="w-[450px] sm:w-[500px] max-w-[90vw] overflow-y-auto">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="text-lg font-bold text-gray-900">
              {selectedLead?.full_name || 'Lead Details'}
            </SheetTitle>
            <p className="text-gray-600 text-sm">{selectedLead?.company_name || selectedLead?.company || 'No Company'}</p>
          </SheetHeader>
          
          {selectedLead && (
            <div className="space-y-4 pt-4">
              {/* Status and Contact */}
              <div className="flex flex-wrap gap-2 items-center">
                {getStatusBadge(selectedLead.lead_status || selectedLead.status)}
                {getSourceBadge(selectedLead.lead_source || selectedLead.source)}
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">LEAD INFORMATION</h3>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Lead ID:</span>
                    <p className="font-medium">LEAD-{String(selectedLead.id).padStart(4, '0')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Service Interest:</span>
                    <p className="font-medium">ERP Development</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Campaign:</span>
                    <p className="font-medium">ERP Solutions 2024</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Lead Owner:</span>
                    <p className="font-medium">Alex Wilson</p>
                  </div>
                </div>
              </div>

              {/* Contact & Follow-up */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">CONTACT & FOLLOW-UP</h3>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Preferred Channel:</span>
                    <p className="font-medium">WhatsApp</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Lead Generated:</span>
                    <p className="font-medium">{formatDateTime(selectedLead.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">First Contact:</span>
                    <p className="font-medium">{formatDateTime(selectedLead.created_at)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Contact:</span>
                    <p className="font-medium">{selectedLead.updated_at ? formatDateTime(selectedLead.updated_at) : 'Not contacted'}</p>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Next Follow-up:</span>
                  <div className="mt-1">
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded text-sm"
                      placeholder="dd-mm-yyyy --:-- --"
                    />
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  {selectedLead.phone && (
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <Phone className="h-4 w-4" />
                      {selectedLead.phone}
                    </a>
                  )}
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <Mail className="h-4 w-4" />
                      {selectedLead.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Deal Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">DEAL DETAILS</h3>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Lead Status:</span>
                    <div className="mt-1">
                      <Select value={selectedLead.lead_status || selectedLead.status || 'New'}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Closed - Lost">Closed - Lost</SelectItem>
                          <SelectItem value="New - Not Contacted">New - Not Contacted</SelectItem>
                          <SelectItem value="Contacted">Contacted</SelectItem>
                          <SelectItem value="Qualified">Qualified</SelectItem>
                          <SelectItem value="In Pipeline">In Pipeline</SelectItem>
                          <SelectItem value="Closed - Won">Closed - Won</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Lead Quality:</span>
                    <div className="mt-1">
                      <Select defaultValue="Warm">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Warm">Warm</SelectItem>
                          <SelectItem value="Hot">Hot</SelectItem>
                          <SelectItem value="Cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions - Single Field */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">QUESTIONS</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedLead.message || selectedLead.questions || 'No questions recorded'}
                  </p>
                </div>
                
                {(selectedLead.notes || selectedLead.note) && (
                  <div>
                    <h4 className="font-medium text-gray-600 text-xs mb-2">NOTES:</h4>
                    <div className="bg-gray-50 p-3 rounded border">
                      <p className="text-sm whitespace-pre-wrap">
                        {selectedLead.notes || selectedLead.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  Mark as Junk
                </Button>
                <Button className="flex-1">
                  Edit Lead
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isAddingSpreadsheet} onOpenChange={setIsAddingSpreadsheet}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Spreadsheet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={spreadsheetName}
                onChange={(e) => setSpreadsheetName(e.target.value)}
                placeholder="My Leads Sheet"
              />
            </div>
            <div>
              <Label>Google Sheets URL</Label>
              <Input
                value={spreadsheetUrl}
                onChange={(e) => setSpreadsheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingSpreadsheet(false)}>Cancel</Button>
            <Button onClick={handleAddSpreadsheet}>Add Spreadsheet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={newLead.full_name || ''}
                onChange={(e) => setNewLead({ ...newLead, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={newLead.company_name || newLead.company || ''}
                onChange={(e) => setNewLead({ ...newLead, company_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={newLead.phone || ''}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={newLead.email || ''}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={newLead.lead_status || newLead.status || 'New - Not Contacted'} onValueChange={(v) => setNewLead({ ...newLead, lead_status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Source</Label>
              <Select value={newLead.lead_source || newLead.source || 'Website'} onValueChange={(v) => setNewLead({ ...newLead, lead_source: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Questions</Label>
              <Textarea
                value={newLead.questions || ''}
                onChange={(e) => setNewLead({ ...newLead, questions: e.target.value })}
                rows={3}
              />
            </div>
            <div className="col-span-2">
              <Label>Note</Label>
              <Textarea
                value={newLead.note || ''}
                onChange={(e) => setNewLead({ ...newLead, note: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewLead}>Create Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lead - LEAD-{editingLead ? String(editingLead.id).padStart(4, '0') : ''}</DialogTitle>
          </DialogHeader>
          {editingLead && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editingLead.full_name || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, full_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={editingLead.company || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editingLead.phone || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={editingLead.email || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={editingLead.status || 'New'} onValueChange={(v) => setEditingLead({ ...editingLead, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Source</Label>
                <Select value={editingLead.source || 'Other'} onValueChange={(v) => setEditingLead({ ...editingLead, source: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Questions</Label>
                <Textarea
                  value={editingLead.questions || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, questions: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <Label>Note</Label>
                <Textarea
                  value={editingLead.note || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, note: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLead} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={junkId !== null} onOpenChange={() => setJunkId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Junk/Dead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this lead as Junk/Dead?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkAsJunk} className="bg-yellow-600 hover:bg-yellow-700">
              Mark as Junk
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedLeads.length} Leads</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedLeads.length} leads? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Leads;
