import React from 'react';
import { Order } from '../../../../types/order';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Wallet } from 'lucide-react';

interface OrderPrintHeaderProps {
  order: Order;
}

export function OrderPrintHeader({ order }: OrderPrintHeaderProps) {
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });

  return (
    <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="flex items-center space-x-3">
        {settings.logo ? (
          <img src={settings.logo} alt="Logo" className="h-12 w-auto" />
        ) : (
          <Wallet className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{settings.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sipariş No: #{order.id}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">Tarih</p>
        <p className="font-medium text-gray-900 dark:text-white">
          {new Date(order.orderDate).toLocaleDateString('tr-TR')}
        </p>
      </div>
    </div>
  );
}