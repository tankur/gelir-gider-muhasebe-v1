import React, { useState, useEffect, useRef } from 'react';
import { Customer } from '../../types/customer';
import { CustomerFormFields } from './form/CustomerFormFields';
import { CustomerLogoUpload } from './form/CustomerLogoUpload';

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void;
  onClose: () => void;
  initialData?: Customer | null;
}

export function CustomerForm({ onSubmit, onClose, initialData }: CustomerFormProps) {
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    address: '',
    currency: 'TRY',
    logo: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        companyName: initialData.companyName || '',
        phone: initialData.phone,
        email: initialData.email || '',
        address: initialData.address || '',
        currency: initialData.currency || 'TRY',
        logo: initialData.logo || ''
      });
    }
  }, [initialData]);

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, logo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || Date.now()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'Müşteriyi Düzenle' : 'Yeni Müşteri'}
        </h2>

        <form onSubmit={handleSubmit}>
          <CustomerLogoUpload
            logo={formData.logo}
            onLogoChange={handleLogoChange}
            fileInputRef={fileInputRef}
          />

          <CustomerFormFields
            formData={formData}
            onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          />

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}