import React from 'react';
import { StonePrice } from '../../../../../types/pricing';
import { formatCurrency } from '../../../../../utils/format';
import { Edit2 } from 'lucide-react';

interface KonikStoneListProps {
  stones: StonePrice[];
  onEdit: (stone: StonePrice) => void;
}

export function KonikStoneList({ stones, onEdit }: KonikStoneListProps) {
  // Group stones by size
  const groupedStones = stones.reduce((acc, stone) => {
    if (!acc[stone.size]) {
      acc[stone.size] = [];
    }
    acc[stone.size].push(stone);
    return acc;
  }, {} as Record<string, StonePrice[]>);

  if (Object.keys(groupedStones).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Henüz konik taş fiyatı bulunmuyor. Yeni fiyat eklemek için "Yeni Taş Fiyatı" butonunu kullanın.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedStones).map(([size, sizeStones]) => (
        <div key={size} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {size}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sizeStones.map(stone => (
                <div
                  key={stone.id}
                  onClick={() => onEdit(stone)}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {stone.color}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(stone.price, stone.currency)}
                      </div>
                    </div>
                    <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}