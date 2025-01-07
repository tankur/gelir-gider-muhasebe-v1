import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useActivities } from '../../../hooks/useActivities';
import { ActivityItem } from './activities/ActivityItem';

interface RecentActivitiesListProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RecentActivitiesList({ limit = 5, showViewAll = false }: RecentActivitiesListProps) {
  const { activities } = useActivities();
  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Son İşlemler
        </h3>
        {showViewAll && activities.length > limit && (
          <Link 
            to="/activities"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {displayedActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
          {activities.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Henüz işlem bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}