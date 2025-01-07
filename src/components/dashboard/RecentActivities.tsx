import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useActivities } from '../../hooks/useActivities';
import { getActivityIcon, getActivityColor } from '../../utils/activityUtils';
import { formatDateTime } from '../../utils/format';

export function RecentActivities() {
  const { activities } = useActivities();
  const recentActivities = activities.slice(0, 5);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Son İşlemler
        </h2>
        <Link 
          to="/activities"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {recentActivities.map(activity => {
            const { icon: Icon } = getActivityIcon(activity.type);
            const { bgColor, textColor } = getActivityColor(activity.type);

            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${bgColor} ${textColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.userName}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {activity.details}
                  </p>
                </div>
              </div>
            );
          })}
          {activities.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Henüz işlem bulunmuyor
            </div>
          )}
        </div>
      </div>
    </div>
  );
}