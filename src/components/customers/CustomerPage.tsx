import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CustomerDetails } from './CustomerDetails';
import { CustomerSummary } from './CustomerSummary';
import { CustomerStatement } from './CustomerStatement';
import { Tabs, TabList, Tab, TabPanel } from '../settings/Tabs';

interface CustomerPageProps {
  customerId: number;
}

export default function CustomerPage({ customerId }: CustomerPageProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [customers] = useLocalStorage<any[]>('customers', []);
  const customer = customers.find(c => c.id === customerId);

  if (!customer) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {customer.name}
        </h1>
      </div>

      <CustomerSummary customerId={customerId} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CustomerDetails customer={customer} />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow">
            <Tabs selectedIndex={activeTab} onChange={setActiveTab}>
              <TabList className="flex border-b border-gray-200 dark:border-gray-700 px-4">
                <Tab
                  selected={activeTab === 0}
                  onClick={() => setActiveTab(0)}
                  className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
                >
                  Ekstre
                </Tab>
                <Tab
                  selected={activeTab === 1}
                  onClick={() => setActiveTab(1)}
                  className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
                >
                  Siparişler
                </Tab>
                <Tab
                  selected={activeTab === 2}
                  onClick={() => setActiveTab(2)}
                  className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
                >
                  Ödemeler
                </Tab>
              </TabList>

              <div className="p-4">
                <TabPanel selected={activeTab === 0}>
                  <CustomerStatement customerId={customerId} />
                </TabPanel>
                <TabPanel selected={activeTab === 1}>
                  {/* TODO: Add OrderList component */}
                  <p className="text-gray-500 dark:text-gray-400">Siparişler yakında eklenecek</p>
                </TabPanel>
                <TabPanel selected={activeTab === 2}>
                  {/* TODO: Add PaymentList component */}
                  <p className="text-gray-500 dark:text-gray-400">Ödemeler yakında eklenecek</p>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}