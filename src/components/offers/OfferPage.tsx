import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { OfferForm } from './form/OfferForm';
import { OfferList } from './list/OfferList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Offer } from '../../types/offer';
import { useActivities } from '../../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../../utils/alert';

export default function OfferPage() {
  const [offers, setOffers] = useLocalStorage<Offer[]>('offers', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { logActivity } = useActivities();

  const handleSubmit = (offer: Offer) => {
    try {
      if (editingOffer) {
        setOffers(offers.map(o => o.id === editingOffer.id ? offer : o));
        showSuccess('Teklif başarıyla güncellendi');
        logActivity(
          'Teklif güncellendi',
          `${offer.customerName} müşterisine ait teklif güncellendi`,
          'order'
        );
      } else {
        const newOffer = { ...offer, id: Date.now() };
        setOffers([...offers, newOffer]);
        showSuccess('Yeni teklif başarıyla oluşturuldu');
        logActivity(
          'Yeni teklif oluşturuldu',
          `${offer.customerName} müşterisine yeni teklif oluşturuldu`,
          'order'
        );
      }
      setIsModalOpen(false);
      setEditingOffer(null);
    } catch (error) {
      showError('Teklif kaydedilirken bir hata oluştu');
      console.error('Offer error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const offer = offers.find(o => o.id === id);
    if (!offer) return;

    const confirmed = await showConfirm(
      'Teklifi Sil',
      'Bu teklifi silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setOffers(offers.filter(o => o.id !== id));
        showSuccess('Teklif başarıyla silindi');
        logActivity(
          'Teklif silindi',
          `${offer.customerName} müşterisine ait teklif silindi`,
          'order'
        );
      } catch (error) {
        showError('Teklif silinirken bir hata oluştu');
        console.error('Delete offer error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Teklifler</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Teklif
        </button>
      </div>

      <OfferList
        offers={offers}
        onEdit={(offer) => {
          setEditingOffer(offer);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <OfferForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOffer(null);
          }}
          initialData={editingOffer}
        />
      )}
    </div>
  );
}