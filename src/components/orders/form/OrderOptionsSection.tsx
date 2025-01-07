import React from 'react';
import { Settings } from 'lucide-react';

interface OrderOptionsSectionProps {
  cakimYeri: string;
  onChange: (field: string, value: any) => void;
}

export function OrderOptionsSection({ cakimYeri, onChange }: OrderOptionsSectionProps) {
  return (
    <div className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Üretim Detayları</h3>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Çakım</label>
        <select
          value={cakimYeri}
          onChange={e => onChange('cakimYeri', e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="yok">Yok</option>
          <option value="inci">İnci</option>
          <option value="beyoglu">Beyoğlu</option>
        </select>
      </div>
    </div>
  );
}