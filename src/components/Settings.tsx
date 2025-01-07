import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './settings/Tabs';
import SiteSettings from './settings/SiteSettings';
import ProfileSettings from './settings/ProfileSettings';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Ayarlar</h1>

      <Tabs selectedIndex={activeTab} onChange={setActiveTab}>
        <TabList className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tab
            selected={activeTab === 0}
            onClick={() => setActiveTab(0)}
            className="mr-4 pb-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Profil Düzenle
          </Tab>
          {currentUser?.role === 'admin' && (
            <Tab
              selected={activeTab === 1}
              onClick={() => setActiveTab(1)}
              className="mr-4 pb-4 text-sm font-medium border-b-2 cursor-pointer"
            >
              Site Ayarları
            </Tab>
          )}
        </TabList>

        <TabPanel selected={activeTab === 0}>
          <ProfileSettings />
        </TabPanel>

        {currentUser?.role === 'admin' && (
          <TabPanel selected={activeTab === 1}>
            <SiteSettings />
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
}