import React, { useState } from 'react';
import { Order } from '../../../types/order';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CustomerSection } from './sections/CustomerSection';
import { OrderStatusSection } from './sections/OrderStatusSection';
import { BeadworkSection } from './sections/BeadworkSection';
import { StoneDetailsSection } from './sections/StoneDetailsSection';
import { PriceSection } from './sections/PriceSection';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  onClose: () => void;
  initialData?: Order | null;
}

export function OrderForm({ onSubmit, onClose, initialData }: OrderFormProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || '',
    modelKodu: initialData?.modelKodu || '',
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || '',
    lazerKesim: initialData?.lazerKesim || 'yok',
    renkVaryanti: initialData?.renkVaryanti || 'yok',
    cakimYeri: initialData?.cakimYeri || 'yok',
    cakimDetaylari: initialData?.cakimDetaylari || [],
    tasDetaylari: initialData?.tasDetaylari || [],
    isAdedi: initialData?.isAdedi || '',
    unitPrice: initialData?.unitPrice || '',
    totalAmount: initialData?.totalAmount || 0
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
      status: formData.status,
      isAdedi: formData.isAdedi,
      modelKodu: formData.modelKodu,
      cakimYeri: formData.cakimYeri,
      cakimDetaylari: formData.cakimDetaylari,
      renkVaryanti: formData.renkVaryanti,
      lazerKesim: formData.lazerKesim as any,
      tasDetaylari: formData.tasDetaylari,
      unitPrice: formData.unitPrice,
      totalAmount: formData.totalAmount,
      items: []
    };

    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#171717] rounded-xl w-full max-w-4xl my-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {initialData ? 'Siparişi Düzenle' : 'Yeni Sipariş'}
          </h2>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <CustomerSection
              customerId={formData.customerId}
              modelKodu={formData.modelKodu}
              orderDate={formData.orderDate}
              customers={customers}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <OrderStatusSection
              status={formData.status}
              lazerKesim={formData.lazerKesim as 'var' | 'yok'}
              renkVaryanti={formData.renkVaryanti}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <BeadworkSection
              cakimYeri={formData.cakimYeri}
              cakimDetaylari={formData.cakimDetaylari}
              isAdedi={formData.isAdedi}
              onChange={(value) => setFormData(prev => ({ ...prev, cakimYeri: value }))}
              onDetailAdd={() => setFormData(prev => ({
                ...prev,
                cakimDetaylari: [
                  ...prev.cakimDetaylari,
                  { id: Date.now(), boy: '', adet: '', renk: '' }
                ]
              }))}
              onDetailDelete={(id) => setFormData(prev => ({
                ...prev,
                cakimDetaylari: prev.cakimDetaylari.filter(d => d.id !== id)
              }))}
              onDetailUpdate={(index, field, value) => {
                const newDetails = [...formData.cakimDetaylari];
                newDetails[index] = { ...newDetails[index], [field]: value };
                setFormData(prev => ({ ...prev, cakimDetaylari: newDetails }));
              }}
            />

            <StoneDetailsSection
              details={formData.tasDetaylari}
              onChange={(details) => setFormData(prev => ({ ...prev, tasDetaylari: details }))}
              productCount={Number(formData.isAdedi)}
            />

            <PriceSection
              unitPrice={formData.unitPrice}
              quantity={formData.isAdedi}
              onChange={(field, value) => {
                setFormData(prev => {
                  const newData = { ...prev, [field]: value };
                  newData.totalAmount = Number(newData.isAdedi) * Number(newData.unitPrice);
                  return newData;
                });
              }}
            />
          </div>

          {/* Fixed Footer */}
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
                {initialData ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}