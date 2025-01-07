import React from 'react';
import { Order } from '../../../../types/order';
import { formatCurrency } from '../../../../utils/format';

interface OrderPrintDetailsProps {
  order: Order;
}

export function OrderPrintDetails({ order }: OrderPrintDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Müşteri Bilgileri</h2>
        <div className="space-y-1">
          <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
          {order.companyName && (
            <p className="text-gray-600 dark:text-gray-400">{order.companyName}</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sipariş Detayları</h2>
        <div className="space-y-1">
          <p><span className="text-gray-600 dark:text-gray-400">Model Kodu:</span> <span className="text-gray-900 dark:text-white">{order.modelKodu}</span></p>
          <p><span className="text-gray-600 dark:text-gray-400">İş Adedi:</span> <span className="text-gray-900 dark:text-white">{order.isAdedi}</span></p>
          {order.unitPrice && (
            <p><span className="text-gray-600 dark:text-gray-400">Birim Fiyat:</span> <span className="text-gray-900 dark:text-white">{formatCurrency(Number(order.unitPrice))}</span></p>
          )}
          <p className="font-medium"><span className="text-gray-600 dark:text-gray-400">Toplam Tutar:</span> <span className="text-gray-900 dark:text-white">{formatCurrency(order.totalAmount)}</span></p>
        </div>
      </div>
    </div>
  );
}