import React from 'react';
import { Minus } from 'lucide-react';
import { StoneDetail } from '../../../../../types/order';
import { calculateStoneNeeds } from '../../../../../utils/stoneCalculations';

interface StoneDetailRowProps {
  detail: StoneDetail;
  index: number;
  onUpdate: (index: number, field: string, value: string) => void;
  onDelete: (id: number) => void;
  productCount: number;
}

export function StoneDetailRow({ detail, index, onUpdate, onDelete, productCount }: StoneDetailRowProps) {
  const calculation = detail.boyut && detail.adet && productCount ? 
    calculateStoneNeeds(detail.boyut, Number(detail.adet), productCount) : null;

  return (
    <div className="p-4 bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Taş Cinsi */}
        <div className="sm:col-span-3">
          <select
            value={detail.tasCinsi}
            onChange={e => onUpdate(index, 'tasCinsi', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                     shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="dmc">DMC</option>
            <option value="duble">Duble</option>
            <option value="kare">Kare</option>
            <option value="spaciel">Spaciel</option>
          </select>
        </div>

        {/* Boyut */}
        <div className="sm:col-span-3">
          <select
            value={detail.boyut}
            onChange={e => onUpdate(index, 'boyut', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                     shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Boyut</option>
            <option value="SS6">SS6</option>
            <option value="SS10">SS10</option>
            <option value="SS16">SS16</option>
            <option value="SS20">SS20</option>
            <option value="SS30">SS30</option>
          </select>
        </div>

        {/* Renk */}
        <div className="sm:col-span-3">
          <select
            value={detail.renk}
            onChange={e => onUpdate(index, 'renk', e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                     shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Renk</option>
            <option value="Cristal Jet">Cristal Jet</option>
            <option value="Jethematit">Jethematit</option>
            <option value="Siam">Siam</option>
            <option value="Lt Siam">Lt Siam</option>
            <option value="Colorado">Colorado</option>
            <option value="Lt Colorado">Lt Colorado</option>
            <option value="Amatis">Amatis</option>
            <option value="Lt Amatis">Lt Amatis</option>
          </select>
        </div>

        {/* Adet ve Sil Butonu */}
        <div className="sm:col-span-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={detail.adet}
              onChange={e => onUpdate(index, 'adet', e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                       shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Adet"
            />
            <button
              type="button"
              onClick={() => onDelete(detail.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
            >
              <Minus size={16} />
            </button>
          </div>
        </div>

        {/* Paket Bilgisi */}
        {calculation && (
          <div className="sm:col-span-12 mt-2">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Toplam İhtiyaç: {calculation.packageCount > 0 && `${calculation.packageCount} paket`}
              {calculation.packageCount > 0 && calculation.remainingGross > 0 && ' + '}
              {calculation.remainingGross > 0 && `${calculation.remainingGross} gros`}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({calculation.totalPieces.toLocaleString()} adet)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}