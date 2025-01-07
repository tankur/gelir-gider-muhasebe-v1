import React from 'react';
import { OrderItem } from '../../types/order';
import { formatCurrency } from '../../utils/format';

interface OrderItemsListProps {
  items: OrderItem[];
  currency: string;
}

export function OrderItemsList({ items, currency }: OrderItemsListProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Sipariş Detayları</h4>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ürün Kodu</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ürün Adı</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Miktar</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Birim Fiyat</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Toplam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{item.productCode}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-900">{item.quantity}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-900">
                  {formatCurrency(item.price, currency)}
                </td>
                <td className="px-4 py-2 text-sm text-right font-medium text-gray-900">
                  {formatCurrency(item.quantity * item.price, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}