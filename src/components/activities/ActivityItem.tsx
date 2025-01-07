import React from 'react';
import { Activity } from '../../types/activity';
import { getActivityIcon, getActivityColor } from '../../utils/activityUtils';
import { formatDateTime } from '../../utils/format';
import { getOrderStatusText } from '../../constants/orderStatuses';
import { useCustomers } from '../../hooks/useCustomers';
import { useTheme } from '../../contexts/ThemeContext';

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const { isDark } = useTheme();
  const iconConfig = getActivityIcon(activity.type);
  const Icon = isDark ? iconConfig.darkIcon : iconConfig.lightIcon;
  const { bgColor, textColor } = getActivityColor(activity.type);
  const { getCustomerInfo } = useCustomers();

  const isOrderStatusChange = activity.type === 'order' && activity.metadata?.newStatus;
  const modelKodu = activity.metadata?.modelKodu;
  const customerId = activity.metadata?.customerId;

  const customerInfo = customerId ? getCustomerInfo(customerId) : null;
  const companyName = customerInfo?.companyName || '';

  const getStatusChangeDetails = () => {
    if (!isOrderStatusChange) return activity.details;
    
    return `${companyName || 'Müşteri'} firmasına ait ${modelKodu || ''} numaralı siparişin durumu "${getOrderStatusText(activity.metadata.newStatus)}" olarak güncellendi`;
  };

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div className={`p-2 rounded-lg ${bgColor} ${textColor} flex-shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {companyName || activity.userName}
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
            {formatDateTime(activity.timestamp)}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
          {activity.action}
          {modelKodu && <span className="ml-1 text-gray-500">#{modelKodu}</span>}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {getStatusChangeDetails()}
        </p>
      </div>
    </div>
  );
}