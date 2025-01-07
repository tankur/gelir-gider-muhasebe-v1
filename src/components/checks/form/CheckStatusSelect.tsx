import React from 'react';
import { CheckStatus, CHECK_STATUS_LABELS } from '../../../types/check';

interface CheckStatusSelectProps {
  value: CheckStatus;
  onChange: (value: CheckStatus) => void;
}

export function CheckStatusSelect({ value, onChange }: CheckStatusSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as CheckStatus)}
      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    >
      <option value="">Çekin Durumu</option>
      {Object.entries(CHECK_STATUS_LABELS).map(([status, label]) => (
        <option key={status} value={status}>{label}</option>
      ))}
    </select>
  );
}