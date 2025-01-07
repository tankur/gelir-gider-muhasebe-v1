import React from 'react';
import { Save, RotateCcw } from 'lucide-react';

interface DashboardToolbarProps {
  isEditing: boolean;
  onEditToggle: () => void;
  onReset: () => void;
}

export function DashboardToolbar({ isEditing, onEditToggle, onReset }: DashboardToolbarProps) {
  return (
    <div className="mb-4 flex justify-end space-x-2">
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
  );
}