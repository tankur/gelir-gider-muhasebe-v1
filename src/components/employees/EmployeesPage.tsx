import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Employee } from '../../types/employee';
import { EmployeeList } from './EmployeeList';
import { EmployeeForm } from './EmployeeForm';
import { useActivities } from '../../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../../utils/alert';

export default function EmployeesPage() {
  const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { logActivity } = useActivities();

  const handleSubmit = (employee: Employee) => {
    try {
      if (editingEmployee) {
        setEmployees(employees.map(e => e.id === editingEmployee.id ? employee : e));
        showSuccess('Eleman bilgileri başarıyla güncellendi');
        logActivity(
          'Eleman güncellendi',
          `${employee.firstName} ${employee.lastName} bilgileri güncellendi`,
          'user'
        );
      } else {
        setEmployees([...employees, employee]);
        showSuccess('Yeni eleman başarıyla eklendi');
        logActivity(
          'Yeni eleman eklendi',
          `${employee.firstName} ${employee.lastName} eklendi`,
          'user'
        );
      }
      setIsModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      showError('Eleman kaydedilirken bir hata oluştu');
      console.error('Employee error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    const confirmed = await showConfirm(
      'Elemanı Sil',
      'Bu elemanı silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setEmployees(employees.filter(e => e.id !== id));
        showSuccess('Eleman başarıyla silindi');
        logActivity(
          'Eleman silindi',
          `${employee.firstName} ${employee.lastName} silindi`,
          'user'
        );
      } catch (error) {
        showError('Eleman silinirken bir hata oluştu');
        console.error('Delete employee error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Elemanlar</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni Eleman
        </button>
      </div>

      <EmployeeList
        employees={employees}
        onEdit={(employee) => {
          setEditingEmployee(employee);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <EmployeeForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
          initialData={editingEmployee}
        />
      )}
    </div>
  );
}