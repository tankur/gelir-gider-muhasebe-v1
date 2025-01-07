import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types/transaction';
import { CATEGORIES } from '../constants/categories';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DollarSign, Calendar, FileText, Tag, Building2 } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  onClose: () => void;
  initialData?: Transaction | null;
}

export function TransactionForm({ onSubmit, onClose, initialData }: TransactionFormProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'> & { customerId?: number; currency: string }>({
    type: TransactionType.INCOME,
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    customerId: undefined,
    currency: 'TRY'
  });

  useEffect(() => {
    if (initialData) {
      const customer = customers.find(c => c.id === initialData.customerId);
      setFormData({
        type: initialData.type,
        category: initialData.category,
        description: initialData.description,
        amount: initialData.amount.toString(),
        date: new Date(initialData.date).toISOString().split('T')[0],
        customerId: initialData.customerId,
        currency: customer?.currency || 'TRY'
      });
    }
  }, [initialData, customers]);

  const handleCustomerChange = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      currency: customer?.currency || 'TRY'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      id: initialData?.id || Date.now(),
      type: formData.type,
      category: formData.category,
      description: formData.description,
      amount: Number(formData.amount),
      date: formData.date,
      customerId: formData.type === TransactionType.INCOME ? formData.customerId : undefined,
      currency: formData.currency
    };
    onSubmit(transactionData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'İşlem Düzenle' : 'Yeni İşlem'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* İşlem Türü */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: TransactionType.INCOME }))}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                formData.type === TransactionType.INCOME
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gelir
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: TransactionType.EXPENSE }))}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                formData.type === TransactionType.EXPENSE
                  ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gider
            </button>
          </div>

          {/* Müşteri Seçimi */}
          {formData.type === TransactionType.INCOME && (
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.customerId || ''}
                onChange={e => handleCustomerChange(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Müşteri Seçin</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.companyName || customer.name} ({customer.currency || 'TRY'})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Kategori */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Kategori Seçin</option>
              {CATEGORIES[formData.type].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Açıklama */}
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Açıklama"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Tutar ve Para Birimi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Tutar"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="TRY">TL</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Tarih */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Butonlar */}
          <div className="flex justify-end space-x-3 pt-2">
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