import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  UserPlus,
  Phone,
  TrendingUp,
  CheckCircle,
  XCircle,
  Trash2,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const API_BASE = '/backend/api/crm-leads.php';

interface DashboardStats {
  total_leads: number;
  new_leads_30_days: number;
  contacted_leads: number;
  pipeline_leads: number;
  closed_won: number;
  closed_lost: number;
  dead_junk: number;
  leads_by_status: { lead_status: string; count: number }[];
  leads_by_source: { lead_source: string; count: number }[];
  leads_per_day: { date: string; count: number }[];
  deal_value_by_owner: { lead_owner: string; total_value: number }[];
  overdue_followups: {
    id: number;
    lead_id: string;
    full_name: string;
    company_name: string;
    next_followup_at: string;
    lead_status: string;
  }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

export const LeadsDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch(`${API_BASE}?action=dashboard`);
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-8 text-gray-500">Failed to load dashboard data</div>;
  }

  const kpiCards = [
    { title: 'Total Leads', value: stats.total_leads, icon: Users, gradientFrom: 'from-blue-600', gradientTo: 'to-blue-400', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'New Leads (30d)', value: stats.new_leads_30_days, icon: UserPlus, gradientFrom: 'from-green-600', gradientTo: 'to-green-400', lightBg: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Contacted', value: stats.contacted_leads, icon: Phone, gradientFrom: 'from-amber-600', gradientTo: 'to-amber-400', lightBg: 'bg-amber-50', textColor: 'text-amber-600' },
    { title: 'In Pipeline', value: stats.pipeline_leads, icon: TrendingUp, gradientFrom: 'from-purple-600', gradientTo: 'to-purple-400', lightBg: 'bg-purple-50', textColor: 'text-purple-600' },
    { title: 'Closed - Won', value: stats.closed_won, icon: CheckCircle, gradientFrom: 'from-emerald-600', gradientTo: 'to-emerald-400', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { title: 'Closed - Lost', value: stats.closed_lost, icon: XCircle, gradientFrom: 'from-red-600', gradientTo: 'to-red-400', lightBg: 'bg-red-50', textColor: 'text-red-600' },
    { title: 'Dead / Junk', value: stats.dead_junk, icon: Trash2, gradientFrom: 'from-gray-600', gradientTo: 'to-gray-400', lightBg: 'bg-gray-50', textColor: 'text-gray-600' },
  ];

  return (
    <div className="space-y-8 pb-6">
      {/* KPI Cards Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Lead Analytics Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {kpiCards.map((card, index) => (
            <Card key={index} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${card.lightBg}`}>
              <CardContent className="p-5">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} opacity-20 rounded-bl-3xl`}></div>
                <div className="relative z-10">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} text-white mb-3 shadow-lg`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <div className={`text-3xl font-bold ${card.textColor} mb-1`}>{card.value}</div>
                  <div className="text-xs font-semibold text-gray-600">{card.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Status */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Leads by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50">
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.leads_by_status} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 10 }} />
                  <YAxis 
                    dataKey="lead_status" 
                    type="category" 
                    width={180} 
                    tick={{ fontSize: 10, fill: '#374151' }}
                    interval={0}
                    textAnchor="end"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                    cursor={{ fill: '#3b82f6', opacity: 0.1 }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leads by Source */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Leads by Source
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50 flex items-center justify-center">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.leads_by_source}
                    dataKey="count"
                    nameKey="lead_source"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={({ lead_source, count }) => `${lead_source}: ${count}`}
                    labelLine={{ stroke: '#d1d5db' }}
                  >
                    {stats.leads_by_source.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Created Trend */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5" />
              Leads Created (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-br from-white to-blue-50">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.leads_per_day} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    stroke="#bfdbfe"
                  />
                  <YAxis stroke="#bfdbfe" tick={{ fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #3b82f6', borderRadius: '8px' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deal Value by Owner */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-700 to-green-600 text-white pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Expected Deal Value by Owner
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-br from-white to-emerald-50">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.deal_value_by_owner} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis 
                    dataKey="lead_owner" 
                    tick={{ fontSize: 11, fill: '#374151' }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    stroke="#d1fae5"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    stroke="#d1fae5"
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Deal Value']}
                    contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #10b981', borderRadius: '8px' }}
                    cursor={{ fill: '#10b981', opacity: 0.1 }}
                  />
                  <Bar dataKey="total_value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Follow-ups */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-700 to-orange-600 text-white pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            ⚠️ Overdue Follow-ups
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-br from-white to-amber-50">
          {stats.overdue_followups.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3 opacity-80" />
              <p className="text-gray-600 font-semibold">No overdue follow-ups! 🎉</p>
              <p className="text-sm text-gray-500">All your follow-ups are on schedule</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-amber-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-amber-300">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Lead ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Overdue Since</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.overdue_followups.map((lead, idx) => (
                    <tr key={lead.id} className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-white hover:bg-amber-50' : 'bg-amber-50 hover:bg-amber-100'}`}>
                      <td className="py-3 px-4 font-mono text-xs font-bold text-blue-600 bg-blue-50 rounded">{lead.lead_id}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{lead.full_name}</td>
                      <td className="py-3 px-4 text-gray-700">{lead.company_name || '-'}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-amber-200 text-amber-900 font-semibold text-xs">{lead.lead_status}</Badge>
                      </td>
                      <td className="py-3 px-4 font-semibold text-red-600">
                        {new Date(lead.next_followup_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
