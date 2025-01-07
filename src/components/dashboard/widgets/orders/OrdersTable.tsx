import React from 'react';
import { Order } from '../../../../types/order';
import { OrderStatusBadge } from '../../../orders/OrderStatusBadge';
import { OrderStatusSelect } from './OrderStatusSelect';

interface OrdersTableProps {
  orders: Order[];
  editingId: number | null;
  onStatusEdit: (id: number) => void;
  onStatusChange: (orderId: number, newStatus: string) => void;
}

export function OrdersTable({ orders, editingId, onStatusEdit, onStatusChange }: OrdersTableProps) {
  return (
    <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Müşteri
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Model Kodu
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Tarih
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Durum
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">
                {order.customerName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">
                {order.modelKodu}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">
                {new Date(order.orderDate).toLocaleDateString('tr-TR')}
              </td>
              <td className="px-4 py-2 text-sm"
                  onDoubleClick={() => onStatusEdit(order.id)}>
                {editingId === order.id ? (
                  <OrderStatusSelect
                    currentStatus={order.status}
                    onStatusChange={(status) => onStatusChange(order.id, status)}
                    onClose={() => onStatusEdit(null)}
                  />
                ) : (
                  <OrderStatusBadge status={order.status} />
                )}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz sipariş bulunmuyor
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}