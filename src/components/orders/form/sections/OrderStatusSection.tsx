import React, { useState } from 'react';
import { FileText, Zap, Palette } from 'lucide-react';

interface OrderStatusSectionProps {
  status: string;
  lazerKesim: 'var' | 'yok';
  renkVaryanti: string;
  onChange: (field: string, value: any) => void;
}

export function OrderStatusSection({
  status,
  lazerKesim,
  renkVaryanti,
  onChange
}: OrderStatusSectionProps) {
  const [customStatus, setCustomStatus] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'other') {
      setCustomStatus('');
    } else {
      onChange('status', value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sipariş Durumu */}
      <div className="relative">
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sipariş Durumu Seçin</option>
          <option value="drawing">Çizim Yapılıyor</option>
          <option value="molding">Kalıp Çıkarılıyor</option>
          <option value="laser_cutting">Lazer Kesimde</option>
          <option value="pressing">Preste</option>
          <option value="ironing">Ütüde</option>
          <option value="conveyor">Konveyörde</option>
          <option value="beading">Çakımda</option>
          <option value="glue_machine">Tutkal Makinesinde</option>
          <option value="other">Diğer</option>
        </select>
        {status === 'other' && (
          <input
            type="text"
            value={customStatus}
            onChange={(e) => {
              setCustomStatus(e.target.value);
              onChange('status', e.target.value);
            }}
            placeholder="Durum Giriniz"
            className="mt-2 w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                     rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
      </div>

      {/* Lazer Kesim */}
      <div className="relative">
        <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={lazerKesim}
          onChange={e => onChange('lazerKesim', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Lazer Kesim Yok</option>
          <option value="var">Lazer Kesim Var</option>
        </select>
      </div>

      {/* Renk Varyantı */}
      <div className="relative">
        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={renkVaryanti}
          onChange={e => onChange('renkVaryanti', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Renk Varyantı Yok</option>
          <option value="renge-renk">Renge Renk</option>
          <option value="sabit-renk">Sabit Renk</option>
        </select>
      </div>
    </div>
  );
}