import React from 'react';

interface ProductionOptionsSectionProps {
  cakimYeri: string;
  onChange: (field: string, value: any) => void;
}

export function ProductionOptionsSection({
  cakimYeri,
  onChange
}: ProductionOptionsSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Çakım
      </label>
      <select
        value={cakimYeri}
        onChange={e => onChange('cakimYeri', e.target.value)}
        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="yok">Yok</option>
        <option value="inci">İnci</option>
        <option value="beyoglu">Beyoğlu</option>
      </select>
    </div>
  );
}