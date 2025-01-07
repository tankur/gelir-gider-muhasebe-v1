import { Transaction, TransactionType } from '../types/transaction';

export function calculateTrend(
  transactions: Transaction[],
  type: TransactionType
): { value: number; isPositive: boolean } {
  const today = new Date();
  const currentMonth = today.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = today.getFullYear();
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthTotal = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === type && 
             date.getMonth() === currentMonth &&
             date.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthTotal = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === type && 
             date.getMonth() === lastMonth &&
             date.getFullYear() === lastMonthYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  if (lastMonthTotal === 0) return { value: 0, isPositive: true };

  const trend = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  return {
    value: Math.round(Math.abs(trend)),
    isPositive: trend >= 0
  };
}