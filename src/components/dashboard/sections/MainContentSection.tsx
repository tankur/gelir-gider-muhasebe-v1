import React from 'react';
import { RecentActivities } from '../components/RecentActivities';
import { RecentOrders } from '../components/RecentOrders';

export function MainContentSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Son İşlemler */}
      <div className="bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800">
        <RecentActivities />
      </div>

      {/* Son Siparişler */}
      <div className="bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800">
        <RecentOrders />
      </div>
    </div>
  );
}