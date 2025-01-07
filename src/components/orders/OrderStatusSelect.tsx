import React, { useEffect, useRef } from 'react';
import { ORDER_STATUSES, getOrderStatusText } from '../../constants/orderStatuses';

interface OrderStatusSelectProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  onClose: () => void;
}

export function OrderStatusSelect({ currentStatus, onStatusChange, onClose }: OrderStatusSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value);
  };

  const handleBlur = () => {
    onClose();
  };

  return (
    <select
      ref={selectRef}
      value={currentStatus}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full rounded-lg border-gray-300 dark:border-gray-600 
                 text-sm focus:ring-blue-500 focus:border-blue-500 
                 dark:bg-gray-700 dark:text-gray-200"
      autoFocus
    >
      {Object.values(ORDER_STATUSES).map(status => (
        <option key={status} value={status}>
          {getOrderStatusText(status)}
        </option>
      ))}
    </select>
  );
}