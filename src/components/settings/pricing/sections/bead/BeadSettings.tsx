import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { BeadPrice } from '../../../../../types/pricing';
import { BeadPriceList } from './BeadPriceList';
import { BeadPriceForm } from './BeadPriceForm';
import { BeadColorManager } from './BeadColorManager';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';
import { BEAD_SIZES } from '../../../../../constants/beadSizes';

export function BeadSettings() {
  const [beadPrices, setBeadPrices] = useLocalStorage<BeadPrice[]>('bead-prices', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColorManagerOpen, setIsColorManagerOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<BeadPrice | null>(null);

  const inciPrices = beadPrices.filter(p => p.type === 'inci');
  const beyogluPrices = beadPrices.filter(p => p.type === 'beyoglu');

  const handleSubmit = (price: BeadPrice) => {
    try {
      if (editingPrice) {
        setBeadPrices(prices => prices.map(p => p.id === editingPrice.id ? price : p));
        showSuccess(`${price.type === 'inci' ? 'İnci' : 'Beyoğlu'} fiyatı güncellendi`);
      } else {
        setBeadPrices(prices => [...prices, price]);
        showSuccess(`Yeni ${price.type === 'inci' ? 'inci' : 'beyoğlu'} fiyatı eklendi`);
      }
      setIsModalOpen(false);
      setEditingPrice(null);
    } catch (error) {
      showError('Fiyat kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    const price = beadPrices.find(p => p.id === id);
    if (!price) return;

    const confirmed = await showConfirm(
      'Fiyatı Sil',
      `Bu ${price.type === 'inci' ? 'inci' : 'beyoğlu'} fiyatını silmek istediğinizden emin misiniz?`
    );

    if (confirmed) {
      try {
        setBeadPrices(prices => prices.filter(p => p.id !== id));
        showSuccess('Fiyat başarıyla silindi');
      } catch (error) {
        showError('Fiyat silinirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* İnci Fiyatları */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            İnci Fiyatları
          </h2>
          <button
            onClick={() => {
              setEditingPrice(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Yeni İnci Fiyatı
          </button>
        </div>

        <BeadPriceList
          prices={inciPrices}
          onEdit={(price) => {
            setEditingPrice(price);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          type="inci"
        />
      </div>

      {/* Beyoğlu Fiyatları */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Beyoğlu Fiyatları
          </h2>
          <button
            onClick={() => {
              setEditingPrice(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Yeni Beyoğlu Fiyatı
          </button>
        </div>

        <BeadPriceList
          prices={beyogluPrices}
          onEdit={(price) => {
            setEditingPrice(price);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          type="beyoglu"
        />
      </div>

      {isModalOpen && (
        <BeadPriceForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPrice(null);
          }}
          initialData={editingPrice}
          type={editingPrice?.type || 'inci'}
          sizes={editingPrice?.type === 'beyoglu' ? BEAD_SIZES.beyoglu : BEAD_SIZES.inci}
        />
      )}

      {isColorManagerOpen && (
        <BeadColorManager
          type={editingPrice?.type || 'inci'}
          onClose={() => setIsColorManagerOpen(false)}
        />
      )}
    </div>
  );
}