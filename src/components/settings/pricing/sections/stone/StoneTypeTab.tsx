import React from 'react';
import { Edit2, Trash2, Settings } from 'lucide-react';
import { StonePrice } from '../../../../../types/pricing';
import { formatCurrency } from '../../../../../utils/format';

interface StoneTypeTabProps {
  type: string;
  stones: StonePrice[];
  onEdit: (stone: StonePrice) => void;
  onDelete: (id: number) => void;
  onDeleteType: () => void;
}

export function StoneTypeTab({ type, stones, onEdit, onDelete, onDeleteType }: StoneTypeTabProps) {
  const groupedStones = stones.reduce((acc, stone) => {
    const key = stone.color || 'Diğer';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(stone);
    return acc;
  }, {} as Record<string, StonePrice[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
          {type} Taşları
        </h3>
        <button
          onClick={onDeleteType}
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
        >
          <Trash2 size={16} className="mr-1" />
          <span className="text-sm">Türü Sil</span>
        </button>
      </div>

      {Object.entries(groupedStones).map(([color, stones]) => (
        <div key={color} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              {color}
            </h4>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {stones.map(stone => (
              <div key={stone.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {stone.size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stone.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(stone.price, stone.currency)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(stone)}
                      className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(stone.id)}
                      className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {stones.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Bu türde henüz taş fiyatı bulunmuyor.
        </div>
      )}
    </div>
  );
}