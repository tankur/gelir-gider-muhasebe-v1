import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Order } from '../types/order';
import { useActivities } from '../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../utils/alert';
import { OrderList } from './orders/OrderList';
import { OrderForm } from './orders/form/OrderForm';
import { OrderFilters } from './orders/filters/OrderFilters';

export default function OrderManagement() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const { logActivity } = useActivities();

  // Filter states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = orders.filter(order => {
    const searchMatch = search.toLowerCase() === '' ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.modelKodu?.toLowerCase().includes(search.toLowerCase()) ||
      order.companyName?.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === '' || order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleSubmit = (order: Order) => {
    try {
      if (editingOrder) {
        setOrders(orders.map(o => o.id === editingOrder.id ? order : o));
        showSuccess('Sipariş başarıyla güncellendi');
        logActivity(
          'Sipariş güncellendi',
          `${order.customerName} müşterisine ait sipariş güncellendi`,
          'order',
          { modelKodu: order.modelKodu }
        );
      } else {
        const newOrder = { ...order, id: Date.now() };
        setOrders([...orders, newOrder]);
        showSuccess('Yeni sipariş başarıyla eklendi');
        logActivity(
          'Yeni sipariş eklendi',
          `${order.customerName} müşterisine ait yeni sipariş oluşturuldu`,
          'order',
          { modelKodu: order.modelKodu }
        );
      }
      setIsModalOpen(false);
      setEditingOrder(null);
    } catch (error) {
      showError('Sipariş kaydedilirken bir hata oluştu');
      console.error('Order error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const confirmed = await showConfirm(
      'Siparişi Sil',
      'Bu siparişi silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setOrders(orders.filter(o => o.id !== id));
        showSuccess('Sipariş başarıyla silindi');
        logActivity(
          'Sipariş silindi',
          `${order.customerName} müşterisine ait sipariş silindi`,
          'order',
          { modelKodu: order.modelKodu }
        );
      } catch (error) {
        showError('Sipariş silinirken bir hata oluştu');
        console.error('Delete order error:', error);
      }
    }
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus as any } : o
    );

    setOrders(updatedOrders);
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sipariş Yönetimi</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Sipariş
        </button>
      </div>

      <OrderFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      <OrderList
        orders={filteredOrders}
        onEdit={(order) => {
          setEditingOrder(order);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {isModalOpen && (
        <OrderForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOrder(null);
          }}
          initialData={editingOrder}
        />
      )}
    </div>
  );
}