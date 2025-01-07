import React from 'react';
import { Plus, Settings } from 'lucide-react';

interface StoneTypeHeaderProps {
  type: string;
  onAddSize: () => void;
  onManageColors: () => void;
}

export function StoneTypeHeader({ type, onAddSize, onManageColors }: StoneTypeHeaderProps) {
  const isFixedSizes = type === 'dmc' || type === 'duble';

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
          {type} Taşları
        </h3>
        {!isFixedSizes && (
          <button
            onClick={onAddSize}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Boyut Ekle
          </button>
        )}
      </div>
      <button
        onClick={onManageColors}
        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Settings size={18} />
      </button>
    </div>
  );
}