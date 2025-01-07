import { useState } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Order } from '../../../../types/order';
import { useActivities } from '../../../../hooks/useActivities';

export function useRecentOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { logActivity } = useActivities();

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 10);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus as any } : o
    );

    setOrders(updatedOrders);
    setEditingId(null);

    // Log activity with complete metadata
    logActivity(
      'Sipariş durumu güncellendi',
      '', // Details will be formatted in ActivityItem
      'order',
      {
        orderId,
        customerName: order.customerName,
        modelKodu: order.modelKodu,
        previousStatus: order.status,
        newStatus
      }
    );
  };

  return {
    recentOrders,
    editingId,
    setEditingId,
    handleStatusChange
  };
}