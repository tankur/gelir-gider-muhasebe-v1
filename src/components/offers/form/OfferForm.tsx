import React, { useState, useEffect } from 'react';
import { Offer } from '../../../types/offer';
import { CustomerSection } from './sections/CustomerSection';
import { ProductSection } from './sections/ProductSection';
import { PricingSection } from './sections/PricingSection';
import { TermsSection } from './sections/TermsSection';

interface OfferFormProps {
  onSubmit: (offer: Offer) => void;
  onClose: () => void;
  initialData?: Offer | null;
}

export function OfferForm({ onSubmit, onClose, initialData }: OfferFormProps) {
  const [formData, setFormData] = useState<Partial<Offer>>({
    customerId: '',
    customerName: '',
    companyName: '',
    products: [],
    totalAmount: 0,
    validUntil: '',
    terms: '',
    status: 'pending',
    currency: 'TRY',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Offer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl my-4 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {initialData ? 'Teklifi Düzenle' : 'Yeni Teklif'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <CustomerSection
              formData={formData}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <ProductSection
              products={formData.products || []}
              onChange={(products) => setFormData(prev => ({ ...prev, products }))}
            />

            <PricingSection
              formData={formData}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <TermsSection
              formData={formData}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 flex-shrink-0">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                         bg-gray-100 dark:bg-neutral-800 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white 
                         bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {initialData ? 'Güncelle' : 'Oluştur'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}