import React from 'react';
import { Calculator } from 'lucide-react';
import { calculateBeadNeeds } from '../../../../../utils/beadCalculations';

interface BeadTotalsSummaryProps {
  cakimDetaylari: Array<{ id: number; boy: string; adet: string }>;
  productCount: number;
  cakimYeri: string;
}

export function BeadTotalsSummary({ cakimDetaylari, productCount, cakimYeri }: BeadTotalsSummaryProps) {
  const calculateTotals = () => {
    return cakimDetaylari.map(detay => {
      if (!detay.boy || !detay.adet || !productCount) return null;
      
      const calculation = calculateBeadNeeds(
        detay.boy,
        Number(detay.adet),
        productCount
      );

      return {
        ...detay,
        calculation
      };
    }).filter(Boolean);
  };

  const totals = calculateTotals();

  if (totals.length === 0) return null;

  return (
    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
      <div className="flex items-center space-x-2 mb-3">
        <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
          {cakimYeri === 'inci' ? 'İnci' : 'Beyoğlu'} İhtiyaç Özeti
        </h3>
      </div>
      
      <div className="space-y-2">
        {totals.map((detay, index) => (
          <div 
            key={index}
            className="flex justify-between items-center text-sm p-2 bg-white dark:bg-[#171717] rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {detay.boy}:
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {detay.calculation?.packageCount > 0 && (
                <span className="mr-2">{detay.calculation.packageCount} paket</span>
              )}
              {detay.calculation?.remainingPieces > 0 && (
                <span>{detay.calculation.remainingPieces} adet</span>
              )}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                (Toplam: {detay.calculation?.totalPieces.toLocaleString()} adet)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}