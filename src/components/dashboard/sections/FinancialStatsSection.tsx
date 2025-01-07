import React from 'react';
import { useTransactions } from '../../../hooks/useTransactions';
import { TransactionType } from '../../../types/transaction';
import { AnimatedStatsCard } from '../components/AnimatedStatsCard';

export function FinancialStatsSection() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnimatedStatsCard
        title="Toplam Gelir"
        value={totalIncome}
        type="income"
      />
      <AnimatedStatsCard
        title="Toplam Gider"
        value={totalExpense}
        type="expense"
      />
      <AnimatedStatsCard
        title="Genel Durum"
        value={balance}
        type="balance"
      />
    </div>
  );
}