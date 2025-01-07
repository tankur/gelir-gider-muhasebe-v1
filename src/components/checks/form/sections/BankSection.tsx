import React from 'react';
import { Landmark, FileText } from 'lucide-react';

interface BankSectionProps {
  bankName: string;
  description: string;
  onChange: (field: string, value: any) => void;
}

export function BankSection({ bankName, description, onChange }: BankSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <Landmark className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Banka Bilgileri</span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Banka Adı
          </label>
          <input
            type="text"
            value={bankName}
            onChange={e => onChange('bankName', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Banka adını girin"
          />
        </div>

        <div>
          <label className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
            <FileText className="w-4 h-4 mr-1" />
            Açıklama
          </label>
          <textarea
            value={description}
            onChange={e => onChange('description', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={3}
            placeholder="Çek ile ilgili notlar..."
          />
        </div>
      </div>
    </div>
  );
}