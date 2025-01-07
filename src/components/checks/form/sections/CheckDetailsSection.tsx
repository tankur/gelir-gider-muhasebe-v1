import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { CHECK_STATUS_LABELS } from '../../../../types/check';

interface CheckDetailsSectionProps {
  documentNumber: string;
  receiveDate: string;
  dueDate: string;
  status: string;
  onChange: (field: string, value: any) => void;
}

export function CheckDetailsSection({
  documentNumber,
  receiveDate,
  dueDate,
  status,
  onChange
}: CheckDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <FileText className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Çek Bilgileri</span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Belge Numarası
          </label>
          <input
            type="text"
            value={documentNumber}
            onChange={e => onChange('documentNumber', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Alış Tarihi
            </label>
            <input
              type="date"
              value={receiveDate}
              onChange={e => onChange('receiveDate', e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Vade Tarihi
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => onChange('dueDate', e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Durum
          </label>
          <select
            value={status}
            onChange={e => onChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {Object.entries(CHECK_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}