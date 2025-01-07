import React, { useState } from 'react';
import { useActivities } from '../hooks/useActivities';
import { ActivityItem } from './activities/ActivityItem';
import { ActivityFilters } from './activities/ActivityFilters';

export default function RecentActivities() {
  const { activities } = useActivities();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredActivities = activities.filter(activity => {
    const searchMatch = search.toLowerCase() === '' ||
      activity.details.toLowerCase().includes(search.toLowerCase()) ||
      activity.action.toLowerCase().includes(search.toLowerCase());

    const typeMatch = filterType === '' || activity.type === filterType;

    return searchMatch && typeMatch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Son İşlemler</h1>
      </div>

      <ActivityFilters
        search={search}
        type={filterType}
        onSearchChange={setSearch}
        onTypeChange={setFilterType}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
          {filteredActivities.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {activities.length === 0 ? 'Henüz işlem bulunmuyor.' : 'Aramanızla eşleşen işlem bulunamadı.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}