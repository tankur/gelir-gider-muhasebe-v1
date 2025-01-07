import React from 'react';
import { Settings } from 'lucide-react';

interface ProductionDetailsSectionProps {
  cakimYeri: string;
  onChange: (field: string, value: any) => void;
}

export function ProductionDetailsSection({ cakimYeri, onChange }: ProductionDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Üretim Detayları</h3>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Çakım</label>
        <select
          value={cakimYeri}
          onChange={e => onChange('cakimYeri', e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Çakım Yok</option>
          <option value="inci">İnci</option>
          <option value="beyoglu">Beyoğlu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Perçin</label>
        <select
          value={cakimYeri}
          onChange={e => onChange('percinYeri', e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Perçin Yok</option>
          <option value="alt">Alt Perçin</option>
        </select>
      </div>
    </div>
  );
}