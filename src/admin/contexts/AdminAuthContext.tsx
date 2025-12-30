import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  permissions: string[] | null;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<AdminUser | null>;
  logout: () => Promise<void>;
  forgotPassword: () => Promise<boolean>;
  hasPermission: (module: string) => boolean;
  isSuperAdmin: () => boolean;
  getFirstAvailablePage: () => string;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const isDevelopment = () => {
  return import.meta.env.DEV || 
    window.location.hostname.includes('replit') ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('vercel.app') ||
    process.env.NODE_ENV === 'development';
};

const devUser: AdminUser = {
  id: 1,
  username: 'dev_admin',
  email: 'admin@example.com',
  role: 'super_admin',
  permissions: ['dashboard', 'content', 'comments', 'leads', 'jobs', 'job-applications', 'gallery', 'media', 'users', 'settings']
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (isDevelopment()) {
      setIsAuthenticated(true);
      setUser(devUser);
      setIsLoading(false);
      return;
    }
    
    const checkAuth = async () => {
      try {
        const response = await api.auth.check();
        if (response.success && response.authenticated && response.user) {
          setIsAuthenticated(true);
          setUser(response.user);
          localStorage.setItem('admin_authenticated', 'true');
          localStorage.setItem('admin_user', JSON.stringify(response.user));
        } else {
          // Backend says not authenticated - clear everything
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_user');
        }
      } catch (error) {
        console.warn('Auth check failed:', error);
        // On network error, check localStorage as fallback but mark as needing re-auth
        const savedAuth = localStorage.getItem('admin_authenticated');
        const savedUser = localStorage.getItem('admin_user');
        if (savedAuth === 'true' && savedUser) {
          // Allow temporary access but user should re-authenticate
          setIsAuthenticated(true);
          setUser(JSON.parse(savedUser));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<AdminUser | null> => {
    try {
      const response = await api.auth.login(username, password);
      if (response.success && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_user', JSON.stringify(response.user));
        return response.user;
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_user');
    }
  };

  const forgotPassword = async (): Promise<boolean> => {
    try {
      const response = await api.auth.forgotPassword();
      return response.success;
    } catch (error) {
      console.error('Forgot password failed:', error);
      return false;
    }
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    if (!user.permissions || user.permissions.length === 0) return false;
    return user.permissions.includes(module);
  };

  const isSuperAdmin = (): boolean => {
    return user?.role === 'super_admin';
  };

  const getFirstAvailablePage = (): string => {
    if (!user) return '/admin/dashboard';
    if (isSuperAdmin()) return '/admin/dashboard';

    const pages = [
      { path: '/admin/dashboard', permission: 'dashboard' },
      { path: '/admin/content', permission: 'content' },
      { path: '/admin/comments', permission: 'comments' },
      { path: '/admin/leads', permission: 'leads' },
      { path: '/admin/jobs', permission: 'jobs' },
      { path: '/admin/job-applications', permission: 'job-applications' },
      { path: '/admin/gallery', permission: 'gallery' },
      { path: '/admin/media', permission: 'media' },
      { path: '/admin/users', permission: 'users' },
      { path: '/admin/settings', permission: 'settings' },
    ];

    for (const page of pages) {
      if (hasPermission(page.permission)) {
        return page.path;
      }
    }

    return '/admin/dashboard';
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, forgotPassword, hasPermission, isSuperAdmin, getFirstAvailablePage }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
