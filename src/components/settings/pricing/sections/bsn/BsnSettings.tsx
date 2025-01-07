import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { AssemblyPrice } from '../../../../../types/pricing';
import { PriceTable } from '../../shared/PriceTable';
import { AssemblyPriceForm } from '../../forms/AssemblyPriceForm';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';

export function BsnSettings() {
  const [bsnPrices, setBsnPrices] = useLocalStorage<AssemblyPrice[]>('bsn-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AssemblyPrice | null>(null);

  const handleSubmit = (item: AssemblyPrice) => {
    try {
      if (editingItem) {
        setBsnPrices(items => items.map(i => i.id === editingItem.id ? item : i));
        showSuccess('BSN fiyatı güncellendi');
      } else {
        setBsnPrices(items => [...items, item]);
        showSuccess('Yeni BSN fiyatı eklendi');
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      showError('Fiyat kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      'Fiyatı Sil',
      'Bu BSN fiyatını silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setBsnPrices(items => items.filter(i => i.id !== id));
        showSuccess('Fiyat başarıyla silindi');
      } catch (error) {
        showError('Fiyat silinirken bir hata oluştu');
      }
    }
  };

  const columns = [
    { key: 'name', header: 'İşlem Adı' },
    { key: 'complexity', header: 'Zorluk' },
    { key: 'price', header: 'Fiyat' },
    { key: 'currency', header: 'Para Birimi' },
    { key: 'unit', header: 'Birim' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          BSN Fiyatları
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni BSN Fiyatı
        </button>
      </div>

      <PriceTable
        data={bsnPrices}
        columns={columns}
        onEdit={(id) => {
          const item = bsnPrices.find(i => i.id === id);
          if (item) {
            setEditingItem(item);
            setIsModalOpen(true);
          }
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <AssemblyPriceForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          initialData={editingItem}
          type="bsn"
        />
      )}
    </div>
  );
}