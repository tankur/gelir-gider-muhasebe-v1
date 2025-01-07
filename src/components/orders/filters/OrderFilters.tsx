import React from 'react';
import { OrderSearchInput } from './OrderSearchInput';
import { OrderStatusFilter } from './OrderStatusFilter';

interface OrderFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function OrderFilters({ search, status, onSearchChange, onStatusChange }: OrderFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 space-y-4">
      <OrderSearchInput value={search} onChange={onSearchChange} />
      <OrderStatusFilter value={status} onChange={onStatusChange} />
    </div>
  );
}