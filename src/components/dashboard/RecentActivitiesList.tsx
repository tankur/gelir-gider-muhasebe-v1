import React from 'react';
import { Link } from 'react-router-dom';
import { useActivities } from '../../hooks/useActivities';
import { Activity } from '../../types/activity';
import { getActivityIcon, getActivityColor } from '../../utils/activityUtils';
import { formatDateTime } from '../../utils/format';

interface RecentActivitiesListProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RecentActivitiesList({ limit, showViewAll = false }: RecentActivitiesListProps) {
  const { activities } = useActivities();
  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {displayedActivities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
      
      {showViewAll && activities.length > limit! && (
        <div className="pt-4">
          <Link
            to="/activities"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 
                     font-medium text-sm inline-flex items-center"
          >
            Tüm işlemleri görüntüle
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      )}

      {activities.length === 0 && (
        <div className="py-4 text-center text-gray-500 dark:text-gray-400">
          Henüz işlem bulunmuyor.
        </div>
      )}
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const { icon: Icon, label } = getActivityIcon(activity.type);
  const { bgColor, textColor } = getActivityColor(activity.type);

  return (
    <div className="py-4 first:pt-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${bgColor} ${textColor} flex-shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {activity.userName}
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
              {formatDateTime(activity.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {activity.action}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {activity.details}
          </p>
        </div>
      </div>
    </div>
  );
}