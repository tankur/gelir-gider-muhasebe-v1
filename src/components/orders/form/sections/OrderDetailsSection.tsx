import React from 'react';
import { FileText, Tag, Package } from 'lucide-react';

interface OrderDetailsSectionProps {
  status: string;
  isAdedi: string;
  modelKodu: string;
  onChange: (field: string, value: any) => void;
}

export function OrderDetailsSection({ status, isAdedi, modelKodu, onChange }: OrderDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={status}
          onChange={e => onChange('status', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pending">Beklemede</option>
          <option value="processing">İşleniyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal Edildi</option>
        </select>
      </div>

      <div className="relative">
        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="number"
          value={isAdedi}
          onChange={e => onChange('isAdedi', e.target.value)}
          placeholder="İş Adedi"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={modelKodu}
          onChange={e => onChange('modelKodu', e.target.value)}
          placeholder="Model Kodu"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
}