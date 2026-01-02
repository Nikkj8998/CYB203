import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  MessageSquare,
  Images,
  Briefcase,
  Users,
  UserCog,
  ClipboardList
} from 'lucide-react';
import { toast } from 'sonner';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-hide sidebar on mobile/tablet, show on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { logout, hasPermission, isSuperAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', permission: 'dashboard' },
    { icon: FileText, label: 'All Content', path: '/admin/content', permission: 'content' },
    { icon: MessageSquare, label: 'Comments', path: '/admin/comments', permission: 'comments' },
    { icon: ClipboardList, label: 'Leads', path: '/admin/leads', permission: 'leads' },
    { icon: Briefcase, label: 'Jobs', path: '/admin/jobs', permission: 'jobs' },
    { icon: Users, label: 'Job Applications', path: '/admin/job-applications', permission: 'job-applications' },
    { icon: Images, label: 'Gallery', path: '/admin/gallery', permission: 'gallery' },
    { icon: Image, label: 'Media Library', path: '/admin/media', permission: 'media' },
    { icon: UserCog, label: 'Users', path: '/admin/users', permission: 'users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings', permission: 'settings' },
  ];

  // Filter nav items based on user permissions
  const visibleNavItems = navItems.filter(item =>
    isSuperAdmin() || hasPermission(item.permission)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
        sidebarOpen 
          ? 'w-64 translate-x-0' 
          : 'w-20 lg:translate-x-0 -translate-x-full'
        }`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2 shrink-0">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                <h1 className="font-bold text-lg whitespace-nowrap">Cybaem CMS</h1>
                <p className="text-xs text-gray-500 whitespace-nowrap">Content Management</p>
              </div>
            </div>
          </div>

          {/* Create New Button */}
          {(isSuperAdmin() || hasPermission('content')) && (
            <div className="p-4">
              <Button className={`w-full ${!sidebarOpen ? 'px-0 justify-center' : ''}`} asChild>
                <Link to="/admin/content/new">
                  <PlusCircle className={`${sidebarOpen ? 'mr-2' : ''} h-4 w-4`} />
                  <span className={sidebarOpen ? '' : 'hidden'}>Create New</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Navigation */}
          <nav
            className="flex-1 p-4 space-y-2 overflow-y-auto admin-sidebar-scroll scrollbar-hidden hover:scrollbar-visible"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(209, 213, 219) transparent'
            }}
          >
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={!sidebarOpen ? item.label : ''}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    !sidebarOpen ? 'justify-center px-0' : ''
                  } ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'hidden'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className={`w-full text-red-600 hover:text-red-700 hover:bg-red-50 ${
                !sidebarOpen ? 'justify-center px-0' : 'justify-start'
              }`}
              onClick={handleLogout}
              title={!sidebarOpen ? 'Logout' : ''}
            >
              <LogOut className={`${sidebarOpen ? 'mr-2' : ''} h-4 w-4`} />
              <span className={sidebarOpen ? '' : 'hidden'}>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20 ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">
                {visibleNavItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              Welcome back, <span className="font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
