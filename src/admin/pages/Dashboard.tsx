import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserPlus,
  MessageSquare,
  TrendingUp,
  Trophy,
  XCircle,
  Skull,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  LayoutDashboard
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL } from '@/config/api';

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  inPipeline: number;
  won: number;
  lost: number;
  junk: number;
}

interface SourceStats {
  name: string;
  value: number;
  color: string;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    inPipeline: 0,
    won: 0,
    lost: 0,
    junk: 0
  });
  const [statusData, setStatusData] = useState<{ name: string; count: number; color: string }[]>([]);
  const [sourceData, setSourceData] = useState<SourceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLeadsStats();
  }, []);

  const fetchLeadsStats = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      const response = await fetch(`${API_BASE_URL}/leads.php`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const leads = data.data;
        
        const newStats: LeadStats = {
          total: leads.length,
          new: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('new');
          }).length,
          contacted: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('contacted');
          }).length,
          inPipeline: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('pipeline');
          }).length,
          won: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('won');
          }).length,
          lost: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('lost');
          }).length,
          junk: leads.filter((l: any) => {
            const s = (l.lead_status || l.status || '').toLowerCase();
            return s.includes('junk') || s.includes('dead');
          }).length
        };
        setStats(newStats);

        const statusCounts = [
          { name: 'Won', count: newStats.won, color: '#10b981' },
          { name: 'New', count: newStats.new, color: '#3b82f6' },
          { name: 'Contacted', count: newStats.contacted, color: '#6366f1' },
          { name: 'Pipeline', count: newStats.inPipeline, color: '#f59e0b' },
          { name: 'Lost', count: newStats.lost, color: '#ef4444' },
          { name: 'Junk', count: newStats.junk, color: '#64748b' }
        ];
        setStatusData(statusCounts);

        const sourceCounts: { [key: string]: number } = {};
        leads.forEach((l: any) => {
          const source = l.lead_source || l.source || 'Other';
          sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        });

        const sourceColors: { [key: string]: string } = {
          'META ADS': '#3b82f6',
          'GOOGLE ADS': '#f59e0b',
          'Website': '#10b981',
          'REFERRAL': '#8b5cf6',
          'Other': '#64748b',
          'SPREADSHEET': '#06b6d4'
        };

        const sourceStats: SourceStats[] = Object.entries(sourceCounts).map(([name, value]) => ({
          name,
          value,
          color: sourceColors[name] || '#64748b'
        }));
        setSourceData(sourceStats);
      }
    } catch (error) {
      console.error('Error fetching leads stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Executive Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Real-time overview of your sales performance and pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => fetchLeadsStats(true)} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Leads</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
            </div>
            <div className="h-1.5 bg-blue-500/10 w-full">
              <div className="h-full bg-blue-500 w-[70%]" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <UserPlus className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +5%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">New Leads</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.new}</h3>
              </div>
            </div>
            <div className="h-1.5 bg-indigo-500/10 w-full">
              <div className="h-full bg-indigo-500 w-[40%]" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +8%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Pipeline</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.inPipeline}</h3>
              </div>
            </div>
            <div className="h-1.5 bg-amber-500/10 w-full">
              <div className="h-full bg-amber-500 w-[60%]" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Trophy className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +15%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Closed Won</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.won}</h3>
              </div>
            </div>
            <div className="h-1.5 bg-emerald-500/10 w-full">
              <div className="h-full bg-emerald-500 w-[30%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white/50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Pipeline Performance</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Lead distribution by current status</p>
              </div>
              <Badge variant="outline" className="font-normal text-xs">Last 30 Days</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white/50 pb-4">
            <CardTitle className="text-xl font-bold">Acquisition Channels</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Lead sources distribution</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[280px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={6}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-gray-900">{stats.total}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-6">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-xs text-gray-600 truncate font-medium">{source.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{source.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-4">
              <h4 className="text-4xl font-bold text-gray-900">
                {stats.total > 0 ? ((stats.won / stats.total) * 100).toFixed(1) : 0}%
              </h4>
              <Badge className="bg-emerald-50 text-emerald-700 border-none mb-1">+2.4%</Badge>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: `${stats.total > 0 ? (stats.won / stats.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">Percentage of leads successfully converted to customers.</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Dead / Junk Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-4">
              <h4 className="text-4xl font-bold text-gray-900">
                {stats.total > 0 ? ((stats.junk / stats.total) * 100).toFixed(1) : 0}%
              </h4>
              <Badge className="bg-red-50 text-red-700 border-none mb-1">+1.2%</Badge>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-400 rounded-full" 
                style={{ width: `${stats.total > 0 ? (stats.junk / stats.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">Percentage of leads that turned out to be low quality or irrelevant.</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-white">Next Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs italic">1</div>
                <div>
                  <p className="text-sm font-bold">Q4 Target: 100 Leads</p>
                  <p className="text-xs text-white/70">{100 - stats.total} more leads to go</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs italic">2</div>
                <div>
                  <p className="text-sm font-bold">Win Rate Goal: 25%</p>
                  <p className="text-xs text-white/70">Current win rate: {stats.total > 0 ? ((stats.won / stats.total) * 100).toFixed(1) : 0}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
