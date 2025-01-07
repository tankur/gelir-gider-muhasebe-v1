import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatCurrency } from '../../utils/format';
import { ShoppingBag, CreditCard, Wallet } from 'lucide-react';

interface CustomerSummaryProps {
  customerId: number;
}

export function CustomerSummary({ customerId }: CustomerSummaryProps) {
  const [orders] = useLocalStorage<any[]>('orders', []);
  const [payments] = useLocalStorage<any[]>('payments', []);

  const customerOrders = orders.filter(o => o.customerId === customerId);
  const customerPayments = payments.filter(p => p.customerId === customerId);

  const totalOrders = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalPayments = customerPayments.reduce((sum, p) => sum + p.amount, 0);
  const balance = totalOrders - totalPayments;

  const stats = [
    {
      title: 'Toplam Sipariş',
      value: formatCurrency(totalOrders),
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-white/10'
    },
    {
      title: 'Toplam Ödeme',
      value: formatCurrency(totalPayments),
      icon: CreditCard,
      color: 'text-green-600 dark:text-green-300',
      bgColor: 'bg-green-100 dark:bg-white/10'
    },
    {
      title: 'Bakiye',
      value: formatCurrency(Math.abs(balance)),
      icon: Wallet,
      color: balance >= 0 ? 'text-orange-600 dark:text-orange-300' : 'text-red-600 dark:text-red-300',
      bgColor: balance >= 0 ? 'bg-orange-100 dark:bg-white/10' : 'bg-red-100 dark:bg-white/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className={`p-3 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
              <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}