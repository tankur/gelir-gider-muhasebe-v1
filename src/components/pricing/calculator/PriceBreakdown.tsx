import React from 'react';
import { formatCurrency } from '../../../utils/format';

interface PriceBreakdownProps {
  breakdown: {
    malzemeMaliyeti: number;
    iscilikMaliyeti: number;
    toplamMaliyet: number;
    karOrani: number;
    satisFiyati: number;
  };
}

export function PriceBreakdown({ breakdown }: PriceBreakdownProps) {
  return (
    <div className="space-y-6">
      {/* Maliyet Detayları */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600 dark:text-gray-400">Malzeme Maliyeti</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(breakdown.malzemeMaliyeti)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600 dark:text-gray-400">İşçilik Maliyeti</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(breakdown.iscilikMaliyeti)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Toplam Maliyet</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(breakdown.toplamMaliyet)}
          </span>
        </div>
      </div>

      {/* Kar Detayları */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600 dark:text-gray-400">Kar Oranı</span>
          <span className="font-medium text-gray-900 dark:text-white">
            %{breakdown.karOrani}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600 dark:text-gray-400">Kar Tutarı</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(breakdown.satisFiyati - breakdown.toplamMaliyet)}
          </span>
        </div>
      </div>

      {/* Satış Fiyatı */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-blue-900 dark:text-blue-100">
            Satış Fiyatı
          </span>
          <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {formatCurrency(breakdown.satisFiyati)}
          </span>
        </div>
      </div>
    </div>
  );
}