import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Transaction, TransactionType } from '../types/transaction';
import { formatCurrency } from '../utils/format';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);

  const getCustomerInfo = (customerId?: number) => {
    if (!customerId) return { name: '-', companyName: '-' };
    const customer = customers.find(c => c.id === customerId);
    return {
      name: customer?.name || '-',
      companyName: customer?.companyName || '-'
    };
  };

  const getCustomerCurrency = (customerId?: number) => {
    if (!customerId) return 'TRY';
    const customer = customers.find(c => c.id === customerId);
    return customer?.currency || 'TRY';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Tarih
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Tür
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Müşteri
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Kategori
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Açıklama
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              Tutar
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map(transaction => {
            const customerInfo = getCustomerInfo(transaction.customerId);
            return (
              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {new Date(transaction.date).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === TransactionType.INCOME
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400'
                  }`}>
                    {transaction.type === TransactionType.INCOME ? 'Gelir' : 'Gider'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {transaction.type === TransactionType.INCOME && (
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {customerInfo.companyName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {customerInfo.name}
                      </div>
                    </div>
                  )}
                  {transaction.type === TransactionType.EXPENSE && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium">
                  <span className={transaction.type === TransactionType.INCOME 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'}>
                    {formatCurrency(transaction.amount, getCustomerCurrency(transaction.customerId))}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz işlem bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}