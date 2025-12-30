import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserPlus,
  MessageSquare,
  TrendingUp,
  Trophy,
  XCircle,
  Skull
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
  Tooltip
} from 'recharts';
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

  useEffect(() => {
    fetchLeadsStats();
  }, []);

  const fetchLeadsStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads.php`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const leads = data.data;
        
        const newStats: LeadStats = {
          total: leads.length,
          new: leads.filter((l: any) => l.status === 'New').length,
          contacted: leads.filter((l: any) => l.status === 'Qualified - Proposal Sent').length,
          inPipeline: leads.filter((l: any) => l.status === 'Negotiation/ In Discussion').length,
          won: leads.filter((l: any) => l.status === 'Win').length,
          lost: leads.filter((l: any) => l.status === 'Lost').length,
          junk: leads.filter((l: any) => l.status === 'Junk/Dead').length
        };
        setStats(newStats);

        const statusCounts = [
          { name: 'Closed - Won', count: newStats.won, color: '#22c55e' },
          { name: 'New', count: newStats.new, color: '#3b82f6' },
          { name: 'Qualified', count: newStats.contacted, color: '#a855f7' },
          { name: 'In Discussion', count: newStats.inPipeline, color: '#f59e0b' },
          { name: 'Closed - Lost', count: newStats.lost, color: '#ef4444' },
          { name: 'Junk/Dead', count: newStats.junk, color: '#6b7280' }
        ];
        setStatusData(statusCounts);

        const sourceCounts: { [key: string]: number } = {};
        leads.forEach((l: any) => {
          const source = l.source || 'Other';
          sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        });

        const sourceColors: { [key: string]: string } = {
          'Meta Ads': '#3b82f6',
          'Google Ads': '#f59e0b',
          'Website Form': '#22c55e',
          'Referral': '#a855f7',
          'Other': '#6b7280'
        };

        const sourceStats: SourceStats[] = Object.entries(sourceCounts).map(([name, value]) => ({
          name,
          value,
          color: sourceColors[name] || '#6b7280'
        }));
        setSourceData(sourceStats);
      }
    } catch (error) {
      console.error('Error fetching leads stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Leads', 
      value: stats.total, 
      icon: Users, 
      bgColor: 'bg-blue-50', 
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    { 
      title: 'New (30d)', 
      value: stats.new, 
      icon: UserPlus, 
      bgColor: 'bg-purple-50', 
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100'
    },
    { 
      title: 'Contacted', 
      value: stats.contacted, 
      icon: MessageSquare, 
      bgColor: 'bg-cyan-50', 
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-100'
    },
    { 
      title: 'In Pipeline', 
      value: stats.inPipeline, 
      icon: TrendingUp, 
      bgColor: 'bg-amber-50', 
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100'
    },
    { 
      title: 'Closed Won', 
      value: stats.won, 
      icon: Trophy, 
      bgColor: 'bg-green-50', 
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    { 
      title: 'Closed Lost', 
      value: stats.lost, 
      icon: XCircle, 
      bgColor: 'bg-red-50', 
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    { 
      title: 'Dead / Junk', 
      value: stats.junk, 
      icon: Skull, 
      bgColor: 'bg-gray-50', 
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your sales pipeline</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`${card.bgColor} border-0`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">{card.title}</span>
                  <div className={`p-1.5 rounded ${card.iconBg}`}>
                    <Icon className={`h-4 w-4 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-gray-600">{source.name} ({source.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
