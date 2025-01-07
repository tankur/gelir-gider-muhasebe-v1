import React from 'react';

interface ProductionOptionsProps {
  renkVaryanti: string;
  lazerKesim: 'var' | 'yok';
  onChange: (field: string, value: any) => void;
}

export function ProductionOptions({ renkVaryanti, lazerKesim, onChange }: ProductionOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Renk Varyantı */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
          Renk Varyantı
        </label>
        <select
          value={renkVaryanti}
          onChange={e => onChange('renkVaryanti', e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Renk Varyantı Yok</option>
          <option value="renge-renk">Renge Renk</option>
          <option value="sabit-renk">Sabit Renk</option>
        </select>
      </div>

      {/* Lazer Kesim */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
          Lazer Kesim
        </label>
        <select
          value={lazerKesim}
          onChange={e => onChange('lazerKesim', e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Lazer Kesim Yok</option>
          <option value="var">Lazer Kesim Var</option>
        </select>
      </div>
    </div>
  );
}