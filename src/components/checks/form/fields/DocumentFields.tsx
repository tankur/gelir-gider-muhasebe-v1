import React from 'react';
import { FileText, Tag } from 'lucide-react';
import { CHECK_STATUS_LABELS } from '../../../../types/check';

interface DocumentFieldsProps {
  documentNumber: string;
  status: string;
  onChange: (field: string, value: string) => void;
}

export function DocumentFields({ documentNumber, status, onChange }: DocumentFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Document Number */}
      <div className="relative">
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={documentNumber}
          onChange={e => onChange('documentNumber', e.target.value)}
          placeholder="Belge Numarası"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Status */}
      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={status || 'pending'} // Set default value to 'pending'
          onChange={e => onChange('status', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {Object.entries(CHECK_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}