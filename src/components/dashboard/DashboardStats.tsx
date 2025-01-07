import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Transaction, TransactionType } from '../../types/transaction';
import { formatCurrency } from '../../utils/format';
import { ArrowUpCircle, ArrowDownCircle, Package, Users, FileCheck } from 'lucide-react';

export function DashboardStats() {
  const [transactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [checks] = useLocalStorage<any[]>('checks', []);

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const cashBalance = totalIncome - totalExpense;

  const stats = [
    {
      title: 'Toplam Gelir',
      value: formatCurrency(totalIncome),
      icon: ArrowUpCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Toplam Gider',
      value: formatCurrency(totalExpense),
      icon: ArrowDownCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Kasa',
      value: formatCurrency(cashBalance),
      icon: Package,
      color: cashBalance >= 0 ? 'text-blue-600' : 'text-red-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Müşteriler',
      value: customers.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Aktif Çekler',
      value: checks.filter(check => check.status === 'pending').length,
      icon: FileCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}