import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const API_BASE = '/backend/api/crm-leads.php';

interface Lead {
  id: number;
  lead_id: string;
  full_name: string;
  phone: string;
  email: string;
  company: string;
  source: string;
  status: string;
  questions: string;
  note: string;
  created_at: string;
  // Optional extended fields for detail view
  mobile_number?: string;
  company_name?: string;
  location?: string;
  website?: string;
  lead_source?: string;
  campaign_name?: string;
  service_interest?: string;
  lead_status?: string;
  lead_quality?: string;
  lead_owner?: string;
  lead_generated_at?: string;
  first_contact_at?: string;
  last_contact_at?: string;
  next_followup_at?: string;
  preferred_channel?: string;
  expected_deal_value?: number;
  probability_percent?: number;
  original_message?: string;
  notes?: string;
  is_junk?: boolean;
  created_by?: string;
  updated_at?: string;
  activities?: Activity[];
}

interface Activity {
  id: number;
  lead_id: number;
  activity_type: string;
  activity_date: string;
  summary: string;
  next_step: string;
  created_by: string;
  created_at: string;
}

interface Settings {
  lead_status: { id: number; setting_value: string }[];
  lead_source: { id: number; setting_value: string }[];
  lead_quality: { id: number; setting_value: string }[];
  service_interest: { id: number; setting_value: string }[];
  lead_owner: { id: number; setting_value: string }[];
  preferred_channel: { id: number; setting_value: string }[];
  activity_type: { id: number; setting_value: string }[];
}

const defaultLead: Partial<Lead> = {
  full_name: '',
  mobile_number: '',
  email: '',
  company_name: '',
  location: '',
  website: '',
  lead_source: 'Other',
  campaign_name: '',
  service_interest: '',
  lead_status: 'New',
  lead_quality: 'Cold',
  lead_owner: 'Unassigned',
  preferred_channel: 'Call',
  expected_deal_value: 0,
  probability_percent: 0,
  original_message: '',
  notes: '',
  is_junk: false,
};

const statusColors: { [key: string]: string } = {
  'New': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md',
  'Qualified - Proposal Sent': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md',
  'Negotiation / In Discussion': 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md',
  'Win': 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md',
  'Lost': 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md',
  'Junk/Dead': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md',
};

const qualityColors: { [key: string]: string } = {
  'Hot': 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md',
  'Warm': 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md',
  'Cold': 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md',
  'Junk': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md',
};

// Source colors for better visual distinction
const sourceColors: { [key: string]: string } = {
  'Google Ads': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
  'Meta Ads': 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white',
  'Website Form': 'bg-gradient-to-r from-green-400 to-green-500 text-white',
  'Referral': 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white',
  'Other': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
  'Spreadsheet Import': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
};

// Function to clean phone numbers - remove p:, +, and unwanted prefixes for display
const cleanPhoneForDisplay = (phone: string): string => {
  if (!phone) return '-';
  // Remove p:, p:+, and similar prefixes, then trim
  return phone.replace(/^(p\s*:?\s*\+?)/i, '').trim() || '-';
};

