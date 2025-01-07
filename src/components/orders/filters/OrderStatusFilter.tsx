import React from 'react';
import { Filter } from 'lucide-react';
import { ORDER_STATUSES, getOrderStatusText } from '../../../constants/orderStatuses';

interface OrderStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrderStatusFilter({ value, onChange }: OrderStatusFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <Filter size={20} className="text-gray-500 dark:text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select bg-gray-50 dark:bg-[#171717] border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Tüm Durumlar</option>
        {Object.values(ORDER_STATUSES).map(status => (
          <option key={status} value={status}>
            {getOrderStatusText(status)}
          </option>
        ))}
      </select>
    </div>
  );
}