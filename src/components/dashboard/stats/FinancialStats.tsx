import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTransactions } from '../../../hooks/useTransactions';
import { TransactionType } from '../../../types/transaction';
import { StatCard } from './StatCard';
import { formatCurrency } from '../../../utils/format';
import { calculateTrend } from '../../../utils/stats';

export function FinancialStats() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const cashBalance = totalIncome - totalExpense;

  const incomeTrend = calculateTrend(transactions, TransactionType.INCOME);
  const expenseTrend = calculateTrend(transactions, TransactionType.EXPENSE);
  const balanceTrend = {
    value: incomeTrend.value - expenseTrend.value,
    isPositive: incomeTrend.value > expenseTrend.value
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Toplam Gelir"
        value={totalIncome}
        icon={ArrowUpCircle}
        color="text-green-600 dark:text-green-400"
        bgColor="bg-[#f8fafc] dark:bg-neutral-800/50"
        trend={incomeTrend}
        formatter={formatCurrency}
      />
      <StatCard
        title="Toplam Gider"
        value={totalExpense}
        icon={ArrowDownCircle}
        color="text-red-600 dark:text-red-400"
        bgColor="bg-[#f8fafc] dark:bg-neutral-800/50"
        trend={expenseTrend}
        formatter={formatCurrency}
      />
      <StatCard
        title="Kasa"
        value={cashBalance}
        icon={Wallet}
        color={cashBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}
        bgColor="bg-[#f8fafc] dark:bg-neutral-800/50"
        trend={balanceTrend}
        formatter={formatCurrency}
      />
    </div>
  );
}