import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Order } from '../../../types/order';
import { OrderStatusBadge } from '../../orders/OrderStatusBadge';
import { OrderStatusSelect } from './OrderStatusSelect';
import { formatCurrency } from '../../../utils/format';
import { useActivities } from '../../../hooks/useActivities';

export function RecentOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { logActivity } = useActivities();

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus as any } : o
    );

    setOrders(updatedOrders);
    setEditingId(null);

    logActivity(
      'Sipariş durumu güncellendi',
      `${order.customerName} müşterisine ait sipariş durumu "${newStatus}" olarak güncellendi`,
      'order'
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Son Siparişler
        </h2>
        <Link 
          to="/orders"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <th className="pb-3">Müşteri</th>
              <th className="pb-3">Model</th>
              <th className="pb-3">Tarih</th>
              <th className="pb-3">Durum</th>
              <th className="pb-3 text-right">Tutar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
                  {order.customerName}
                </td>
                <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  {order.modelKodu}
                </td>
                <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                </td>
                <td className="py-3" onDoubleClick={() => setEditingId(order.id)}>
                  {editingId === order.id ? (
                    <OrderStatusSelect
                      currentStatus={order.status}
                      onStatusChange={(status) => handleStatusChange(order.id, status)}
                      onClose={() => setEditingId(null)}
                    />
                  ) : (
                    <OrderStatusBadge status={order.status} />
                  )}
                </td>
                <td className="py-3 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(order.totalAmount)}
                </td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500 dark:text-gray-400">
                  Henüz sipariş bulunmuyor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}