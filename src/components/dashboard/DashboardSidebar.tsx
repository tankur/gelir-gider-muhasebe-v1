import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Users, FileCheck, Package } from 'lucide-react';

export function DashboardSidebar() {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [checks] = useLocalStorage<any[]>('checks', []);
  const [orders] = useLocalStorage<any[]>('orders', []);

  const stats = [
    {
      title: 'Toplam Müşteri',
      value: customers.length,
      icon: Users,
      color: 'text-purple-600 dark:text-purple-300',
      bgColor: 'bg-purple-100 dark:bg-white/10'
    },
    {
      title: 'Aktif Çekler',
      value: checks.filter(check => check.status === 'pending').length,
      icon: FileCheck,
      color: 'text-indigo-600 dark:text-indigo-300',
      bgColor: 'bg-indigo-100 dark:bg-white/10'
    },
    {
      title: 'Bekleyen Siparişler',
      value: orders.filter(order => order.status === 'pending').length,
      icon: Package,
      color: 'text-orange-600 dark:text-orange-300',
      bgColor: 'bg-orange-100 dark:bg-white/10'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">İstatistikler</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{stat.title}</p>
              <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}