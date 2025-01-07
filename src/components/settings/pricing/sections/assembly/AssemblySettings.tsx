import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { AssemblyPrice } from '../../../../../types/pricing';
import { PriceTable } from '../../shared/PriceTable';
import { AssemblyPriceForm } from '../../forms/AssemblyPriceForm';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';

interface AssemblySettingsProps {
  type: 'assembly';
}

export function AssemblySettings({ type }: AssemblySettingsProps) {
  const [assemblyItems, setAssemblyItems] = useLocalStorage<AssemblyPrice[]>('assembly-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AssemblyPrice | null>(null);

  const handleSubmit = (item: AssemblyPrice) => {
    try {
      if (editingItem) {
        setAssemblyItems(items => items.map(i => i.id === editingItem.id ? item : i));
        showSuccess('Dizim fiyatı güncellendi');
      } else {
        setAssemblyItems(items => [...items, item]);
        showSuccess('Yeni dizim fiyatı eklendi');
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
      'Bu dizim fiyatını silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setAssemblyItems(items => items.filter(i => i.id !== id));
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
          Dizim Fiyatları
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Dizim Fiyatı
        </button>
      </div>

      <PriceTable
        data={assemblyItems}
        columns={columns}
        onEdit={(id) => {
          const item = assemblyItems.find(i => i.id === id);
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
          type="assembly"
        />
      )}
    </div>
  );
}