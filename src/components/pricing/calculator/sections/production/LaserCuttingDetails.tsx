import React from 'react';

interface LaserCuttingDetailsProps {
  lazerKesimFiyati: string;
  onChange: (value: string) => void;
}

export function LaserCuttingDetails({ lazerKesimFiyati, onChange }: LaserCuttingDetailsProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
        Lazer Kesim Fiyatı
      </label>
      <div className="relative">
        <input
          type="number"
          value={lazerKesimFiyati}
          onChange={e => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          min="0"
          step="0.01"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500">₺</span>
        </div>
      </div>
    </div>
  );
}