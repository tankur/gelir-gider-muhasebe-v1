import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { BandPrice } from '../../../../types/pricing';
import { PriceTable } from '../shared/PriceTable';

export function BandSettings() {
  const [bands, setBands] = useLocalStorage<BandPrice[]>('band-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'name', header: 'Bant Adı' },
    { key: 'type', header: 'Tür' },
    { key: 'width', header: 'Genişlik' },
    { key: 'price', header: 'Fiyat' },
    { key: 'currency', header: 'Para Birimi' },
    { key: 'unit', header: 'Birim' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Bant Fiyatları
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Bant Fiyatı
        </button>
      </div>

      <PriceTable
        data={bands}
        columns={columns}
        onEdit={(id) => {}}
        onDelete={(id) => {
          setBands(bands.filter(b => b.id !== id));
        }}
      />
    </div>
  );
}