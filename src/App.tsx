import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Awards from "./pages/Awards";
import Careers from "./pages/Careers";
import LifeAtCybaemTech from "./pages/LifeAtCybaemTech";
import Industries from "./pages/Industries";
import ManagedServices from "./pages/ManagedServices";
import NotFound from "./pages/NotFound";
import CloudSolutions from "./pages/CloudSolutions";
import CybersecurityServices from "./pages/CybersecurityServices";
import EnterpriseSolutions from "./pages/EnterpriseSolutions";
import DigitalMarketing from "./pages/DigitalMarketing";
import AIDataAnalytics from "./pages/AIDataAnalytics";
import ComputerAMCServices from "./pages/ComputerAMCServices";
import Contact from "./pages/Contact";
import ITAugmentation from "./pages/ITAugmentation";
import ITSMConsulting from "./pages/ITSMConsulting";
import OnsiteITEngineer from "./pages/OnsiteITEngineer";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import ScrollToTop from "@/components/ScrollToTop";
import BlogPost from "./components/BlogPost";
import ThankYou from "./components/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Resources from "./pages/Resources";

import { AdminAuthProvider } from "./admin/contexts/AdminAuthContext";
import { AdminLogin } from "./admin/pages/AdminLogin";
import { DashboardLayout } from "./admin/layouts/DashboardLayout";
import { Dashboard } from "./admin/pages/Dashboard";
import { ContentList } from "./admin/pages/ContentList";
import { ContentDetail } from "./admin/pages/ContentDetail";
import { ContentEditor } from "./admin/pages/ContentEditor";
import { MediaLibrary } from "./admin/pages/MediaLibrary";
import { Settings } from "./admin/pages/Settings";
import { Comments } from "./admin/pages/Comments";
import { Gallery } from "./admin/pages/Gallery";
import { JobsList } from "./admin/pages/JobsList";
import { JobEditor } from "./admin/pages/JobEditor";
import { JobApplications } from "./admin/pages/JobApplications";
import { CRMLeads } from "./admin/pages/CRMLeads";
import { UsersManagement } from "./admin/pages/UsersManagement";
import { ProtectedRoute } from "./admin/components/ProtectedRoute";
import { PermissionRoute } from "./admin/components/PermissionRoute";

import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/awards" element={<Leadership />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/life-at-cybaemtech" element={<LifeAtCybaemTech />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/managed-services" element={<ManagedServices />} />
              <Route path="/cloud-solutions" element={<CloudSolutions />} />
              <Route path="/cybersecurity-services" element={<CybersecurityServices />} />
              <Route path="/enterprise-solutions" element={<EnterpriseSolutions />} />
              <Route path="/software-development" element={<SoftwareDevelopment />} />
              <Route path="/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/ai-data-analytics" element={<AIDataAnalytics />} />
              <Route path="/computer-amc-services" element={<ComputerAMCServices />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/it-augmentation" element={<ITAugmentation />} />
              <Route path="/itsm-consulting" element={<ITSMConsulting />} />
              <Route path="/onsite-it-engineer" element={<OnsiteITEngineer />} />
              <Route path="/blog/:type/:slug" element={<BlogPost />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/:type/:slug" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/thankyou" element={<ThankYou onBack={function (): void {
                throw new Error("Function not implemented.");
              }} />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<PermissionRoute requiredPermission="dashboard"><Dashboard /></PermissionRoute>} />
                <Route path="content" element={<PermissionRoute requiredPermission="content"><ContentList /></PermissionRoute>} />
                <Route path="content/view/:id" element={<PermissionRoute requiredPermission="content"><ContentDetail /></PermissionRoute>} />
                <Route path="content/new" element={<PermissionRoute requiredPermission="content"><ContentEditor /></PermissionRoute>} />
                <Route path="content/edit/:id" element={<PermissionRoute requiredPermission="content"><ContentEditor /></PermissionRoute>} />
                <Route path="jobs" element={<PermissionRoute requiredPermission="jobs"><JobsList /></PermissionRoute>} />
                <Route path="jobs/new" element={<PermissionRoute requiredPermission="jobs"><JobEditor /></PermissionRoute>} />
                <Route path="jobs/edit/:id" element={<PermissionRoute requiredPermission="jobs"><JobEditor /></PermissionRoute>} />
                <Route path="job-applications" element={<PermissionRoute requiredPermission="job-applications"><JobApplications /></PermissionRoute>} />
                <Route path="leads" element={<PermissionRoute requiredPermission="leads"><CRMLeads /></PermissionRoute>} />
                <Route path="media" element={<PermissionRoute requiredPermission="media"><MediaLibrary /></PermissionRoute>} />
                <Route path="comments" element={<PermissionRoute requiredPermission="comments"><Comments /></PermissionRoute>} />
                <Route path="gallery" element={<PermissionRoute requiredPermission="gallery"><Gallery /></PermissionRoute>} />
                <Route path="users" element={<PermissionRoute requiredPermission="users"><UsersManagement /></PermissionRoute>} />
                <Route path="settings" element={<PermissionRoute requiredPermission="settings"><Settings /></PermissionRoute>} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
