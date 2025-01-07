import React from 'react';
import { Order } from '../../../types/order';
import { PrintLayout } from '../../shared/print/PrintLayout';
import { PrintSection } from '../../shared/print/PrintSection';
import { PrintSignature } from '../../shared/print/PrintSignature';
import { formatCurrency } from '../../../utils/format';

interface OrderPrintProps {
  order: Order;
  onClose: () => void;
}

export function OrderPrint({ order, onClose }: OrderPrintProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PrintLayout 
      title={`Sipariş #${order.id}`}
      onClose={onClose}
      onPrint={handlePrint}
    >
      {/* Müşteri Bilgileri */}
      <PrintSection title="Müşteri Bilgileri">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
            {order.companyName && (
              <p className="text-gray-600 dark:text-gray-400">{order.companyName}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-gray-600 dark:text-gray-400">Sipariş Tarihi</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(order.orderDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </PrintSection>

      {/* Sipariş Detayları */}
      <PrintSection title="Sipariş Detayları">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Model Kodu</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.modelKodu}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">İş Adedi</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.isAdedi}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Çakım</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.cakimYeri === 'yok' ? '-' : order.cakimYeri}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Renk Varyantı</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.renkVaryanti === 'yok' ? '-' : order.renkVaryanti}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lazer Kesim</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {order.lazerKesim === 'var' ? 'Var' : 'Yok'}
              </p>
            </div>
          </div>
        </div>
      </PrintSection>

      {/* Çakım Detayları */}
      {order.cakimYeri !== 'yok' && order.cakimDetaylari && order.cakimDetaylari.length > 0 && (
        <PrintSection title="Çakım Detayları">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Boy</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Adet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.cakimDetaylari.map((detay, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{detay.boy}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">{detay.adet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PrintSection>
      )}

      {/* Taş Detayları */}
      {order.tasDetaylari && order.tasDetaylari.length > 0 && (
        <PrintSection title="Taş Detayları">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Taş Cinsi</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Boyut</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Renk</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Adet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.tasDetaylari.map((tas, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{tas.tasCinsi}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{tas.boyut}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{tas.renk}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">{tas.adet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PrintSection>
      )}

      {/* Fiyat Bilgileri */}
      {order.unitPrice && (
        <PrintSection title="Fiyat Bilgileri">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Birim Fiyat:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(Number(order.unitPrice))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Adet:</span>
              <span className="font-medium text-gray-900 dark:text-white">{order.isAdedi}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span className="text-gray-900 dark:text-white">Toplam:</span>
              <span className="text-gray-900 dark:text-white">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </PrintSection>
      )}

      {/* İmza Alanı */}
      <PrintSignature />
    </PrintLayout>
  );
}