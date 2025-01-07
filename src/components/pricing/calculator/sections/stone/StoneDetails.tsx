import React from 'react';
import { StoneRow } from './StoneRow';
import { StoneTotal } from './StoneTotal';
import { Plus } from 'lucide-react';

interface StoneDetailsProps {
  stones: any[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
}

export function StoneDetails({ stones, onAdd, onRemove, onChange }: StoneDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Taş Detayları
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Taş Ekle
        </button>
      </div>

      <div className="space-y-3">
        {stones.map((stone) => (
          <StoneRow
            key={stone.id}
            stone={stone}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}

        {stones.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Henüz taş detayı eklenmemiş
          </div>
        )}
      </div>

      {stones.length > 0 && <StoneTotal stones={stones} />}
    </div>
  );
}