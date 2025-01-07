import React from 'react';
import { Plus } from 'lucide-react';

interface StoneDetailsHeaderProps {
  onAdd: () => void;
}

export function StoneDetailsHeader({ onAdd }: StoneDetailsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
        Taş Detayları
      </h3>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
      >
        <Plus size={14} className="mr-1.5" />
        Taş Ekle
      </button>
    </div>
  );
}