// API configuration for both development and production
// In development (Replit), Vite proxy forwards /api to the backend
// In production (cPanel), we need to use the actual backend path

const getApiBaseUrl = () => {
  // If VITE_API_BASE_URL is set, use it (for production builds)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // In development, use /api which gets proxied by Vite
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production build, use /backend/api for cPanel deployment
  return '/backend/api';
};

export const API_BASE_URL = getApiBaseUrl();