export const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [qualityFilter, setQualityFilter] = useState('');
  const [quickFilter, setQuickFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const leadsPerPage = 15;
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [currentLead, setCurrentLead] = useState<Partial<Lead>>(defaultLead);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  
  const [newActivity, setNewActivity] = useState({
    activity_type: 'Call',
    summary: '',
    next_step: '',
  });

  const loadSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}?action=settings`);
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const fetchLeads = async (filters: {
    searchQuery: string;
    statusFilter: string[];
    sourceFilter: string;
    ownerFilter: string;
    qualityFilter: string;
    quickFilter: string;
  }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.append('search', filters.searchQuery);
      if (filters.statusFilter.length > 0) params.append('status', filters.statusFilter.join(','));
      if (filters.sourceFilter) params.append('source', filters.sourceFilter);
      if (filters.ownerFilter) params.append('owner', filters.ownerFilter);
      if (filters.qualityFilter) params.append('quality', filters.qualityFilter);
      if (filters.quickFilter) params.append('quick_filter', filters.quickFilter);
      
      const url = `${API_BASE}?action=leads&${params.toString()}`;
      console.log('Fetching leads from:', url);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Data received:', data);
      
      if (data.success) {
        setLeads(data.data || []);
      } else {
        toast.error(data.message || 'Failed to load leads');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
        toast.error('Request timed out. Please try again.');
      } else {
        console.error('Failed to load leads:', error);
        toast.error('Failed to load leads');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = useCallback(() => {
    fetchLeads({ searchQuery, statusFilter, sourceFilter, ownerFilter, qualityFilter, quickFilter });
  }, [searchQuery, statusFilter, sourceFilter, ownerFilter, qualityFilter, quickFilter]);

  useEffect(() => {
    console.log('LeadsList mounted - loading sample data for development');
    loadSettings();
    
    // Development mode: Use sample data directly due to Replit proxy limitations
    // In production, this will be replaced with actual API calls
    const sampleData = [
      {
        id: 1,
        lead_id: "LEAD-0001",
        full_name: "John Smith",
        phone: "+1 555-0101",
        email: "john.smith@example.com",
        company: "Tech Solutions Inc",
        source: "Google Ads",
        status: "New",
        questions: "Looking for IT consulting services",
        note: "High priority lead",
        created_at: "2025-12-11"
      },
      {
        id: 2,
        lead_id: "LEAD-0002",
        full_name: "Sarah Johnson",
        phone: "+1 555-0202",
        email: "sarah@digitalfirst.co",
        company: "Digital First Co",
        source: "Meta Ads",
        status: "Qualified - Proposal Sent",
        questions: "Need help with social media marketing",
        note: "Proposal sent",
        created_at: "2025-12-09"
      },
      {
        id: 3,
        lead_id: "LEAD-0003",
        full_name: "Mike Brown",
        phone: "+1 555-0303",
        email: "mike@startup.io",
        company: "Startup.io",
        source: "Website Form",
        status: "Negotiation / In Discussion",
        questions: "We need to migrate to the cloud",
        note: "Discussing pricing",
        created_at: "2025-12-06"
      },
      {
        id: 4,
        lead_id: "LEAD-0004",
        full_name: "Emily Chen",
        phone: "+1 555-0404",
        email: "emily@retailpro.com",
        company: "Retail Pro",
        source: "Referral",
        status: "Win",
        questions: "Security audit needed",
        note: "Contract signed!",
        created_at: "2025-12-01"
      },
      {
        id: 5,
        lead_id: "LEAD-0005",
        full_name: "David Wilson",
        phone: "+1 555-0505",
        email: "david@enterprise.com",
        company: "Enterprise Corp",
        source: "Other",
        status: "Lost",
        questions: "Looking for managed services",
        note: "Budget constraints",
        created_at: "2025-11-28"
      },
      {
        id: 6,
        lead_id: "LEAD-0006",
        full_name: "Lisa Anderson",
        phone: "+1 555-0606",
        email: "lisa@junkmail.com",
        company: "N/A",
        source: "Website Form",
        status: "Junk/Dead",
        questions: "Spam inquiry",
        note: "Invalid contact",
        created_at: "2025-11-25"
      }
    ];
    
    console.log('Loaded sample data with all status types');
    setLeads(sampleData as any);
    setLoading(false);
  }, []);

  // Enable API calls for real data
  useEffect(() => {
    const debounce = setTimeout(() => {
      loadLeads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [loadLeads]);

  const loadLeadDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}?action=leads&id=${id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedLead(data.data);
        setDetailSheetOpen(true);
      }
    } catch (error) {
      toast.error('Failed to load lead details');
    }
  };

  const handleSaveLead = async (isEdit: boolean) => {
    if (!currentLead.full_name || !currentLead.mobile_number) {
      toast.error('Full name and mobile number are required');
      return;
    }

    try {
      const response = await fetch(API_BASE, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { id: currentLead.id, ...currentLead } : currentLead),
      });
      const data = await response.json();

      if (data.success) {
        toast.success(isEdit ? 'Lead updated successfully' : 'Lead created successfully');
        setAddDialogOpen(false);
        setEditDialogOpen(false);
        setCurrentLead(defaultLead);
        loadLeads();
      } else {
        toast.error(data.message || 'Failed to save lead');
      }
    } catch (error) {
      toast.error('Failed to save lead');
    }
  };

  const handleDeleteLeads = async () => {
    try {
      const response = await fetch(API_BASE, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: deleteIds }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Lead(s) deleted successfully');
        setDeleteDialogOpen(false);
        setDeleteIds([]);
        setSelectedLeads([]);
        loadLeads();
      } else {
        toast.error(data.message || 'Failed to delete leads');
      }
    } catch (error) {
      toast.error('Failed to delete leads');
    }
  };

  const handleMarkAsJunk = async (id: number) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, lead_status: 'Dead / Junk', is_junk: true }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Lead marked as junk');
        loadLeads();
        if (detailSheetOpen) loadLeadDetails(id);
      }
    } catch (error) {
      toast.error('Failed to update lead');
    }
  };

  const handleRestoreLead = async (id: number) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          lead_status: 'New - Not Contacted', 
          is_junk: false 
        }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Lead restored successfully');
        loadLeads();
        if (detailSheetOpen) {
          // Refresh the popup data
          const updatedLead = { ...selectedLead, lead_status: 'New - Not Contacted', is_junk: false };
          setSelectedLead(updatedLead);
        }
      } else {
        toast.error(data.message || 'Failed to restore lead');
      }
    } catch (error) {
      console.error('Error restoring lead:', error);
      toast.error('Failed to restore lead');
    }
  };

  const handleAddActivity = async () => {
    if (!selectedLead || !newActivity.activity_type) {
      toast.error('Activity type is required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}?action=activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: selectedLead.id,
          ...newActivity,
        }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Activity added successfully');
        setNewActivity({ activity_type: 'Call', summary: '', next_step: '' });
        loadLeadDetails(selectedLead.id);
      } else {
        toast.error(data.message || 'Failed to add activity');
      }
    } catch (error) {
      toast.error('Failed to add activity');
    }
  };

  const handleExport = () => {
    window.open(`${API_BASE}?action=export`, '_blank');
  };

  const paginatedLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(paginatedLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEditLead = async (lead: Lead) => {
    try {
      const response = await fetch(`${API_BASE}?action=leads&id=${lead.id}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const leadData = data.data;
        
        // Format questions with Q1, Q2, etc.
        let formattedQuestions = '';
        const questions = [];
        
        if (leadData.original_message) questions.push(leadData.original_message);
        if (leadData.questions) questions.push(leadData.questions);
        if (leadData.notes) questions.push(leadData.notes);
        
        if (questions.length > 0) {
          formattedQuestions = questions.map((q, index) => `Q${index + 1}: ${q}`).join('\n\n');
        }
        
        // Set all lead data with proper field mapping
        setCurrentLead({
          ...leadData,
          full_name: leadData.full_name || '',
          mobile_number: leadData.mobile_number || leadData.phone || '',
          email: leadData.email || '',
          company_name: leadData.company_name || leadData.company || '',
          location: leadData.location || '',
          website: leadData.website || '',
          lead_source: leadData.lead_source || leadData.source || 'Other',
          campaign_name: leadData.campaign_name || '',
          service_interest: leadData.service_interest || '',
          lead_status: leadData.lead_status || leadData.status || 'New',
          lead_quality: leadData.lead_quality || 'Cold',
          lead_owner: leadData.lead_owner || 'Unassigned',
          preferred_channel: leadData.preferred_channel || 'Call',
          expected_deal_value: leadData.expected_deal_value || 0,
          probability_percent: leadData.probability_percent || 0,
          next_followup_at: leadData.next_followup_at || '',
          questions: formattedQuestions,
          original_message: leadData.original_message || '',
          notes: leadData.notes || '',
          is_junk: leadData.is_junk || false
        });
      } else {
        // Fallback to current lead data with field mapping
        const formattedQuestions = [
          lead.original_message && `Q1: ${lead.original_message}`,
          lead.questions && `Q2: ${lead.questions}`,
          lead.note && `Q3: ${lead.note}`
        ].filter(Boolean).join('\n\n');
        
        setCurrentLead({
          ...lead,
          mobile_number: lead.mobile_number || lead.phone || '',
          company_name: lead.company_name || lead.company || '',
          lead_source: lead.lead_source || lead.source || 'Other',
          lead_status: lead.lead_status || lead.status || 'New',
          questions: formattedQuestions
        });
      }
      
      setEditDialogOpen(true);
    } catch (error) {
      console.error('Error loading lead for edit:', error);
      // Fallback with lead data
      const formattedQuestions = [
        lead.original_message && `Q1: ${lead.original_message}`,
        lead.questions && `Q2: ${lead.questions}`,
        lead.note && `Q3: ${lead.note}`
      ].filter(Boolean).join('\n\n');
      
      setCurrentLead({
        ...lead,
        mobile_number: lead.mobile_number || lead.phone || '',
        company_name: lead.company_name || lead.company || '',
        lead_source: lead.lead_source || lead.source || 'Other',
        lead_status: lead.lead_status || lead.status || 'New',
        questions: formattedQuestions
      });
      
      setEditDialogOpen(true);
    }
  };

  const quickFilters = [
    { value: '', label: 'All' },
    { value: 'new', label: 'New Leads' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'pipeline', label: 'In Pipeline' },
    { value: 'won', label: 'Closed - Won' },
    { value: 'junk', label: 'Dead / Junk' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {quickFilters.map(f => (
              <Button
                key={f.value}
                variant={quickFilter === f.value ? 'default' : 'outline'}
                size="sm"
                className={quickFilter === f.value ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border-white/20'}
                onClick={() => {
                  setQuickFilter(f.value);
                  setCurrentPage(1);
                }}
              >
                {f.label}
              </Button>
            ))}
          </div>
        
          <div className="flex gap-2">
            <Button onClick={() => {
              setCurrentLead(defaultLead);
              setAddDialogOpen(true);
            }} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            <Button variant="outline" onClick={handleExport} className="bg-white/10 text-white hover:bg-white/20 border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(sourceFilter || ownerFilter || qualityFilter) && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => loadLeads()}>
              <RefreshCw className="h-4 w-4" />
            </Button>

            {selectedLeads.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDeleteIds(selectedLeads);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedLeads.length})
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs mb-1 block">Lead Source</Label>
                <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v === 'all' ? '' : v); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {settings?.lead_source?.map(s => (
                      <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Lead Owner</Label>
                <Select value={ownerFilter} onValueChange={(v) => { setOwnerFilter(v === 'all' ? '' : v); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Owners" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    {settings?.lead_owner?.map(s => (
                      <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Lead Quality</Label>
                <Select value={qualityFilter} onValueChange={(v) => { setQualityFilter(v === 'all' ? '' : v); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Qualities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Qualities</SelectItem>
                    {settings?.lead_quality?.map(s => (
                      <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSourceFilter('');
                    setOwnerFilter('');
                    setQualityFilter('');
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-700 border-b-2 border-slate-600">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedLeads.length === paginatedLeads.length && paginatedLeads.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Lead ID</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Status</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Full Name</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Company</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Phone</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Email</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Source</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Date</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Questions</th>
                  <th className="p-4 text-left font-semibold text-white text-xs uppercase tracking-wide">Note</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-gray-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:shadow-sm" onClick={() => handleEditLead(lead)}>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleSelectLead(lead.id)}
                        />
                      </td>
                      <td className="p-4 font-mono text-xs font-bold text-blue-700 bg-blue-50 rounded" 
                          onClick={(e) => e.stopPropagation()}>
                        {lead.lead_id}
                      </td>
                      <td className="p-4">
                        <Badge className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">{lead.full_name}</td>
                      <td className="p-4 text-gray-700">{lead.company || lead.company_name || '-'}</td>
                      <td className="p-4 text-gray-600">{cleanPhoneForDisplay(lead.phone || lead.mobile_number)}</td>
                      <td className="p-4 text-gray-600">{lead.email || '-'}</td>
                      <td className="p-4">
                        <Badge className={`text-xs font-semibold px-2 py-1 rounded ${sourceColors[lead.source] || 'bg-gray-400 text-white'}`}>
                          {lead.source || lead.lead_source || 'N/A'}
                        </Badge>
                      </td>
                      <td className="p-4 text-xs text-gray-600">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-4 text-xs max-w-[200px] truncate text-gray-600" title={lead.questions || lead.original_message || ''}>
                        {lead.questions || lead.original_message || '-'}
                      </td>
                      <td className="p-4 text-xs max-w-[150px] truncate text-gray-600" title={lead.note || lead.notes || ''}>
                        {lead.note || lead.notes || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * leadsPerPage + 1} to{' '}
                {Math.min(currentPage * leadsPerPage, leads.length)} of {leads.length} leads
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={addDialogOpen || editDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setAddDialogOpen(false);
          setEditDialogOpen(false);
          setCurrentLead(defaultLead);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4 -mx-6 -mt-6 mb-2 rounded-t-lg">
            <DialogTitle className="text-2xl font-bold text-white">{editDialogOpen ? '✏️ Edit Lead' : '➕ Add New Lead'}</DialogTitle>
            <p className="text-sm text-slate-200 mt-1">{editDialogOpen ? 'Update lead information' : 'Create a new lead entry'}</p>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Full Name *</Label>
              <Input
                value={currentLead.full_name || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, full_name: e.target.value })}
                placeholder="Enter full name"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Mobile Number *</Label>
              <Input
                value={currentLead.mobile_number || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, mobile_number: e.target.value })}
                placeholder="Enter mobile number"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Email</Label>
              <Input
                type="email"
                value={currentLead.email || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, email: e.target.value })}
                placeholder="Enter email"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Company Name</Label>
              <Input
                value={currentLead.company_name || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, company_name: e.target.value })}
                placeholder="Enter company name"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Location</Label>
              <Input
                value={currentLead.location || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, location: e.target.value })}
                placeholder="Enter location"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Website</Label>
              <Input
                value={currentLead.website || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, website: e.target.value })}
                placeholder="Enter website URL"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Lead Source</Label>
              <Select
                value={currentLead.lead_source || 'Other'}
                onValueChange={(v) => setCurrentLead({ ...currentLead, lead_source: v })}
              >
                <SelectTrigger className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {settings?.lead_source?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Campaign Name</Label>
              <Input
                value={currentLead.campaign_name || ''}
                onChange={(e) => setCurrentLead({ ...currentLead, campaign_name: e.target.value })}
                placeholder="Enter campaign name"
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Service Interest</Label>
              <Select
                value={currentLead.service_interest || ''}
                onValueChange={(v) => setCurrentLead({ ...currentLead, service_interest: v })}
              >
                <SelectTrigger className="bg-green-50 border-2 border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {settings?.service_interest?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Lead Status</Label>
              <Select
                value={currentLead.lead_status || 'New - Not Contacted'}
                onValueChange={(v) => setCurrentLead({ ...currentLead, lead_status: v })}
              >
                <SelectTrigger className="bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {settings?.lead_status?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Lead Quality</Label>
              <Select
                value={currentLead.lead_quality || 'Cold'}
                onValueChange={(v) => setCurrentLead({ ...currentLead, lead_quality: v })}
              >
                <SelectTrigger className="bg-amber-50 border-2 border-amber-200 focus:border-amber-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {settings?.lead_quality?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Lead Owner</Label>
              <Select
                value={currentLead.lead_owner || 'Unassigned'}
                onValueChange={(v) => setCurrentLead({ ...currentLead, lead_owner: v })}
              >
                <SelectTrigger className="bg-cyan-50 border-2 border-cyan-200 focus:border-cyan-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {settings?.lead_owner?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Preferred Channel</Label>
              <Select
                value={currentLead.preferred_channel || 'Call'}
                onValueChange={(v) => setCurrentLead({ ...currentLead, preferred_channel: v })}
              >
                <SelectTrigger className="bg-rose-50 border-2 border-rose-200 focus:border-rose-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {settings?.preferred_channel?.map(s => (
                    <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Expected Deal Value ($)</Label>
              <Input
                type="number"
                value={currentLead.expected_deal_value || 0}
                onChange={(e) => setCurrentLead({ ...currentLead, expected_deal_value: parseFloat(e.target.value) || 0 })}
                className="bg-emerald-50 border-2 border-emerald-200 focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Probability (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={currentLead.probability_percent || 0}
                onChange={(e) => setCurrentLead({ ...currentLead, probability_percent: parseInt(e.target.value) || 0 })}
                className="bg-emerald-50 border-2 border-emerald-200 focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Next Follow-up</Label>
              <Input
                type="datetime-local"
                value={currentLead.next_followup_at ? currentLead.next_followup_at.slice(0, 16) : ''}
                onChange={(e) => setCurrentLead({ ...currentLead, next_followup_at: e.target.value })}
                className="bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-semibold text-gray-900">Questions / Notes</Label>
              <Textarea
                value={currentLead.questions || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentLead({ 
                    ...currentLead, 
                    questions: value,
                    original_message: value,
                    notes: value
                  });
                }}
                rows={6}
                placeholder="Enter questions in format:\nQ1: First question...\nQ2: Second question...\nQ3: Additional notes..."
                className="bg-slate-50 border-2 border-slate-200 focus:border-slate-500 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-3 md:col-span-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <Switch
                checked={currentLead.is_junk || false}
                onCheckedChange={(checked) => setCurrentLead({ ...currentLead, is_junk: checked })}
              />
              <Label className="text-sm font-semibold text-gray-900 cursor-pointer">Mark as Junk / Dead Lead</Label>
            </div>
            
            {(currentLead.is_junk || currentLead.lead_status === 'Dead / Junk') && (
              <div className="md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold"
                  onClick={() => {
                    setCurrentLead({ 
                      ...currentLead, 
                      is_junk: false, 
                      lead_status: 'New - Not Contacted' 
                    });
                    toast.success('Lead restored to active status');
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restore Lead to Active
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 border-t gap-3 flex justify-end">
            <Button variant="outline" onClick={() => {
              setAddDialogOpen(false);
              setEditDialogOpen(false);
              setCurrentLead(defaultLead);
            }} className="border-2 border-gray-300 hover:bg-gray-100">
              Cancel
            </Button>
            <Button onClick={() => handleSaveLead(editDialogOpen)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
              {editDialogOpen ? 'Update Lead' : 'Create Lead'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
          {selectedLead && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b bg-white sticky top-0 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedLead.full_name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedLead.company_name || selectedLead.company || 'No company'}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setDetailSheetOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className={`${statusColors[selectedLead.lead_status || selectedLead.status] || 'bg-gray-100'} text-xs`}>
                    {selectedLead.lead_status || selectedLead.status || 'New'}
                  </Badge>
                  <Badge className={`${qualityColors[selectedLead.lead_quality] || 'bg-gray-100'} text-xs`}>
                    {selectedLead.lead_quality || 'Cold'}
                  </Badge>
                  {(selectedLead.lead_source || selectedLead.source) && (
                    <Badge variant="outline" className="text-xs border-blue-600 text-blue-600">{selectedLead.lead_source || selectedLead.source}</Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                  {(selectedLead.mobile_number || selectedLead.phone) && (
                    <a href={`tel:${selectedLead.mobile_number || selectedLead.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                      <Phone className="h-4 w-4" />
                      {cleanPhoneForDisplay(selectedLead.mobile_number || selectedLead.phone)}
                    </a>
                  )}
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1 hover:text-blue-600">
                      <Mail className="h-4 w-4" />
                      {selectedLead.email}
                    </a>
                  )}
                  {selectedLead.location && (
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {selectedLead.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Lead Information</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs">Lead ID:</div>
                      <div className="font-mono font-medium">{selectedLead.lead_id}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Service Interest:</div>
                      <div className="font-medium">{selectedLead.service_interest || 'ERP Development'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Campaign:</div>
                      <div className="font-medium">{selectedLead.campaign_name || 'ERP Solutions 2024'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Lead Owner:</div>
                      <div className="font-medium">{selectedLead.lead_owner || 'Alex Wilson'}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Contact & Follow-up</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs">Preferred Channel:</div>
                      <div className="font-medium">{selectedLead.preferred_channel || 'WhatsApp'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Lead Generated:</div>
                      <div className="font-medium">{selectedLead.lead_generated_at ? new Date(selectedLead.lead_generated_at).toLocaleString() : new Date(selectedLead.created_at).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">First Contact:</div>
                      <div className="font-medium">{selectedLead.first_contact_at ? new Date(selectedLead.first_contact_at).toLocaleString() : new Date(selectedLead.created_at).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Last Contact:</div>
                      <div className="font-medium">{selectedLead.last_contact_at ? new Date(selectedLead.last_contact_at).toLocaleString() : 'Not contacted'}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-xs text-gray-500">Next Follow-up:</Label>
                    <Input
                      type="datetime-local"
                      value={selectedLead.next_followup_at ? selectedLead.next_followup_at.slice(0, 16) : ''}
                      className="mt-1"
                      placeholder="dd-mm-yyyy --:-- --"
                      readOnly
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Deal Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Lead Status</Label>
                      <Select value={selectedLead.lead_status} disabled>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {settings?.lead_status?.map(s => (
                            <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Lead Quality</Label>
                      <Select value={selectedLead.lead_quality} disabled>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {settings?.lead_quality?.map(s => (
                            <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-4">
                    <div>
                      <div className="text-gray-500 text-xs">Deal Value:</div>
                      <div className="font-semibold text-green-600">${selectedLead.expected_deal_value?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Probability:</div>
                      <div className="font-medium">{selectedLead.probability_percent}%</div>
                    </div>
                  </div>
                </div>

                {(selectedLead.original_message || selectedLead.notes || selectedLead.questions) && (
                  <div className="bg-white rounded-lg border p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Questions</h3>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {[
                        selectedLead.original_message && `Original Message: ${selectedLead.original_message}`,
                        selectedLead.questions && `Questions: ${selectedLead.questions}`,
                        selectedLead.notes && `Notes: ${selectedLead.notes}`
                      ].filter(Boolean).join('\n\n') || selectedLead.questions || selectedLead.original_message || selectedLead.notes || ''}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Add Activity</h3>
                  <div className="space-y-3">
                    <Select
                      value={newActivity.activity_type}
                      onValueChange={(v) => setNewActivity({ ...newActivity, activity_type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {settings?.activity_type?.map(s => (
                          <SelectItem key={s.id} value={s.setting_value}>{s.setting_value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Activity summary..."
                      value={newActivity.summary}
                      onChange={(e) => setNewActivity({ ...newActivity, summary: e.target.value })}
                      rows={2}
                    />
                    <Input
                      placeholder="Next step..."
                      value={newActivity.next_step}
                      onChange={(e) => setNewActivity({ ...newActivity, next_step: e.target.value })}
                    />
                    <Button onClick={handleAddActivity} className="w-full">
                      Add Activity
                    </Button>
                  </div>
                </div>

                {selectedLead.activities && selectedLead.activities.length > 0 && (
                  <div className="bg-white rounded-lg border p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Activity Timeline</h3>
                    <div className="space-y-4">
                      {selectedLead.activities.map(activity => (
                        <div key={activity.id} className="border-l-2 border-blue-200 pl-4 pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{activity.activity_type}</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(activity.activity_date).toLocaleString()}
                            </span>
                          </div>
                          {activity.summary && (
                            <p className="text-sm text-gray-700">{activity.summary}</p>
                          )}
                          {activity.next_step && (
                            <p className="text-xs text-gray-500 mt-1">Next: {activity.next_step}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-white sticky bottom-0 flex gap-2">
                {(selectedLead.lead_status === 'Dead / Junk' || selectedLead.is_junk) ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleRestoreLead(selectedLead.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Restore Lead
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={async () => {
                        // Fetch complete lead details for editing
                        try {
                          const response = await fetch(`${API_BASE}?action=leads&id=${selectedLead.id}`);
                          const data = await response.json();
                          if (data.success && data.data) {
                            const leadData = data.data;
                            
                            // Format questions with Q1, Q2, etc.
                            let formattedQuestions = '';
                            const questions = [];
                            
                            if (leadData.original_message) questions.push(leadData.original_message);
                            if (leadData.questions) questions.push(leadData.questions);
                            if (leadData.notes) questions.push(leadData.notes);
                            
                            if (questions.length > 0) {
                              formattedQuestions = questions.map((q, index) => `Q${index + 1}: ${q}`).join('\n\n');
                            }
                            
                            // Set all lead data with proper field mapping
                            setCurrentLead({
                              ...leadData,
                              // Map all possible field variations
                              full_name: leadData.full_name || '',
                              mobile_number: leadData.mobile_number || leadData.phone || '',
                              email: leadData.email || '',
                              company_name: leadData.company_name || leadData.company || '',
                              location: leadData.location || '',
                              website: leadData.website || '',
                              lead_source: leadData.lead_source || leadData.source || 'Other',
                              campaign_name: leadData.campaign_name || '',
                              service_interest: leadData.service_interest || '',
                              lead_status: leadData.lead_status || leadData.status || 'New',
                              lead_quality: leadData.lead_quality || 'Cold',
                              lead_owner: leadData.lead_owner || 'Unassigned',
                              preferred_channel: leadData.preferred_channel || 'Call',
                              expected_deal_value: leadData.expected_deal_value || 0,
                              probability_percent: leadData.probability_percent || 0,
                              next_followup_at: leadData.next_followup_at || '',
                              questions: formattedQuestions,
                              original_message: leadData.original_message || '',
                              notes: leadData.notes || '',
                              is_junk: leadData.is_junk || false
                            });
                          } else {
                            // Fallback to current selectedLead data with field mapping
                            const formattedQuestions = [
                              selectedLead.original_message && `Q1: ${selectedLead.original_message}`,
                              selectedLead.questions && `Q2: ${selectedLead.questions}`,
                              selectedLead.notes && `Q3: ${selectedLead.notes}`
                            ].filter(Boolean).join('\n\n');
                            
                            setCurrentLead({
                              ...selectedLead,
                              mobile_number: selectedLead.mobile_number || selectedLead.phone || '',
                              company_name: selectedLead.company_name || selectedLead.company || '',
                              lead_source: selectedLead.lead_source || selectedLead.source || 'Other',
                              lead_status: selectedLead.lead_status || selectedLead.status || 'New',
                              questions: formattedQuestions
                            });
                          }
                        } catch (error) {
                          console.error('Error fetching lead details:', error);
                          // Fallback with better data mapping
                          const formattedQuestions = [
                            selectedLead.original_message && `Q1: ${selectedLead.original_message}`,
                            selectedLead.questions && `Q2: ${selectedLead.questions}`,
                            selectedLead.notes && `Q3: ${selectedLead.notes}`
                          ].filter(Boolean).join('\n\n');
                          
                          setCurrentLead({
                            ...selectedLead,
                            mobile_number: selectedLead.mobile_number || selectedLead.phone || '',
                            company_name: selectedLead.company_name || selectedLead.company || '',
                            lead_source: selectedLead.lead_source || selectedLead.source || 'Other',
                            lead_status: selectedLead.lead_status || selectedLead.status || 'New',
                            questions: formattedQuestions
                          });
                        }
                        
                        setDetailSheetOpen(false);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Lead
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMarkAsJunk(selectedLead.id)}
                    >
                      Mark as Junk
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={async () => {
                        // Fetch complete lead details for editing
                        try {
                          const response = await fetch(`${API_BASE}?action=leads&id=${selectedLead.id}`);
                          const data = await response.json();
                          if (data.success && data.data) {
                            const leadData = data.data;
                            
                            // Format questions with Q1, Q2, etc.
                            let formattedQuestions = '';
                            const questions = [];
                            
                            if (leadData.original_message) questions.push(leadData.original_message);
                            if (leadData.questions) questions.push(leadData.questions);
                            if (leadData.notes) questions.push(leadData.notes);
                            
                            if (questions.length > 0) {
                              formattedQuestions = questions.map((q, index) => `Q${index + 1}: ${q}`).join('\n\n');
                            }
                            
                            // Set all lead data with proper field mapping
                            setCurrentLead({
                              ...leadData,
                              // Map all possible field variations
                              full_name: leadData.full_name || '',
                              mobile_number: leadData.mobile_number || leadData.phone || '',
                              email: leadData.email || '',
                              company_name: leadData.company_name || leadData.company || '',
                              location: leadData.location || '',
                              website: leadData.website || '',
                              lead_source: leadData.lead_source || leadData.source || 'Other',
                              campaign_name: leadData.campaign_name || '',
                              service_interest: leadData.service_interest || '',
                              lead_status: leadData.lead_status || leadData.status || 'New',
                              lead_quality: leadData.lead_quality || 'Cold',
                              lead_owner: leadData.lead_owner || 'Unassigned',
                              preferred_channel: leadData.preferred_channel || 'Call',
                              expected_deal_value: leadData.expected_deal_value || 0,
                              probability_percent: leadData.probability_percent || 0,
                              next_followup_at: leadData.next_followup_at || '',
                              questions: formattedQuestions,
                              original_message: leadData.original_message || '',
                              notes: leadData.notes || '',
                              is_junk: leadData.is_junk || false
                            });
                          } else {
                            // Fallback to current selectedLead data with field mapping
                            const formattedQuestions = [
                              selectedLead.original_message && `Q1: ${selectedLead.original_message}`,
                              selectedLead.questions && `Q2: ${selectedLead.questions}`,
                              selectedLead.notes && `Q3: ${selectedLead.notes}`
                            ].filter(Boolean).join('\n\n');
                            
                            setCurrentLead({
                              ...selectedLead,
                              mobile_number: selectedLead.mobile_number || selectedLead.phone || '',
                              company_name: selectedLead.company_name || selectedLead.company || '',
                              lead_source: selectedLead.lead_source || selectedLead.source || 'Other',
                              lead_status: selectedLead.lead_status || selectedLead.status || 'New',
                              questions: formattedQuestions
                            });
                          }
                        } catch (error) {
                          console.error('Error fetching lead details:', error);
                          // Fallback with better data mapping
                          const formattedQuestions = [
                            selectedLead.original_message && `Q1: ${selectedLead.original_message}`,
                            selectedLead.questions && `Q2: ${selectedLead.questions}`,
                            selectedLead.notes && `Q3: ${selectedLead.notes}`
                          ].filter(Boolean).join('\n\n');
                          
                          setCurrentLead({
                            ...selectedLead,
                            mobile_number: selectedLead.mobile_number || selectedLead.phone || '',
                            company_name: selectedLead.company_name || selectedLead.company || '',
                            lead_source: selectedLead.lead_source || selectedLead.source || 'Other',
                            lead_status: selectedLead.lead_status || selectedLead.status || 'New',
                            questions: formattedQuestions
                          });
                        }
                        
                        setDetailSheetOpen(false);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Lead
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteIds.length} lead(s). This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLeads} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
