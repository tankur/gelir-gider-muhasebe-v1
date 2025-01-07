import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useActivities } from '../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../utils/alert';
import { CustomerList } from './customers/CustomerList';
import { CustomerForm } from './customers/CustomerForm';
import { CustomerDetails } from './customers/CustomerDetails';
import { Customer } from '../types/customer';

export default function Customers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const { logActivity } = useActivities();

  const handleSubmit = (customer: Customer) => {
    try {
      if (editingCustomer) {
        setCustomers(customers.map(c => c.id === editingCustomer.id ? customer : c));
        showSuccess('Müşteri başarıyla güncellendi');
        logActivity(
          'Müşteri güncellendi',
          `${customer.name} isimli müşteri bilgileri güncellendi`,
          'customer'
        );
      } else {
        const newCustomer = { ...customer, id: Date.now() };
        setCustomers([...customers, newCustomer]);
        showSuccess('Yeni müşteri başarıyla eklendi');
        logActivity(
          'Yeni müşteri eklendi',
          `${customer.name} isimli yeni müşteri eklendi`,
          'customer'
        );
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      showError('Müşteri kaydedilirken bir hata oluştu');
      console.error('Customer error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;

    const confirmed = await showConfirm(
      'Müşteriyi Sil',
      'Bu müşteriyi silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setCustomers(customers.filter(c => c.id !== id));
        showSuccess('Müşteri başarıyla silindi');
        logActivity(
          'Müşteri silindi',
          `${customer.name} isimli müşteri silindi`,
          'customer'
        );
      } catch (error) {
        showError('Müşteri silinirken bir hata oluştu');
        console.error('Delete customer error:', error);
      }
    }
  };

  if (selectedCustomerId !== null) {
    return (
      <div className="max-w-6xl mx-auto">
        <CustomerDetails 
          customerId={selectedCustomerId} 
          onBack={() => setSelectedCustomerId(null)} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Müşteriler</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Müşteri
        </button>
      </div>

      <CustomerList
        customers={customers}
        onView={(id) => setSelectedCustomerId(id)}
        onEdit={(customer) => {
          setEditingCustomer(customer);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CustomerForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCustomer(null);
          }}
          initialData={editingCustomer}
        />
      )}
    </div>
  );
}