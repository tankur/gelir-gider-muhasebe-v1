import React from 'react';
import { StonePrice } from '../../../../../types/pricing';
import { STONE_TYPE_SIZES } from '../../../../../constants/stoneSizes';
import { formatCurrency } from '../../../../../utils/format';
import { useStoneColors } from '../../../../../hooks/useStoneColors';

interface StoneColorListProps {
  type: string;
  stones: StonePrice[];
  onEdit: (stone: StonePrice) => void;
}

export function StoneColorList({ type, stones, onEdit }: StoneColorListProps) {
  const { colors } = useStoneColors();
  const sizes = STONE_TYPE_SIZES[type as keyof typeof STONE_TYPE_SIZES] || [];

  return (
    <div className="space-y-8">
      {colors.map(color => {
        const colorStones = stones.filter(s => s.color === color);
        
        return (
          <div key={color} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{color}</h4>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sizes.map(size => {
                  const stone = colorStones.find(s => s.size === size) || {
                    id: Date.now(),
                    type,
                    color,
                    size,
                    price: 1,
                    currency: 'USD',
                    unit: type === 'spaciel' ? 'adet' : '144 adet (1 Gros)'
                  };

                  return (
                    <div 
                      key={size}
                      onClick={() => onEdit(stone)}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {size}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(stone.price, stone.currency)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}