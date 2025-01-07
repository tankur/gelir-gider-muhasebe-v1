import React, { useState } from 'react';
import { Order } from '../../types/order';
import { Calendar, Package, Tag, FileText, Building2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  onClose: () => void;
  initialData?: Order | null;
}

export function OrderForm({ onSubmit, onClose, initialData }: OrderFormProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || '',
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'pending',
    isAdedi: initialData?.isAdedi || '',
    modelKodu: initialData?.modelKodu || '',
    cakimYeri: initialData?.cakimYeri || 'yok',
    renkVaryanti: initialData?.renkVaryanti || 'yok',
    lazerKesim: initialData?.lazerKesim || 'yok'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCustomer = customers.find(c => c.id === Number(formData.customerId));
    
    const orderData: Order = {
      id: initialData?.id || Date.now(),
      customerId: Number(formData.customerId),
      customerName: selectedCustomer?.name || '',
      companyName: selectedCustomer?.companyName || '',
      orderDate: formData.orderDate,
      status: formData.status as any,
      isAdedi: formData.isAdedi,
      modelKodu: formData.modelKodu,
      cakimYeri: formData.cakimYeri,
      renkVaryanti: formData.renkVaryanti,
      lazerKesim: formData.lazerKesim as any,
      items: [],
      totalAmount: 0
    };

    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'Siparişi Düzenle' : 'Yeni Sipariş'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Müşteri Seçimi */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.customerId}
              onChange={e => setFormData({ ...formData, customerId: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Müşteri Seçin</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName ? `${customer.companyName} - ${customer.name}` : customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sipariş Tarihi */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={formData.orderDate}
              onChange={e => setFormData({ ...formData, orderDate: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* İş Adedi */}
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.isAdedi}
              onChange={e => setFormData({ ...formData, isAdedi: e.target.value })}
              placeholder="İş Adedi"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Model Kodu */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.modelKodu}
              onChange={e => setFormData({ ...formData, modelKodu: e.target.value })}
              placeholder="Model Kodu"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Durum */}
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="pending">Beklemede</option>
              <option value="processing">İşleniyor</option>
              <option value="completed">Tamamlandı</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>

          {/* Üretim Detayları */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Üretim Detayları</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Çakım</label>
                <select
                  value={formData.cakimYeri}
                  onChange={e => setFormData({ ...formData, cakimYeri: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="yok">Yok</option>
                  <option value="inci">İnci</option>
                  <option value="beyoglu">Beyoğlu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Renk Varyantı</label>
                <select
                  value={formData.renkVaryanti}
                  onChange={e => setFormData({ ...formData, renkVaryanti: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="yok">Yok</option>
                  <option value="renge-renk">Renge Renk</option>
                  <option value="sabit-renk">Sabit Renk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Lazer Kesim</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="var"
                    checked={formData.lazerKesim === 'var'}
                    onChange={e => setFormData({ ...formData, lazerKesim: e.target.value as 'var' | 'yok' })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Var</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="yok"
                    checked={formData.lazerKesim === 'yok'}
                    onChange={e => setFormData({ ...formData, lazerKesim: e.target.value as 'var' | 'yok' })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Yok</span>
                </label>
              </div>
            </div>
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