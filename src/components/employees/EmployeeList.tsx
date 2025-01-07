import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Employee } from '../../types/employee';
import { formatCurrency } from '../../utils/format';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Ad Soyad</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Departman</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Pozisyon</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">İletişim</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Maaş</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="border-b dark:border-gray-700">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {employee.firstName} {employee.lastName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(employee.startDate).toLocaleDateString('tr-TR')}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {employee.department}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {employee.position}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {employee.phoneNumber}
                </div>
                {employee.email && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {employee.email}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(employee.salary)}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  employee.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {employee.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(employee)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz eleman bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}