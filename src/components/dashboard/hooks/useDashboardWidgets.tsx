import React from 'react';
import { RecentActivitiesList } from '../widgets/RecentActivitiesList';
import { TransactionChart } from '../widgets/TransactionChart';
import { RecentOrdersWidget } from '../widgets/RecentOrdersWidget';

export function useDashboardWidgets() {
  const widgets = {
    'transaction-chart': <TransactionChart />,
    'recent-activities': <RecentActivitiesList limit={5} showViewAll />,
    'recent-orders': <RecentOrdersWidget />
  };

  return { widgets };
}