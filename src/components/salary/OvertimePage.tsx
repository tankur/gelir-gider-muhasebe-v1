import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Overtime } from '../../types/overtime';
import { OvertimeList } from './OvertimeList';
import { OvertimeForm } from './OvertimeForm';
import { showSuccess, showError, showConfirm } from '../../utils/alert';

export default function OvertimePage() {
  const [overtimes, setOvertimes] = useLocalStorage<Overtime[]>('overtimes', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOvertime, setEditingOvertime] = useState<Overtime | null>(null);

  const handleSubmit = (overtime: Overtime) => {
    try {
      if (editingOvertime) {
        setOvertimes(overtimes.map(o => o.id === editingOvertime.id ? overtime : o));
        showSuccess('Mesai kaydı başarıyla güncellendi');
      } else {
        setOvertimes([...overtimes, { ...overtime, id: Date.now() }]);
        showSuccess('Yeni mesai kaydı başarıyla eklendi');
      }
      setIsModalOpen(false);
      setEditingOvertime(null);
    } catch (error) {
      showError('Mesai kaydı kaydedilirken bir hata oluştu');
      console.error('Overtime error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      'Mesai Kaydını Sil',
      'Bu mesai kaydını silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setOvertimes(overtimes.filter(o => o.id !== id));
        showSuccess('Mesai kaydı başarıyla silindi');
      } catch (error) {
        showError('Mesai kaydı silinirken bir hata oluştu');
        console.error('Delete overtime error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mesai Kayıtları</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Mesai Kaydı
        </button>
      </div>

      <OvertimeList
        overtimes={overtimes}
        onEdit={(overtime) => {
          setEditingOvertime(overtime);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <OvertimeForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOvertime(null);
          }}
          initialData={editingOvertime}
        />
      )}
    </div>
  );
}