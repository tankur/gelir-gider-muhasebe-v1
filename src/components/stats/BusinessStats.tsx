import React from 'react';
import { Users, FileCheck, Package } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { StatCard } from './StatCard';

export function BusinessStats() {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [checks] = useLocalStorage<any[]>('checks', []);
  const [orders] = useLocalStorage<any[]>('orders', []);

  const activeChecks = checks.filter(check => check.status === 'pending').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Müşteriler"
        value={customers.length}
        icon={Users}
        color="text-purple-600 dark:text-purple-300"
        bgColor="bg-purple-100 dark:bg-white/10"
      />
      <StatCard
        title="Aktif Çekler"
        value={activeChecks}
        icon={FileCheck}
        color="text-indigo-600 dark:text-indigo-300"
        bgColor="bg-indigo-100 dark:bg-white/10"
      />
      <StatCard
        title="Bekleyen Siparişler"
        value={pendingOrders}
        icon={Package}
        color="text-orange-600 dark:text-orange-300"
        bgColor="bg-orange-100 dark:bg-white/10"
      />
    </div>
  );
}