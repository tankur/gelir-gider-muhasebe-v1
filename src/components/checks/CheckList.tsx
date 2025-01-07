import React, { useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Check } from '../../types/check';
import { CheckStatusBadge } from './CheckStatusBadge';
import { CheckDueDate } from './CheckDueDate';
import { formatCurrency } from '../../utils/format';
import { CheckStatusSelect } from './CheckStatusSelect';
import { useCustomers } from '../../hooks/useCustomers';

interface CheckListProps {
  checks: Check[];
  onEdit: (check: Check) => void;
  onDelete: (id: number) => void;
  onStatusChange: (checkId: number, newStatus: string) => void;
  onView: (check: Check) => void;
}

export function CheckList({ checks, onEdit, onDelete, onStatusChange, onView }: CheckListProps) {
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const { getCustomerInfo } = useCustomers();

  const handleStatusClick = (checkId: number) => {
    setEditingStatusId(checkId);
  };

  const handleStatusChange = (checkId: number, newStatus: string) => {
    onStatusChange(checkId, newStatus);
    setEditingStatusId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Müşteri
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Belge No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Vade Tarihi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Durum
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tutar
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#171717] divide-y divide-gray-200 dark:divide-gray-700">
          {checks.map(check => {
            const customerInfo = getCustomerInfo(check.customerId);
            return (
              <tr key={check.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {customerInfo.companyName || '-'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {customerInfo.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {check.documentNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckDueDate dueDate={check.dueDate} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap" onDoubleClick={() => handleStatusClick(check.id)}>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(check.amount, check.currency)}
                  {check.currency !== 'TRY' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatCurrency(check.amount * check.exchangeRate, 'TRY')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onView(check)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    title="Görüntüle"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(check)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    title="Düzenle"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(check.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
          {checks.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz çek bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}