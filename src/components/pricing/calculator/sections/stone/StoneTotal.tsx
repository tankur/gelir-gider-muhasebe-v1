import React from 'react';
import { Calculator } from 'lucide-react';
import { useStonePricing } from '../../../../../hooks/useStonePricing';
import { formatCurrency } from '../../../../../utils/format';

interface StoneTotalProps {
  stones: any[];
}

export function StoneTotal({ stones }: StoneTotalProps) {
  const { calculateStoneTotal } = useStonePricing();

  const totalCost = stones.reduce((sum, stone) => {
    if (!stone.tasCinsi || !stone.boyut || !stone.renk || !stone.adet) return sum;
    return sum + calculateStoneTotal(stone.tasCinsi, stone.boyut, stone.renk, Number(stone.adet));
  }, 0);

  if (totalCost === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
      <div className="flex items-center space-x-2 mb-2">
        <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Toplam Taş Maliyeti
        </h3>
      </div>
      <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
        {formatCurrency(totalCost)}
      </div>
    </div>
  );
}