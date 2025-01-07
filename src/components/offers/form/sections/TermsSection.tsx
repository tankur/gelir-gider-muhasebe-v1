import React from 'react';
import { FileText } from 'lucide-react';

interface TermsSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function TermsSection({ formData, onChange }: TermsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Teklif Koşulları ve Notlar
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={formData.terms || ''}
            onChange={e => onChange('terms', e.target.value)}
            placeholder="Teklif koşulları (ödeme şartları, teslimat süresi vb.)"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>

        <div className="relative">
          <textarea
            value={formData.notes || ''}
            onChange={e => onChange('notes', e.target.value)}
            placeholder="Ek notlar (opsiyonel)"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}