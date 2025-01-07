import React, { useState, useEffect } from 'react';
import { AssemblyPrice } from '../../../../types/pricing';
import { DollarSign, Tag, Box } from 'lucide-react';

interface AssemblyPriceFormProps {
  onSubmit: (price: AssemblyPrice) => void;
  onClose: () => void;
  initialData?: AssemblyPrice | null;
  type: 'assembly' | 'bsn';
}

export function AssemblyPriceForm({ onSubmit, onClose, initialData, type }: AssemblyPriceFormProps) {
  const [formData, setFormData] = useState<Omit<AssemblyPrice, 'id'>>({
    name: '',
    type: type === 'assembly' ? 'dizim' : 'bsn',
    complexity: 'medium',
    price: 0,
    currency: 'TRY',
    unit: 'adet'
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'Fiyatı Düzenle' : `Yeni ${type === 'assembly' ? 'Dizim' : 'BSN'} Fiyatı`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* İşlem Adı */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="İşlem Adı"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Zorluk Seviyesi */}
          <div className="relative">
            <Box className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.complexity}
              onChange={e => setFormData({ ...formData, complexity: e.target.value as any })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="low">Kolay</option>
              <option value="medium">Orta</option>
              <option value="high">Zor</option>
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
                <option value="TRY">TL</option>
                <option value="USD">USD</option>
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