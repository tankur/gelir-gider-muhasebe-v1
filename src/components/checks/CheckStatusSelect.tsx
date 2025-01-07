import React, { useEffect, useRef } from 'react';
import { CHECK_STATUS_LABELS } from '../../types/check';

interface CheckStatusSelectProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  onClose: () => void;
}

export function CheckStatusSelect({ currentStatus, onStatusChange, onClose }: CheckStatusSelectProps) {
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
      {Object.entries(CHECK_STATUS_LABELS).map(([status, label]) => (
        <option key={status} value={status}>{label}</option>
      ))}
    </select>
  );
}