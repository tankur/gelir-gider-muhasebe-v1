import React from 'react';
import { Activity } from '../../../../types/activity';
import { getActivityIcon, getActivityColor } from '../../../../utils/activityUtils';
import { formatDateTime } from '../../../../utils/format';
import { getOrderStatusText } from '../../../../constants/orderStatuses';

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const { icon: Icon } = getActivityIcon(activity.type);
  const { bgColor, textColor } = getActivityColor(activity.type);

  const isOrderStatusChange = activity.type === 'order' && activity.metadata?.newStatus;
  const modelKodu = activity.metadata?.modelKodu;

  // Format status change details
  const getStatusChangeDetails = () => {
    if (!isOrderStatusChange) return activity.details;
    
    const { customerName } = activity.metadata;
    return `${customerName || ''} müşterisine ait ${modelKodu || ''} numaralı siparişin durumu "${getOrderStatusText(activity.metadata.newStatus)}" olarak güncellendi`;
  };

  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className={`p-2 rounded-lg ${bgColor} ${textColor} flex-shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {activity.userName}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
            {formatDateTime(activity.timestamp)}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
          {activity.action}
          {modelKodu && <span className="ml-1 text-gray-500">#{modelKodu}</span>}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {getStatusChangeDetails()}
        </p>
      </div>
    </div>
  );
}