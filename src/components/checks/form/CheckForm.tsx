import React, { useState, useEffect } from 'react';
import { Check } from '../../../types/check';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CheckFormFields } from './CheckFormFields';

interface CheckFormProps {
  onSubmit: (check: Check) => void;
  onClose: () => void;
  initialData?: Check | null;
}

export function CheckForm({ onSubmit, onClose, initialData }: CheckFormProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [formData, setFormData] = useState<Partial<Check>>({
    customerId: 0,
    documentNumber: '',
    receiveDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    amount: 0,
    currency: 'TRY',
    exchangeRate: 1,
    status: 'pending',
    bankName: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    
    const checkData: Check = {
      id: initialData?.id || Date.now(),
      customerId: formData.customerId!,
      customerName: selectedCustomer?.name || '',
      documentNumber: formData.documentNumber!,
      receiveDate: formData.receiveDate!,
      dueDate: formData.dueDate!,
      amount: formData.amount!,
      currency: formData.currency! as any,
      exchangeRate: formData.exchangeRate!,
      status: formData.status! as any,
      bankName: formData.bankName,
      description: formData.description
    };

    onSubmit(checkData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {initialData ? 'Çeki Düzenle' : 'Yeni Çek'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <CheckFormFields
              formData={formData}
              customers={customers}
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
                {initialData ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}