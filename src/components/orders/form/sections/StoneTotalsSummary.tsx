import React from 'react';
import { StoneDetail } from '../../../../types/order';
import { calculateStoneNeeds, STONE_PACKAGE_SIZES } from '../../../../utils/stoneCalculations';
import { Calculator } from 'lucide-react';

interface StoneTotalsSummaryProps {
  stones: StoneDetail[];
  productCount: number;
}

export function StoneTotalsSummary({ stones, productCount }: StoneTotalsSummaryProps) {
  const calculateTotals = () => {
    return stones.map(stone => {
      if (!stone.boyut || !stone.adet || !productCount) return null;
      
      const calculation = calculateStoneNeeds(
        stone.boyut as keyof typeof STONE_PACKAGE_SIZES,
        Number(stone.adet),
        productCount
      );

      return {
        ...stone,
        calculation
      };
    }).filter(Boolean);
  };

  const totals = calculateTotals();

  if (totals.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
      <div className="flex items-center space-x-2 mb-3">
        <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Taş İhtiyaç Özeti
        </h3>
      </div>
      
      <div className="space-y-2">
        {totals.map((stone, index) => (
          <div 
            key={index}
            className="flex justify-between items-center text-sm p-2 bg-white dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {stone.tasCinsi} {stone.boyut} {stone.renk}:
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stone.calculation?.packageCount > 0 && (
                <span className="mr-2">{stone.calculation.packageCount} paket</span>
              )}
              {stone.calculation?.remainingGross > 0 && (
                <span>{stone.calculation.remainingGross} gros</span>
              )}
              <span className="ml-2 text-xs text-gray-500">
                ({stone.calculation?.totalPieces.toLocaleString()} adet)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}