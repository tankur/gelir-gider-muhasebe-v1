import React from 'react';
import { Settings } from 'lucide-react';

interface OrderOptionsSectionProps {
  cakimYeri: string;
  renkVaryanti: string;
  lazerKesim: 'var' | 'yok';
  onChange: (field: string, value: any) => void;
}

export function OrderOptionsSection({
  cakimYeri,
  renkVaryanti,
  lazerKesim,
  onChange
}: OrderOptionsSectionProps) {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Üretim Detayları</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Renk Varyantı */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Renk Varyantı</label>
          <select
            value={renkVaryanti}
            onChange={e => onChange('renkVaryanti', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="yok">Yok</option>
            <option value="renge-renk">Renge Renk</option>
            <option value="sabit-renk">Sabit Renk</option>
          </select>
        </div>

        {/* Lazer Kesim */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Lazer Kesim</label>
          <select
            value={lazerKesim}
            onChange={e => onChange('lazerKesim', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="yok">Yok</option>
            <option value="var">Var</option>
          </select>
        </div>

        {/* Çakım */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Çakım</label>
          <select
            value={cakimYeri}
            onChange={e => onChange('cakimYeri', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="yok">Yok</option>
            <option value="inci">İnci</option>
            <option value="beyoglu">Beyoğlu</option>
          </select>
        </div>
      </div>
    </div>
  );
}