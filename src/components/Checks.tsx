import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Check } from '../types/check';
import { useActivities } from '../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../utils/alert';
import { CheckList } from './checks/CheckList';
import { CheckForm } from './checks/form/CheckForm';
import { CheckDetails } from './checks/details/CheckDetails';
import { CheckFilters } from './checks/CheckFilters';

export default function Checks() {
  const [checks, setChecks] = useLocalStorage<Check[]>('checks', []);
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCheck, setEditingCheck] = useState<Check | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<Check | null>(null);
  const { logActivity } = useActivities();

  // Filter states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredChecks = checks.filter(check => {
    const searchMatch = search.toLowerCase() === '' ||
      check.customerName.toLowerCase().includes(search.toLowerCase()) ||
      check.documentNumber.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === '' || check.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleSubmit = (check: Check) => {
    try {
      if (editingCheck) {
        setChecks(checks.map(c => c.id === editingCheck.id ? check : c));
        showSuccess('Çek başarıyla güncellendi');
        logActivity(
          'Çek güncellendi',
          `${check.customerName} müşterisine ait çek güncellendi`,
          'check'
        );
      } else {
        const newCheck = { ...check, id: Date.now() };
        setChecks([...checks, newCheck]);
        showSuccess('Yeni çek başarıyla eklendi');
        logActivity(
          'Yeni çek eklendi',
          `${check.customerName} müşterisine ait yeni çek eklendi`,
          'check'
        );
      }
      setIsModalOpen(false);
      setEditingCheck(null);
    } catch (error) {
      showError('Çek kaydedilirken bir hata oluştu');
      console.error('Check error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const check = checks.find(c => c.id === id);
    if (!check) return;

    const confirmed = await showConfirm(
      'Çeki Sil',
      'Bu çeki silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setChecks(checks.filter(c => c.id !== id));
        showSuccess('Çek başarıyla silindi');
        logActivity(
          'Çek silindi',
          `${check.customerName} müşterisine ait çek silindi`,
          'check'
        );
      } catch (error) {
        showError('Çek silinirken bir hata oluştu');
        console.error('Delete check error:', error);
      }
    }
  };

  const handleStatusChange = (checkId: number, newStatus: string) => {
    const check = checks.find(c => c.id === checkId);
    if (!check) return;

    const updatedChecks = checks.map(c => 
      c.id === checkId ? { ...c, status: newStatus as any } : c
    );

    setChecks(updatedChecks);
    logActivity(
      'Çek durumu güncellendi',
      `${check.customerName} müşterisine ait çekin durumu "${newStatus}" olarak güncellendi`,
      'check'
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Çekler</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Çek
        </button>
      </div>

      <CheckFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-white dark:bg-[#171717] rounded-lg shadow-sm border border-gray-200 dark:border-neutral-800">
        <CheckList
          checks={filteredChecks}
          onEdit={(check) => {
            setEditingCheck(check);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onView={setSelectedCheck}
        />
      </div>

      {isModalOpen && (
        <CheckForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCheck(null);
          }}
          initialData={editingCheck}
          customers={customers}
        />
      )}

      {selectedCheck && (
        <CheckDetails
          check={selectedCheck}
          onClose={() => setSelectedCheck(null)}
        />
      )}
    </div>
  );
}