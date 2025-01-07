import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Payroll } from '../../types/payroll';
import { PayrollList } from './PayrollList';
import { PayrollForm } from './PayrollForm';
import { showSuccess, showError, showConfirm } from '../../utils/alert';

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useLocalStorage<Payroll[]>('payrolls', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState<Payroll | null>(null);

  const handleSubmit = (payroll: Payroll) => {
    try {
      if (editingPayroll) {
        setPayrolls(payrolls.map(p => p.id === editingPayroll.id ? payroll : p));
        showSuccess('Maaş ödemesi başarıyla güncellendi');
      } else {
        setPayrolls([...payrolls, { ...payroll, id: Date.now() }]);
        showSuccess('Yeni maaş ödemesi başarıyla eklendi');
      }
      setIsModalOpen(false);
      setEditingPayroll(null);
    } catch (error) {
      showError('Maaş ödemesi kaydedilirken bir hata oluştu');
      console.error('Payroll error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      'Maaş Ödemesini Sil',
      'Bu maaş ödemesini silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setPayrolls(payrolls.filter(p => p.id !== id));
        showSuccess('Maaş ödemesi başarıyla silindi');
      } catch (error) {
        showError('Maaş ödemesi silinirken bir hata oluştu');
        console.error('Delete payroll error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Maaş Ödemeleri</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Maaş Ödemesi
        </button>
      </div>

      <PayrollList
        payrolls={payrolls}
        onEdit={(payroll) => {
          setEditingPayroll(payroll);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <PayrollForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPayroll(null);
          }}
          initialData={editingPayroll}
        />
      )}
    </div>
  );
}