import React from 'react';
import { Transaction, TransactionType } from '../../../types/transaction';
import { formatCurrency } from '../../../utils/format';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gelir</div>
        <div className="text-xl font-semibold text-green-600 dark:text-green-400">
          {formatCurrency(totalIncome)}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gider</div>
        <div className="text-xl font-semibold text-red-600 dark:text-red-400">
          {formatCurrency(totalExpense)}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 dark:text-gray-400">Net Durum</div>
        <div className={`text-xl font-semibold ${
          netBalance >= 0 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {formatCurrency(netBalance)}
        </div>
      </div>
    </div>
  );
}