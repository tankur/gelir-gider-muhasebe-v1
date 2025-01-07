import React from 'react';

interface PressDetailsProps {
  presDetaylari: {
    adet: string;
  };
  onChange: (value: any) => void;
}

export function PressDetails({ presDetaylari, onChange }: PressDetailsProps) {
  const pressOptions = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
        Pres Sayısı
      </label>
      <select
        value={presDetaylari.adet}
        onChange={e => onChange({ ...presDetaylari, adet: e.target.value })}
        className="w-full px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Pres Sayısı Seçin</option>
        {pressOptions.map(count => (
          <option key={count} value={count}>
            {count} Pres
          </option>
        ))}
      </select>
    </div>
  );
}