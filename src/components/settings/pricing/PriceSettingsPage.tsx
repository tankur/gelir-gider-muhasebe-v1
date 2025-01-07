import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../Tabs';
import StoneSettings from './sections/stone/StoneSettings';
import { BandSettings } from './sections/BandSettings';
import { PressSettings } from './sections/PressSettings';
import { AssemblySettings } from './sections/assembly/AssemblySettings';
import { BeadSettings } from './sections/bead/BeadSettings';
import { BsnSettings } from './sections/bsn/BsnSettings';

export default function PriceSettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Fiyat Ayarları
      </h1>

      <Tabs selectedIndex={activeTab} onChange={setActiveTab}>
        <TabList className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tab
            selected={activeTab === 0}
            onClick={() => setActiveTab(0)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Taş Fiyatları
          </Tab>
          <Tab
            selected={activeTab === 1}
            onClick={() => setActiveTab(1)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Bant Fiyatları
          </Tab>
          <Tab
            selected={activeTab === 2}
            onClick={() => setActiveTab(2)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Pres Fiyatları
          </Tab>
          <Tab
            selected={activeTab === 3}
            onClick={() => setActiveTab(3)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Dizim Fiyatları
          </Tab>
          <Tab
            selected={activeTab === 4}
            onClick={() => setActiveTab(4)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            İnci Beyoğlu Fiyatları
          </Tab>
          <Tab
            selected={activeTab === 5}
            onClick={() => setActiveTab(5)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            BSN Fiyatları
          </Tab>
        </TabList>

        <TabPanel selected={activeTab === 0}>
          <StoneSettings />
        </TabPanel>

        <TabPanel selected={activeTab === 1}>
          <BandSettings />
        </TabPanel>

        <TabPanel selected={activeTab === 2}>
          <PressSettings />
        </TabPanel>

        <TabPanel selected={activeTab === 3}>
          <AssemblySettings type="assembly" />
        </TabPanel>

        <TabPanel selected={activeTab === 4}>
          <BeadSettings />
        </TabPanel>

        <TabPanel selected={activeTab === 5}>
          <BsnSettings />
        </TabPanel>
      </Tabs>
    </div>
  );
}