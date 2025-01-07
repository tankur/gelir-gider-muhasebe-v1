import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Order } from '../../../types/order';
import { OrderStatusBadge } from '../../orders/OrderStatusBadge';
import { formatCurrency } from '../../../utils/format';

export function RecentOrders() {
  const [orders] = useLocalStorage<Order[]>('orders', []);

  // Son 5 siparişi al ve tarihe göre sırala
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Son Siparişler
        </h3>
        <Link 
          to="/orders"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentOrders.map(order => (
            <div key={order.id} className="py-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {order.customerName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Model: {order.modelKodu}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <div className="py-4 text-center text-gray-500 dark:text-gray-400">
              Henüz sipariş bulunmuyor
            </div>
          )}
        </div>
      </div>
    </div>
  );
}