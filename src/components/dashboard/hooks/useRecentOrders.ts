import { useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Order } from '../../../types/order';
import { useActivities } from '../../../hooks/useActivities';

export function useRecentOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { logActivity } = useActivities();

  // Get the 10 most recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 10);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    );

    setOrders(updatedOrders);
    setEditingId(null);

    logActivity(
      'Sipariş durumu güncellendi',
      `${order.customerName} müşterisine ait sipariş durumu "${newStatus}" olarak güncellendi`,
      'order'
    );
  };

  return {
    recentOrders,
    editingId,
    setEditingId,
    handleStatusChange
  };
}