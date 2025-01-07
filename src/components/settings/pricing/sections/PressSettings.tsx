import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { PressPrice } from '../../../../types/pricing';
import { PriceTable } from '../shared/PriceTable';

export function PressSettings() {
  const [pressItems, setPressItems] = useLocalStorage<PressPrice[]>('press-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'name', header: 'Pres Adı' },
    { key: 'type', header: 'Tür' },
    { key: 'size', header: 'Boyut' },
    { key: 'price', header: 'Fiyat' },
    { key: 'currency', header: 'Para Birimi' },
    { key: 'unit', header: 'Birim' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Pres Fiyatları
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Pres Fiyatı
        </button>
      </div>

      <PriceTable
        data={pressItems}
        columns={columns}
        onEdit={(id) => {}}
        onDelete={(id) => {
          setPressItems(pressItems.filter(p => p.id !== id));
        }}
      />
    </div>
  );
}