import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFieldsProps {
  receiveDate: string;
  dueDate: string;
  onChange: (field: string, value: string) => void;
}

export function DateFields({ receiveDate, dueDate, onChange }: DateFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          Alınan Tarih
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={receiveDate}
            onChange={e => onChange('receiveDate', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          Vade Tarihi
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={dueDate}
            onChange={e => onChange('dueDate', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
}