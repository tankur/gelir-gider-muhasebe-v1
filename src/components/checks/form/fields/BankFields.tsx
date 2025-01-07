import React from 'react';
import { Building2, FileText } from 'lucide-react';

interface BankFieldsProps {
  bankName: string;
  description: string;
  onChange: (field: string, value: string) => void;
}

export function BankFields({ bankName, description, onChange }: BankFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={bankName}
          onChange={e => onChange('bankName', e.target.value)}
          placeholder="Banka Adı"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          value={description}
          onChange={e => onChange('description', e.target.value)}
          placeholder="Açıklama"
          rows={3}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}