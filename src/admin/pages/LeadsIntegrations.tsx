import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
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
    create: async (lead: any) => {
      try {
        // Use the CRM leads API that has duplicate checking
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
            lead_source: 'Spreadsheet Import',
            lead_status: 'New - Not Contacted',
            entry_source: 'spreadsheet_import'
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
    if (url.includes('/export?format=csv') || url.endsWith('.csv')) {
      const csvMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)\/export/);
      if (csvMatch && csvMatch[1]) return csvMatch[1];
      return null;
    }
    return null;
  } catch (error) {
    console.error('Error extracting spreadsheet ID:', error);
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
    console.error('Error converting to CSV URL:', error);
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
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  // Function to clean phone numbers - remove p:, +, and any unwanted prefixes
  const cleanPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    // Remove p:, p:+, and similar prefixes, then trim
    return phone.replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim();
  };

  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const rows: SpreadsheetRow[] = [];
  const seenPhones = new Set<string>(); // Track phone numbers to prevent duplicates
  const seenEmails = new Set<string>(); // Track emails to prevent duplicates

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]).map(v => v.trim().replace(/"/g, ''));
    const row: SpreadsheetRow = { name: '', email: '', phone: '', country: '', message: '', sourcePage: '', selectedPlan: '' };

    headers.forEach((header, index) => {
      const value = values[index] || '';
      switch (header) {
        case 'name': case 'full name': case 'contact name': case 'customer name':
          row.name = value; break;
        case 'email': case 'email address': case 'customer email':
          row.email = value.toLowerCase(); break;
        case 'phone': case 'phone number': case 'mobile': case 'contact number':
          row.phone = cleanPhoneNumber(value); break;
        case 'country': case 'location': case 'customer country':
          row.country = value; break;
        case 'message': case 'comments': case 'notes': case 'description':
          row.message = value; break;
        case 'source': case 'source page': case 'page': case 'referral source':
          row.sourcePage = value; break;
        case 'plan': case 'selected plan': case 'service': case 'product':
          row.selectedPlan = value; break;
      }
    });

    // Skip if missing required fields
    if (!row.name || !row.email) continue;

    // Skip if phone number or email already exists
    if (row.phone && seenPhones.has(row.phone)) {
      console.log(`Skipping duplicate phone number: ${row.phone}`);
      continue;
    }
    if (seenEmails.has(row.email)) {
      console.log(`Skipping duplicate email: ${row.email}`);
      continue;
    }

    // Add to seen sets
    if (row.phone) seenPhones.add(row.phone);
    seenEmails.add(row.email);

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
  const [importResults, setImportResults] = useState<SpreadsheetImportResult | null>(null);
  const [syncIntervals, setSyncIntervals] = useState<Record<string, NodeJS.Timeout>>({});
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpreadsheets();
    return () => {
      Object.values(syncIntervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  const loadSpreadsheets = async () => {
    try {
      setLoading(true);
      const response = await api.spreadsheets.getAll();
      if (response?.success) {
        const spreadsheetsData = response.data || [];
        setSpreadsheets(spreadsheetsData);
        spreadsheetsData.forEach((spreadsheet: SpreadsheetConfig) => {
          if (spreadsheet.auto_sync && spreadsheet.is_active) {
            startAutoSync(spreadsheet);
          }
        });
      } else {
        toast.error(response?.message || 'Failed to load spreadsheets');
      }
    } catch (error: any) {
      console.error('Error loading spreadsheets:', error);
      toast.error('Error loading spreadsheets');
    } finally {
      setLoading(false);
    }
  };

  const startAutoSync = (spreadsheet: SpreadsheetConfig) => {
    if (syncIntervals[spreadsheet.id.toString()]) {
      clearInterval(syncIntervals[spreadsheet.id.toString()]);
    }
    const interval = setInterval(() => {
      processSpreadsheet(spreadsheet);
    }, spreadsheet.sync_interval * 60 * 1000);
    setSyncIntervals(prev => ({ ...prev, [spreadsheet.id.toString()]: interval }));
  };

  const stopAutoSync = (spreadsheetId: number) => {
    const idStr = spreadsheetId.toString();
    if (syncIntervals[idStr]) {
      clearInterval(syncIntervals[idStr]);
      setSyncIntervals(prev => {
        const newIntervals = { ...prev };
        delete newIntervals[idStr];
        return newIntervals;
      });
    }
  };

  const testSpreadsheetUrl = async (url: string) => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const csvUrl = convertToCsvUrl(url);
      if (!csvUrl) {
        throw new Error('Invalid Google Sheets URL');
      }
      const response = await fetch(csvUrl, { method: 'HEAD' });
      if (response.ok) {
        setTestResult({ success: true, message: '✓ Spreadsheet URL is accessible and valid' });
        toast.success('Spreadsheet URL test successful!');
      } else if (response.status === 403) {
        setTestResult({ success: false, message: '✗ Sheet is not published. Please publish the sheet first.' });
        toast.error('Sheet is not published');
      } else {
        setTestResult({ success: false, message: `✗ Failed to access spreadsheet (HTTP ${response.status})` });
        toast.error('Failed to access spreadsheet');
      }
    } catch (error: any) {
      setTestResult({ success: false, message: `✗ Error: ${error.message}` });
      toast.error('Failed to test spreadsheet URL');
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddSpreadsheet = async () => {
    if (!spreadsheetName.trim() || !spreadsheetUrl.trim()) {
      toast.error('Please enter both name and URL');
      return;
    }
    const csvUrl = convertToCsvUrl(spreadsheetUrl);
    if (!csvUrl) {
      toast.error('Invalid Google Sheets URL');
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
        setTestResult(null);
        toast.success('Spreadsheet added successfully');
      } else {
        toast.error(response.message || 'Failed to add spreadsheet');
      }
    } catch (error: any) {
      toast.error('Error adding spreadsheet: ' + error.message);
    }
  };

  const handleEditSpreadsheet = async (spreadsheet: SpreadsheetConfig) => {
    try {
      const response = await api.spreadsheets.update(spreadsheet.id, {
        name: spreadsheet.name,
        url: spreadsheet.url,
        sync_interval: spreadsheet.sync_interval,
        auto_sync: spreadsheet.auto_sync,
        is_active: spreadsheet.is_active
      });
      if (response.success) {
        setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? response.data : s));
        setEditingSpreadsheetId(null);
        if (response.data.auto_sync && response.data.is_active) {
          startAutoSync(response.data);
        } else {
          stopAutoSync(spreadsheet.id);
        }
        toast.success('Spreadsheet updated successfully');
      } else {
        toast.error(response.message || 'Failed to update spreadsheet');
      }
    } catch (error: any) {
      toast.error('Error updating spreadsheet: ' + error.message);
    }
  };

  const handleDeleteSpreadsheet = async (spreadsheetId: number) => {
    try {
      const response = await api.spreadsheets.delete(spreadsheetId);
      if (response.success) {
        stopAutoSync(spreadsheetId);
        setSpreadsheets(prev => prev.filter(s => s.id !== spreadsheetId));
        toast.success('Spreadsheet deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete spreadsheet');
      }
    } catch (error: any) {
      toast.error('Error deleting spreadsheet: ' + error.message);
    }
  };

  const processSpreadsheet = async (spreadsheet: SpreadsheetConfig) => {
    const csvUrl = convertToCsvUrl(spreadsheet.url);
    if (!csvUrl) {
      toast.error(`Spreadsheet "${spreadsheet.name}" has invalid URL`);
      return;
    }
    if (!spreadsheet.is_active) return;

    setImporting(true);
    try {
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error(`Failed to fetch spreadsheet data (HTTP ${response.status})`);
      
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      if (rows.length === 0) throw new Error('No data found in spreadsheet');

      let successCount = 0;
      let failedCount = 0;
      let duplicateCount = 0;
      const errors: string[] = [];

      // Check for existing leads in database first
      const existingLeadsResponse = await fetch('/backend/api/crm-leads.php?action=leads');
      const existingLeadsData = await existingLeadsResponse.json();
      const existingLeads = existingLeadsData.success ? existingLeadsData.data : [];
      
      // Create sets of existing emails and phone numbers
      const existingEmails = new Set(existingLeads.map((lead: any) => lead.email?.toLowerCase()).filter(Boolean));
      const existingPhones = new Set(existingLeads.map((lead: any) => {
        const phone = lead.phone || lead.mobile_number;
        return phone ? phone.replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim() : null;
      }).filter(Boolean));

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.name && row.email) {
          // Check for duplicates
          const cleanEmail = row.email.toLowerCase();
          const cleanPhone = row.phone ? row.phone.replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim() : '';
          
          if (existingEmails.has(cleanEmail)) {
            duplicateCount++;
            errors.push(`Row ${i + 1}: Email ${cleanEmail} already exists`);
            continue;
          }
          
          if (cleanPhone && existingPhones.has(cleanPhone)) {
            duplicateCount++;
            errors.push(`Row ${i + 1}: Phone ${cleanPhone} already exists`);
            continue;
          }

          try {
            const result = await api.leads.create({
              name: row.name,
              email: row.email,
              phone: row.phone,
              country: row.country || '',
              message: row.message || '',
              sourcePage: row.sourcePage || '',
              selectedPlan: row.selectedPlan || '',
              company: row.country || '',
              notes: `Imported from spreadsheet: ${spreadsheet.name}`
            });
            
            // Add to existing sets to prevent duplicates within this batch
            existingEmails.add(cleanEmail);
            if (cleanPhone) existingPhones.add(cleanPhone);
            successCount++;
            
          } catch (error: any) {
            // Check if it's a duplicate error from backend
            if (error.message && (error.message.toLowerCase().includes('duplicate') || error.message.toLowerCase().includes('already exists'))) {
              duplicateCount++;
              errors.push(`Row ${i + 1}: ${error.message}`);
            } else {
              failedCount++;
              errors.push(`Row ${i + 1}: ${row.name} - ${error.message}`);
            }
          }
        } else {
          failedCount++;
          errors.push(`Row ${i + 1}: Missing name or email`);
        }
      }

      // Determine status
      let status: 'success' | 'partial' | 'all_duplicates' | 'error' = 'success';
      if (successCount === 0 && duplicateCount > 0 && failedCount === 0) {
        status = 'all_duplicates';
      } else if (successCount > 0 && (duplicateCount > 0 || failedCount > 0)) {
        status = 'partial';
      } else if (failedCount > 0 && successCount === 0) {
        status = 'error';
      }

      const result: SpreadsheetImportResult = {
        spreadsheetId: spreadsheet.id,
        spreadsheetName: spreadsheet.name,
        success: successCount,
        failed: failedCount,
        duplicates: duplicateCount,
        errors: errors.slice(0, 10),
        timestamp: new Date().toISOString(),
        status
      };

      setImportResults(result);
      setSyncHistory(prev => [result, ...prev.slice(0, 9)]);

      try {
        await api.spreadsheets.update(spreadsheet.id, { last_synced: new Date().toISOString() });
      } catch (error) {
        console.error('Failed to update last_synced:', error);
      }

      setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? { ...s, last_synced: new Date().toISOString() } : s));

      // Display appropriate messages based on results
      if (successCount > 0) {
        toast.success(`Spreadsheet "${spreadsheet.name}": Imported ${successCount} leads`);
      } else if (duplicateCount > 0 && failedCount === 0) {
        toast.info(`Spreadsheet "${spreadsheet.name}": All ${duplicateCount} leads already exist in database`);
      } else if (failedCount > 0 && successCount === 0) {
        toast.warning(`Spreadsheet "${spreadsheet.name}": Failed to import ${failedCount} leads`);
      }
      
      if (duplicateCount > 0 && (successCount > 0 || failedCount > 0)) {
        toast.info(`Spreadsheet "${spreadsheet.name}": Skipped ${duplicateCount} duplicate leads`);
      }
    } catch (error: any) {
      console.error('Import error:', error);
      
      // Determine if this is a "no data" error or a real error
      const isNoDataError = error.message && error.message.includes('No data');
      const status: 'no_data' | 'error' = isNoDataError ? 'no_data' : 'error';
      
      // Only show toast error for actual errors, not for "no data" case
      if (!isNoDataError) {
        toast.error(`Error importing spreadsheet "${spreadsheet.name}": ${error.message}`);
      }
      
      setImportResults({
        spreadsheetId: spreadsheet.id,
        spreadsheetName: spreadsheet.name,
        success: 0,
        failed: 0,
        duplicates: 0,
        errors: [error.message],
        timestamp: new Date().toISOString(),
        status
      });
    } finally {
      setImporting(false);
    }
  };

  const handleProcessAllSpreadsheets = async () => {
    const activeSpreadsheets = spreadsheets.filter(s => s.is_active);
    if (activeSpreadsheets.length === 0) {
      toast.error('No active spreadsheets to process');
      return;
    }

    setImporting(true);
    let totalSuccess = 0;
    let totalFailed = 0;
    let totalDuplicates = 0;

    try {
      // Fetch existing leads once at the beginning
      const existingLeadsResponse = await fetch('/backend/api/crm-leads.php?action=leads');
      const existingLeadsData = await existingLeadsResponse.json();
      const existingLeads = existingLeadsData.success ? existingLeadsData.data : [];
      
      // Create global sets of existing emails and phone numbers
      const globalExistingEmails = new Set(existingLeads.map((lead: any) => lead.email?.toLowerCase()).filter(Boolean));
      const globalExistingPhones = new Set(existingLeads.map((lead: any) => {
        const phone = lead.phone || lead.mobile_number;
        return phone ? phone.replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim() : null;
      }).filter(Boolean));

      for (const spreadsheet of activeSpreadsheets) {
        try {
          const csvUrl = convertToCsvUrl(spreadsheet.url);
          if (!csvUrl) {
            toast.error(`Spreadsheet "${spreadsheet.name}" has invalid URL`);
            continue;
          }

          const response = await fetch(csvUrl);
          if (!response.ok) {
            toast.error(`Failed to fetch data from "${spreadsheet.name}"`);
            continue;
          }
          
          const csvText = await response.text();
          const rows = parseCSV(csvText);
          if (rows.length === 0) {
            toast.warning(`No data found in spreadsheet "${spreadsheet.name}"`);
            continue;
          }

          let successCount = 0;
          let failedCount = 0;
          let duplicateCount = 0;
          const errors: string[] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.name && row.email) {
              // Check for duplicates against global sets
              const cleanEmail = row.email.toLowerCase();
              const cleanPhone = row.phone ? row.phone.replace(/^(p\s*:?\s*\+?|\+?)/i, '').trim() : '';
              
              if (globalExistingEmails.has(cleanEmail)) {
                duplicateCount++;
                errors.push(`Row ${i + 1}: Email ${cleanEmail} already exists`);
                continue;
              }
              
              if (cleanPhone && globalExistingPhones.has(cleanPhone)) {
                duplicateCount++;
                errors.push(`Row ${i + 1}: Phone ${cleanPhone} already exists`);
                continue;
              }

              try {
                const result = await api.leads.create({
                  name: row.name,
                  email: row.email,
                  phone: row.phone,
                  country: row.country || '',
                  message: row.message || '',
                  sourcePage: row.sourcePage || '',
                  selectedPlan: row.selectedPlan || '',
                  company: row.country || '',
                  notes: `Imported from spreadsheet: ${spreadsheet.name}`
                });
                
                if (result.success) {
                  // Add to global sets to prevent duplicates in subsequent spreadsheets
                  globalExistingEmails.add(cleanEmail);
                  if (cleanPhone) globalExistingPhones.add(cleanPhone);
                  successCount++;
                } else {
                  failedCount++;
                  errors.push(`Row ${i + 1}: ${result.message || 'Failed to create lead'}`);
                }
              } catch (error: any) {
                // Check if it's a duplicate error from backend
                if (error.message && error.message.toLowerCase().includes('duplicate')) {
                  duplicateCount++;
                  errors.push(`Row ${i + 1}: ${error.message}`);
                } else {
                  failedCount++;
                  errors.push(`Row ${i + 1}: ${row.name} - ${error.message}`);
                }
              }
            } else {
              failedCount++;
              errors.push(`Row ${i + 1}: Missing name or email`);
            }
          }

          totalSuccess += successCount;
          totalFailed += failedCount;
          totalDuplicates += duplicateCount;

          // Update last synced for this spreadsheet
          try {
            await api.spreadsheets.update(spreadsheet.id, { last_synced: new Date().toISOString() });
            setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? { ...s, last_synced: new Date().toISOString() } : s));
          } catch (error) {
            console.error('Failed to update last_synced for', spreadsheet.name, ':', error);
          }

          // Individual spreadsheet feedback
          if (successCount > 0) {
            toast.success(`"${spreadsheet.name}": Imported ${successCount} leads`);
          } else if (duplicateCount > 0 && failedCount === 0) {
            toast.info(`"${spreadsheet.name}": All ${duplicateCount} leads already exist in database`);
          } else if (failedCount > 0 && successCount === 0) {
            toast.warning(`"${spreadsheet.name}": Failed to import ${failedCount} leads`);
          }
          
          if (duplicateCount > 0 && (successCount > 0 || failedCount > 0)) {
            toast.info(`"${spreadsheet.name}": Skipped ${duplicateCount} duplicate leads`);
          }

        } catch (error: any) {
          console.error(`Error processing spreadsheet "${spreadsheet.name}":`, error);
          toast.error(`Error processing "${spreadsheet.name}": ${error.message}`);
        }
      }

      // Overall summary
      const summaryMessage = `Sync All Complete: ${totalSuccess} imported, ${totalDuplicates} duplicates skipped, ${totalFailed} failed across ${activeSpreadsheets.length} spreadsheets`;
      if (totalSuccess > 0 || totalDuplicates > 0) {
        toast.success(summaryMessage);
      } else if (totalFailed > 0) {
        toast.error(summaryMessage);
      } else {
        toast.info('No new leads found to import');
      }

    } catch (error: any) {
      console.error('Error in sync all:', error);
      toast.error('Error during sync all operation: ' + error.message);
    } finally {
      setImporting(false);
    }
  };

  const toggleSpreadsheetAutoSync = (spreadsheet: SpreadsheetConfig) => {
    handleEditSpreadsheet({ ...spreadsheet, auto_sync: !spreadsheet.auto_sync });
  };

  const toggleSpreadsheetActive = (spreadsheet: SpreadsheetConfig) => {
    handleEditSpreadsheet({ ...spreadsheet, is_active: !spreadsheet.is_active });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const openSpreadsheet = (url: string) => {
    window.open(getReadableSheetsUrl(url), '_blank');
  };

  const formatLastSynced = (timestamp: string | null | undefined) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-8">Loading integrations...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Google Sheets Integration
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Auto-import leads from Google Sheets. Configure spreadsheets below.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleProcessAllSpreadsheets}
                disabled={importing || spreadsheets.filter(s => s.is_active).length === 0}
                className="flex items-center gap-2"
              >
                {importing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Sync All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spreadsheets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No spreadsheets configured. Add your first spreadsheet to start importing leads automatically.
              </div>
            ) : (
              <div className="space-y-4">
                {spreadsheets.map(spreadsheet => (
                  <div key={spreadsheet.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={spreadsheet.is_active}
                              onCheckedChange={() => toggleSpreadsheetActive(spreadsheet)}
                              className="data-[state=checked]:bg-green-600"
                            />
                            <h4 className="font-semibold">{spreadsheet.name}</h4>
                            {!spreadsheet.is_active && (
                              <Badge variant="outline" className="bg-gray-100">Inactive</Badge>
                            )}
                          </div>
                          {spreadsheet.auto_sync && spreadsheet.is_active && (
                            <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Auto-sync: Every {spreadsheet.sync_interval} min
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 group">
                          <Link className="h-3 w-3" />
                          <span className="truncate">{getReadableSheetsUrl(spreadsheet.url)}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => openSpreadsheet(spreadsheet.url)} title="Open spreadsheet">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(spreadsheet.url)} title="Copy URL">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Last synced: {formatLastSynced(spreadsheet.last_synced)}</span>
                          </div>
                        </div>

                        {editingSpreadsheetId === spreadsheet.id ? (
                          <div className="mt-4 space-y-3 p-3 border rounded-lg bg-gray-50">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor={`edit-name-${spreadsheet.id}`}>Name</Label>
                                <Input
                                  id={`edit-name-${spreadsheet.id}`}
                                  value={spreadsheet.name}
                                  onChange={(e) => {
                                    const updated = { ...spreadsheet, name: e.target.value };
                                    setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? updated : s));
                                  }}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`edit-sync-${spreadsheet.id}`}>Sync Interval</Label>
                                <Select
                                  value={spreadsheet.sync_interval.toString()}
                                  onValueChange={(value) => {
                                    const updated = { ...spreadsheet, sync_interval: parseInt(value) };
                                    setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? updated : s));
                                  }}
                                >
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {syncIntervalOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor={`edit-url-${spreadsheet.id}`}>Google Sheets URL</Label>
                                <Input
                                  id={`edit-url-${spreadsheet.id}`}
                                  value={spreadsheet.url}
                                  onChange={(e) => {
                                    const updated = { ...spreadsheet, url: e.target.value };
                                    setSpreadsheets(prev => prev.map(s => s.id === spreadsheet.id ? updated : s));
                                  }}
                                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Switch checked={spreadsheet.auto_sync} onCheckedChange={() => toggleSpreadsheetAutoSync(spreadsheet)} className="data-[state=checked]:bg-blue-600" />
                                <Label>Enable Auto-sync</Label>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => setEditingSpreadsheetId(null)} variant="outline">Cancel</Button>
                                <Button size="sm" onClick={() => handleEditSpreadsheet(spreadsheet)}>Save</Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => processSpreadsheet(spreadsheet)} disabled={importing || !spreadsheet.is_active} className="flex items-center gap-1">
                                <RefreshCw className="h-3 w-3" />
                                Sync Now
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setEditingSpreadsheetId(spreadsheet.id)} className="flex items-center gap-1">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSpreadsheet(spreadsheet.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isAddingSpreadsheet && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold mb-3">Add New Google Sheet</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="spreadsheet-name">Spreadsheet Name *</Label>
                    <Input id="spreadsheet-name" placeholder="e.g., Google Leads Sheet 2024" value={spreadsheetName} onChange={(e) => setSpreadsheetName(e.target.value)} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="spreadsheet-url">Google Sheets URL *</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => testSpreadsheetUrl(spreadsheetUrl)} disabled={!spreadsheetUrl.trim() || isTesting} className="text-xs h-6">
                        {isTesting ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> : 'Test URL'}
                      </Button>
                    </div>
                    <Input id="spreadsheet-url" placeholder="https://docs.google.com/spreadsheets/d/.../edit" value={spreadsheetUrl} onChange={(e) => setSpreadsheetUrl(e.target.value)} />
                    {testResult && (
                      <div className={`mt-1 text-sm ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                        {testResult.message}
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Important: Publishing Instructions
                    </h5>
                    <ol className="list-decimal list-inside text-sm text-amber-700 space-y-1">
                      <li>Open your Google Sheet</li>
                      <li>Click <strong>File → Share → Publish to web</strong></li>
                      <li>Select <strong>"Entire Document"</strong> and <strong>"CSV"</strong> format</li>
                      <li>Click <strong>"Publish"</strong></li>
                      <li>Use the regular Google Sheets URL above</li>
                    </ol>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p><strong>Required columns:</strong> Name, Email</p>
                    <p><strong>Optional columns:</strong> Phone, Country, Message, Source Page, Selected Plan</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { setIsAddingSpreadsheet(false); setSpreadsheetName(''); setSpreadsheetUrl(''); setTestResult(null); }}>Cancel</Button>
                    <Button onClick={handleAddSpreadsheet} disabled={!spreadsheetName.trim() || !spreadsheetUrl.trim()}>Add Spreadsheet</Button>
                  </div>
                </div>
              </div>
            )}

            {!isAddingSpreadsheet && (
              <Button onClick={() => setIsAddingSpreadsheet(true)} variant="outline" className="w-full flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Spreadsheet
              </Button>
            )}

            {importResults && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Import Results for: {importResults.spreadsheetName}
                </h4>
                
                {/* Status Message */}
                {importResults.status === 'all_duplicates' && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>All <strong>{importResults.duplicates || 0}</strong> leads in this spreadsheet already exist in the database. No new leads to import.</span>
                    </div>
                  </div>
                )}
                {importResults.status === 'no_data' && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>No data found in spreadsheet. Please check if the spreadsheet contains data.</span>
                    </div>
                  </div>
                )}
                {importResults.status === 'partial' && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="text-sm text-amber-800">
                      <span><strong>{importResults.success}</strong> leads imported, <strong>{importResults.duplicates || 0}</strong> duplicates skipped</span>
                    </div>
                  </div>
                )}
                {importResults.status === 'success' && importResults.success > 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800 flex items-center gap-2">
                      <span><strong>{importResults.success}</strong> new leads successfully imported!</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{importResults.success}</div>
                    <div className="text-sm text-green-600">Successful</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">{importResults.duplicates || 0}</div>
                    <div className="text-sm text-yellow-600">Duplicates</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{new Date(importResults.timestamp).toLocaleTimeString()}</div>
                    <div className="text-sm text-blue-600">Synced at</div>
                  </div>
                </div>
                {importResults.errors.length > 0 && (
                  <div className="mt-3">
                    <h5 className="font-medium mb-1 text-sm">Issues ({importResults.errors.length}):</h5>
                    <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                      {importResults.errors.map((error, index) => (
                        <div key={index} className="text-red-600 py-1 border-b border-red-100">{error}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {syncHistory.length > 0 && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Recent Sync History</h4>
                <div className="space-y-2">
                  {syncHistory.map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-3 w-3" />
                        <span className="font-medium">{result.spreadsheetName}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700">✓ {result.success}</Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700">✗ {result.failed}</Badge>
                        <span className="text-muted-foreground text-xs">{new Date(result.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Excel Import/Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import from Excel
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Upload Excel files (.xlsx, .xls) with leads data or export current leads to Excel format.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
