import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Payroll } from '../../types/payroll';
import { formatCurrency } from '../../utils/format';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface PayrollListProps {
  payrolls: Payroll[];
  onEdit: (payroll: Payroll) => void;
  onDelete: (id: number) => void;
}

export function PayrollList({ payrolls, onEdit, onDelete }: PayrollListProps) {
  const [employees] = useLocalStorage<any[]>('employees', []);

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : '-';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Personel
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Dönem
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Tür
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              Tutar
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(payroll => (
            <tr key={payroll.id} className="border-b dark:border-gray-700">
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {getEmployeeName(payroll.employeeId)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {payroll.month}/{payroll.year}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payroll.type === 'salary' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  payroll.type === 'bonus' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {payroll.type === 'salary' ? 'Maaş' :
                   payroll.type === 'bonus' ? 'Prim' : 'Avans'}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(payroll.amount)}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(payroll)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(payroll.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {payrolls.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz maaş ödemesi bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}