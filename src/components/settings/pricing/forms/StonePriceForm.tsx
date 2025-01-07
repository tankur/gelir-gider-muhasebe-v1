import React, { useState, useEffect } from 'react';
import { StonePrice } from '../../../../types/pricing';
import { DollarSign, Tag, Box } from 'lucide-react';
import { useStoneColors } from '../../../../hooks/useStoneColors';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { STONE_TYPE_SIZES } from '../../../../constants/stoneSizes';

interface StonePriceFormProps {
  onSubmit: (stone: StonePrice) => void;
  onClose: () => void;
  initialData?: StonePrice | null;
  stoneType: string;
}

export function StonePriceForm({ onSubmit, onClose, initialData, stoneType }: StonePriceFormProps) {
  const { colors } = useStoneColors();
  const [stoneSizes] = useLocalStorage<{ [key: string]: string[] }>('stone-type-sizes', {});
  
  const [formData, setFormData] = useState<Omit<StonePrice, 'id'>>({
    name: '',
    type: stoneType,
    size: '',
    unit: stoneType === 'spaciel' || stoneType === 'konik' ? 'adet' : '144 adet (1 Gros)',
    price: 1,
    currency: 'USD',
    color: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id || Date.now() });
  };

  // Get sizes based on stone type
  const getSizes = () => {
    if (stoneType === 'konik') {
      return stoneSizes[stoneType] || [];
    }
    return STONE_TYPE_SIZES[stoneType as keyof typeof STONE_TYPE_SIZES] || [];
  };

  const sizes = getSizes();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'Taş Fiyatını Düzenle' : `Yeni ${stoneType.toUpperCase()} Taş Fiyatı`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Taş Rengi */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Renk Seçin</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Boyut */}
          <div className="relative">
            <Box className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.size}
              onChange={e => setFormData({ ...formData, size: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Boyut Seçin</option>
              {sizes.map(size => (
                <option key={size} value={size}>
                  {size} {stoneType !== 'spaciel' && stoneType !== 'konik' ? '(1 Gros)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Fiyat ve Para Birimi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="Fiyat"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="relative">
              <select
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value as any })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="TRY">TRY</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}