import React from 'react';
import { Activity } from '../../types/activity';
import { useCustomers } from '../../hooks/useCustomers';

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  const { getCustomerInfo } = useCustomers();

  if (activity.metadata?.customerId) {
    const customerInfo = getCustomerInfo(activity.metadata.customerId);
    if (customerInfo.companyName) {
      return (
        <div className="mt-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {customerInfo.companyName}
          </div>
          <div className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {activity.details}
          </div>
        </div>
      );
    }
  }

  return (
    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
      {activity.details}
    </p>
  );
}