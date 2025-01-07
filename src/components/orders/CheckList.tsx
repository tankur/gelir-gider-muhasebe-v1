import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Check } from '../../types/check';
import { CheckStatusBadge } from './CheckStatusBadge';
import { CheckDueDate } from './CheckDueDate';
import { formatCurrency } from '../../utils/format';
import { CheckStatusSelect } from './CheckStatusSelect';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CustomerDisplay } from '../shared/CustomerDisplay';

interface CheckListProps {
  checks: Check[];
  onEdit: (check: Check) => void;
  onDelete: (id: number) => void;
  onStatusChange: (checkId: number, newStatus: string) => void;
}

export function CheckList({ checks, onEdit, onDelete, onStatusChange }: CheckListProps) {
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [customers] = useLocalStorage<any[]>('customers', []);

  const handleStatusClick = (checkId: number) => {
    setEditingStatusId(checkId);
  };

  const handleStatusChange = (checkId: number, newStatus: string) => {
    onStatusChange(checkId, newStatus);
    setEditingStatusId(null);
  };

  const getCustomerInfo = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    return {
      companyName: customer?.companyName || '',
      customerName: customer?.name || '-'
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Firma Adı</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Vade Tarihi</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Tutar</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {checks.map(check => {
            const customerInfo = getCustomerInfo(check.customerId);
            return (
              <tr key={check.id} className="border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <CustomerDisplay
                    companyName={customerInfo.companyName}
                    customerName={customerInfo.customerName}
                  />
                </td>
                <td className="px-6 py-4">
                  <CheckDueDate dueDate={check.dueDate} />
                </td>
                <td className="px-6 py-4" onDoubleClick={() => handleStatusClick(check.id)}>
                  {editingStatusId === check.id ? (
                    <CheckStatusSelect
                      currentStatus={check.status}
                      onStatusChange={(status) => handleStatusChange(check.id, status)}
                      onClose={() => setEditingStatusId(null)}
                    />
                  ) : (
                    <CheckStatusBadge status={check.status} />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(check.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(check)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(check.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
          {checks.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz çek bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}