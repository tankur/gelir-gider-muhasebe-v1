import React from 'react';
import { Check } from '../../types/check';

interface CheckStatusBadgeProps {
  status: Check['status'];
}

export function CheckStatusBadge({ status }: CheckStatusBadgeProps) {
  const getStatusConfig = (status: Check['status']) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Beklemede',
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        };
      case 'printed':
        return {
          text: 'Çek Yazdırıldı',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        };
      case 'guarantee':
        return {
          text: 'Banka Teminatı',
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
        };
      case 'used':
        return {
          text: 'Kullanıldı',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        };
      case 'cancelled':
        return {
          text: 'İptal Edildi',
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        };
      default:
        return {
          text: 'Bilinmiyor',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.text}
    </span>
  );
}