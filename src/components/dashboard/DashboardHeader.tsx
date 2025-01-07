import React from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { ExchangeRates } from './exchange/ExchangeRates';

interface DashboardHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
  onReset: () => void;
}

export function DashboardHeader({ isEditing, onEditToggle, onReset }: DashboardHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
      <ExchangeRates isCompact={isEditing} />
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onEditToggle}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isEditing 
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Düzenlemeyi Bitir' : 'Düzenle'}</span>
        </button>
        {isEditing && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Varsayılana Dön</span>
          </button>
        )}
      </div>
    </div>
  );
}