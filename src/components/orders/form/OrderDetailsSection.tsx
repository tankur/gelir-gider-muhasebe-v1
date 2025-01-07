import React from 'react';

interface OrderDetailsSectionProps {
  status: string;
  isAdedi: string;
  modelKodu: string;
  onChange: (field: string, value: any) => void;
}

export function OrderDetailsSection({ status, isAdedi, modelKodu, onChange }: OrderDetailsSectionProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">Durum</label>
        <select
          value={status}
          onChange={e => onChange('status', e.target.value)}
          className="w-full h-10 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="pending">Beklemede</option>
          <option value="processing">İşleniyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal Edildi</option>
        </select>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">İş Adedi</label>
        <input
          type="number"
          value={isAdedi}
          onChange={e => onChange('isAdedi', e.target.value)}
          className="w-full h-10 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
          min="1"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">Model Kodu</label>
        <input
          type="text"
          value={modelKodu}
          onChange={e => onChange('modelKodu', e.target.value)}
          className="w-full h-10 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>
    </div>
  );
}