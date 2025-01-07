import React, { useState, useEffect } from 'react';
import { BeadPrice } from '../../../../../types/pricing';
import { DollarSign, Box, Palette, Package } from 'lucide-react';
import { BEAD_SIZES } from '../../../../../constants/beadSizes';

interface BeadPriceFormProps {
  onSubmit: (price: BeadPrice) => void;
  onClose: () => void;
  initialData?: BeadPrice | null;
  type: 'inci' | 'beyoglu';
}

export function BeadPriceForm({ onSubmit, onClose, initialData, type }: BeadPriceFormProps) {
  const [formData, setFormData] = useState<Omit<BeadPrice, 'id'>>({
    type,
    size: '',
    color: '',
    price: 0,
    currency: 'USD',
    unit: 'paket',
    piecesPerPackage: 0
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

  const sizes = BEAD_SIZES[type];
  const title = type === 'inci' ? 'İnci' : 'Beyoğlu';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? `${title} Fiyatını Düzenle` : `Yeni ${title} Fiyatı`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Paket Adedi */}
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.piecesPerPackage || ''}
              onChange={e => setFormData({ ...formData, piecesPerPackage: Number(e.target.value) })}
              placeholder="Paket Adedi"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1"
            />
          </div>

          {/* Fiyat ve Para Birimi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={formData.price || ''}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="Paket Fiyatı"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="relative">
              <select
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value as 'TRY' | 'USD' })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="TRY">TL</option>
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