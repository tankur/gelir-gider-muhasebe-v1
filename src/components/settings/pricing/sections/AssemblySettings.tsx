import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { AssemblyPrice } from '../../../../types/pricing';
import { PriceTable } from '../shared/PriceTable';
import { AssemblyPriceForm } from '../forms/AssemblyPriceForm';
import { showSuccess, showError, showConfirm } from '../../../../utils/alert';

export function AssemblySettings() {
  const [assemblyItems, setAssemblyItems] = useLocalStorage<AssemblyPrice[]>('assembly-prices', []);
  const [bsnItems, setBsnItems] = useLocalStorage<AssemblyPrice[]>('bsn-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AssemblyPrice | null>(null);
  const [priceType, setPriceType] = useState<'assembly' | 'bsn'>('assembly');

  const handleSubmit = (item: AssemblyPrice) => {
    try {
      const items = priceType === 'assembly' ? assemblyItems : bsnItems;
      const setItems = priceType === 'assembly' ? setAssemblyItems : setBsnItems;

      if (editingItem) {
        setItems(items.map(i => i.id === editingItem.id ? item : i));
        showSuccess(`${priceType === 'assembly' ? 'Dizim' : 'BSN'} fiyatı güncellendi`);
      } else {
        setItems([...items, item]);
        showSuccess(`Yeni ${priceType === 'assembly' ? 'dizim' : 'BSN'} fiyatı eklendi`);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      showError('Fiyat kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: number, type: 'assembly' | 'bsn') => {
    const confirmed = await showConfirm(
      'Fiyatı Sil',
      `Bu ${type === 'assembly' ? 'dizim' : 'BSN'} fiyatını silmek istediğinizden emin misiniz?`
    );

    if (confirmed) {
      try {
        if (type === 'assembly') {
          setAssemblyItems(assemblyItems.filter(i => i.id !== id));
        } else {
          setBsnItems(bsnItems.filter(i => i.id !== id));
        }
        showSuccess('Fiyat başarıyla silindi');
      } catch (error) {
        showError('Fiyat silinirken bir hata oluştu');
      }
    }
  };

  const columns = [
    { key: 'name', header: 'İşlem Adı' },
    { key: 'type', header: 'Tür' },
    { key: 'complexity', header: 'Zorluk' },
    { key: 'price', header: 'Fiyat' },
    { key: 'currency', header: 'Para Birimi' },
    { key: 'unit', header: 'Birim' }
  ];

  return (
    <div className="space-y-8">
      {/* Dizim Fiyatları */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Dizim Fiyatları
          </h2>
          <button
            onClick={() => {
              setPriceType('assembly');
              setIsModalOpen(true);
            }}
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
              setPriceType('assembly');
              setIsModalOpen(true);
            }
          }}
          onDelete={(id) => handleDelete(id, 'assembly')}
        />
      </div>

      {/* BSN Fiyatları */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            BSN Fiyatları
          </h2>
          <button
            onClick={() => {
              setPriceType('bsn');
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Yeni BSN Fiyatı
          </button>
        </div>

        <PriceTable
          data={bsnItems}
          columns={columns}
          onEdit={(id) => {
            const item = bsnItems.find(i => i.id === id);
            if (item) {
              setEditingItem(item);
              setPriceType('bsn');
              setIsModalOpen(true);
            }
          }}
          onDelete={(id) => handleDelete(id, 'bsn')}
        />
      </div>

      {isModalOpen && (
        <AssemblyPriceForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          initialData={editingItem}
          type={priceType}
        />
      )}
    </div>
  );
}