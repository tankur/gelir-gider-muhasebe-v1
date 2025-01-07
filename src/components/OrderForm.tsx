import React, { useState, useEffect } from 'react';
import { Order } from '../types/order';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { OrderOptionsSection } from './orders/form/OrderOptionsSection';
import { CakimSection } from './orders/form/CakimSection';
import { CustomerSection } from './orders/form/CustomerSection';
import { OrderDetailsSection } from './orders/form/OrderDetailsSection';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  onClose: () => void;
  initialData?: Order | null;
}

interface FormData {
  customerId: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  isAdedi: string;
  modelKodu: string;
  cakimYeri: string;
  renkVaryanti: string;
  lazerKesim: 'var' | 'yok';
  cakimDetaylari: Array<{
    id: number;
    boy: string;
    adet: string;
  }>;
}

export function OrderForm({ onSubmit, onClose, initialData }: OrderFormProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [formData, setFormData] = useState<FormData>({
    customerId: initialData?.customerId || 0,
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'pending',
    isAdedi: initialData?.isAdedi || '',
    modelKodu: initialData?.modelKodu || '',
    cakimYeri: initialData?.cakimYeri || 'yok',
    renkVaryanti: initialData?.renkVaryanti || 'yok',
    lazerKesim: 'yok',
    cakimDetaylari: initialData?.cakimDetaylari || []
  });

  const handleCakimDetayEkle = () => {
    setFormData(prev => ({
      ...prev,
      cakimDetaylari: [
        ...prev.cakimDetaylari,
        { id: Date.now(), boy: '', adet: '' }
      ]
    }));
  };

  const handleCakimDetaySil = (id: number) => {
    setFormData(prev => ({
      ...prev,
      cakimDetaylari: prev.cakimDetaylari.filter(detay => detay.id !== id)
    }));
  };

  const handleCakimDetayUpdate = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newDetaylar = [...prev.cakimDetaylari];
      newDetaylar[index] = { ...newDetaylar[index], [field]: value };
      return { ...prev, cakimDetaylari: newDetaylar };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    
    const orderData: Order = {
      id: initialData?.id || Date.now(),
      customerId: formData.customerId,
      customerName: selectedCustomer?.name || '',
      companyName: selectedCustomer?.companyName || '',
      orderDate: formData.orderDate,
      status: formData.status,
      isAdedi: formData.isAdedi,
      modelKodu: formData.modelKodu,
      cakimYeri: formData.cakimYeri,
      renkVaryanti: formData.renkVaryanti,
      lazerKesim: formData.lazerKesim,
      cakimDetaylari: formData.cakimDetaylari,
      items: [],
      totalAmount: 0
    };

    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl my-8">
        <h2 className="text-xl font-bold mb-6">
          {initialData ? 'Siparişi Düzenle' : 'Yeni Sipariş'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerSection
            customerId={formData.customerId}
            orderDate={formData.orderDate}
            customers={customers}
            onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          />

          <OrderDetailsSection
            status={formData.status}
            isAdedi={formData.isAdedi}
            modelKodu={formData.modelKodu}
            onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          />

          <OrderOptionsSection
            cakimYeri={formData.cakimYeri}
            renkVaryanti={formData.renkVaryanti}
            lazerKesim={formData.lazerKesim}
            onCakimChange={(value) => setFormData(prev => ({ ...prev, cakimYeri: value }))}
            onRenkVaryantiChange={(value) => setFormData(prev => ({ ...prev, renkVaryanti: value }))}
            onLazerKesimChange={(value) => setFormData(prev => ({ ...prev, lazerKesim: value }))}
          />

          {formData.cakimYeri !== 'yok' && (
            <CakimSection
              cakimYeri={formData.cakimYeri}
              detaylar={formData.cakimDetaylari}
              onDetayEkle={handleCakimDetayEkle}
              onDetaySil={handleCakimDetaySil}
              onDetayUpdate={handleCakimDetayUpdate}
            />
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}