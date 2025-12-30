import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LeadsDashboard } from './LeadsDashboard';
import { LeadsList } from './LeadsList';
import { LeadsSettings } from './LeadsSettings';
import { LeadsIntegrations } from './LeadsIntegrations';

export const CRMLeads = () => {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0">
          <LeadsDashboard />
        </TabsContent>
        
        <TabsContent value="leads" className="mt-0">
          <LeadsList />
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-0">
          <LeadsIntegrations />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <LeadsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
