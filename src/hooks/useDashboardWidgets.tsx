import React from 'react';
import { FinancialStats } from '../components/stats/FinancialStats';
import { BusinessStats } from '../components/stats/BusinessStats';
import { RecentActivitiesList } from '../components/RecentActivitiesList';
import { TransactionChart } from '../components/TransactionChart';

export function useDashboardWidgets() {
  const widgets = {
    'financial-stats': <FinancialStats />,
    'business-stats': <BusinessStats />,
    'recent-activities': <RecentActivitiesList limit={8} showViewAll />,
    'transaction-chart': <TransactionChart />
  };

  return { widgets };
}