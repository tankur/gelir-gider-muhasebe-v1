import React from 'react';
import { Minus } from 'lucide-react';
import { useStonePricing } from '../../../../../hooks/useStonePricing';
import { formatExactCurrency } from '../../../../../utils/format';

interface StoneRowProps {
  stone: any;
  onChange: (id: number, field: string, value: string) => void;
  onRemove: (id: number) => void;
}

export function StoneRow({ stone, onChange, onRemove }: StoneRowProps) {
  const { stonePrices, calculateStoneTotal, getStonePrice } = useStonePricing();

  // Get unique stone types from settings
  const stoneTypes = Array.from(new Set(stonePrices.map(s => s.type)));
  
  // Get sizes for selected type
  const sizes = Array.from(new Set(
    stonePrices
      .filter(s => s.type === stone.tasCinsi)
      .map(s => s.size)
  ));
  
  // Get colors for selected type and size
  const colors = Array.from(new Set(
    stonePrices
      .filter(s => s.type === stone.tasCinsi && s.size === stone.boyut)
      .map(s => s.color)
  ));

  // Get base price and calculate total
  const basePrice = stone.tasCinsi && stone.boyut && stone.renk ? 
    getStonePrice(stone.tasCinsi, stone.boyut, stone.renk)?.price || 0 : 0;
  
  const total = stone.tasCinsi && stone.boyut && stone.renk && stone.adet ?
    calculateStoneTotal(stone.tasCinsi, stone.boyut, stone.renk, Number(stone.adet)) : 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Taş Cinsi */}
        <div className="sm:col-span-3">
          <select
            value={stone.tasCinsi}
            onChange={e => onChange(stone.id, 'tasCinsi', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Taş Cinsi</option>
            {stoneTypes.map(type => (
              <option key={type} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Boyut */}
        <div className="sm:col-span-3">
          <select
            value={stone.boyut}
            onChange={e => onChange(stone.id, 'boyut', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={!stone.tasCinsi}
          >
            <option value="">Boyut</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Renk */}
        <div className="sm:col-span-3">
          <select
            value={stone.renk}
            onChange={e => onChange(stone.id, 'renk', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={!stone.tasCinsi || !stone.boyut}
          >
            <option value="">Renk</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Adet */}
        <div className="sm:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={stone.adet}
              onChange={e => onChange(stone.id, 'adet', e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Adet"
            />
            <button
              type="button"
              onClick={() => onRemove(stone.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
            >
              <Minus size={16} />
            </button>
          </div>
        </div>

        {/* Price Display */}
        {basePrice > 0 && (
          <div className="sm:col-span-12 mt-2">
            <div className="flex justify-between text-sm">
              <div className="text-gray-700 dark:text-gray-300">
                {stone.tasCinsi === 'dmc' || stone.tasCinsi === 'duble' ? (
                  <>
                    <span>144 adet fiyatı: {formatExactCurrency(basePrice)}</span>
                    {stone.adet && (
                      <span className="ml-2">
                        ({Math.ceil(Number(stone.adet) / 144)} gros)
                      </span>
                    )}
                  </>
                ) : (
                  <span>Birim fiyat: {formatExactCurrency(basePrice)}</span>
                )}
              </div>
              {total > 0 && (
                <div className="font-medium">
                  Toplam: {formatExactCurrency(total)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}