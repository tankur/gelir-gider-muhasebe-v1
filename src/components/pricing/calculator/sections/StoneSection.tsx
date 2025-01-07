import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useStonePricing } from '../../../../hooks/useStonePricing';
import { formatExactCurrency } from '../../../../utils/format';

interface StoneDetail {
  id: number;
  tasCinsi: string;
  boyut: string;
  renk: string;
  adet: string;
}

interface StoneSectionProps {
  formData: any;
  onChange: (data: any) => void;
}

export function StoneSection({ formData, onChange }: StoneSectionProps) {
  const { stonePrices } = useStonePricing();

  const handleAddStone = () => {
    const newStones = [
      ...formData.tasDetaylari,
      { id: Date.now(), tasCinsi: 'dmc', boyut: '', renk: '', adet: '' }
    ];
    onChange({ ...formData, tasDetaylari: newStones });
  };

  const handleRemoveStone = (id: number) => {
    const newStones = formData.tasDetaylari.filter((t: any) => t.id !== id);
    onChange({ ...formData, tasDetaylari: newStones });
  };

  const handleStoneChange = (id: number, field: string, value: string) => {
    const newStones = formData.tasDetaylari.map((stone: StoneDetail) => {
      if (stone.id === id) {
        return { ...stone, [field]: value };
      }
      return stone;
    });
    onChange({ ...formData, tasDetaylari: newStones });
  };

  // Get unique stone types from settings
  const stoneTypes = Array.from(new Set(stonePrices.map(s => s.type)));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Taş Detayları
        </label>
      </div>

      <div className="space-y-3">
        {formData.tasDetaylari.map((stone: StoneDetail) => {
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

          // Get price for selected combination
          const selectedStone = stonePrices.find(s => 
            s.type === stone.tasCinsi && 
            s.size === stone.boyut && 
            s.color === stone.renk
          );

          const totalPrice = selectedStone && stone.adet 
            ? (Number(stone.adet) / 144) * selectedStone.price 
            : 0;

          return (
            <div key={stone.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center space-x-3">
                <select
                  value={stone.tasCinsi}
                  onChange={e => handleStoneChange(stone.id, 'tasCinsi', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Taş Cinsi</option>
                  {stoneTypes.map(type => (
                    <option key={type} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>

                <select
                  value={stone.boyut}
                  onChange={e => handleStoneChange(stone.id, 'boyut', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!stone.tasCinsi}
                >
                  <option value="">Boyut</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>

                <select
                  value={stone.renk}
                  onChange={e => handleStoneChange(stone.id, 'renk', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!stone.tasCinsi || !stone.boyut}
                >
                  <option value="">Renk</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>

                <input
                  type="number"
                  value={stone.adet}
                  onChange={e => handleStoneChange(stone.id, 'adet', e.target.value)}
                  placeholder="Adet"
                  className="w-32 px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveStone(stone.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  <Minus size={20} />
                </button>
              </div>

              {/* Price Display */}
              {selectedStone && stone.adet && (
                <div className="text-sm text-gray-600 dark:text-gray-400 pl-2 flex justify-between items-center">
                  <div>
                    144 adet fiyatı: {formatExactCurrency(selectedStone.price, selectedStone.currency)}
                    <span className="mx-2">•</span>
                    {stone.adet && (
                      <span>
                        {(Number(stone.adet) / 144).toFixed(4)} gros
                      </span>
                    )}
                  </div>
                  <div className="font-medium">
                    Maliyet: {formatExactCurrency(totalPrice, selectedStone.currency)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleAddStone}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500 transition-colors"
        >
          <Plus size={20} className="inline-block mr-2" />
          Taş Ekle
        </button>
      </div>
    </div>
  );
}