import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Order } from '../../types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderStatusSelect } from './OrderStatusSelect';
import { formatCurrency } from '../../utils/format';

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: number) => void;
  onStatusChange?: (orderId: number, newStatus: string) => void;
}

export function OrderList({ orders, onEdit, onDelete, onStatusChange }: OrderListProps) {
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);

  const handleStatusClick = (orderId: number) => {
    if (onStatusChange) {
      setEditingStatusId(orderId);
    }
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(orderId, newStatus);
      setEditingStatusId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Model Kodu</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tarih</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Tutar</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-gray-100">{order.companyName || '-'}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{order.customerName}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {order.modelKodu}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {new Date(order.orderDate).toLocaleDateString('tr-TR')}
              </td>
              <td className="px-6 py-4" onDoubleClick={() => handleStatusClick(order.id)}>
                {editingStatusId === order.id ? (
                  <OrderStatusSelect
                    currentStatus={order.status}
                    onStatusChange={(status) => handleStatusChange(order.id, status)}
                    onClose={() => setEditingStatusId(null)}
                  />
                ) : (
                  <OrderStatusBadge status={order.status} />
                )}
              </td>
              <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(order.totalAmount)}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(order)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(order.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz sipariş bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}