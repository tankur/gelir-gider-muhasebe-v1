import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ExchangeRate } from '../../../services/exchangeRates';

interface ExchangeRateDisplayProps {
  rate: ExchangeRate;
  isCompact?: boolean;
}

export function ExchangeRateDisplay({ rate, isCompact = false }: ExchangeRateDisplayProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isCompact) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{rate.code}:</span>
        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {rate.rate.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{rate.code}:</span>
      <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        {rate.rate.toFixed(4)}
      </span>
      <div className="flex items-center space-x-1">
        {getTrendIcon(rate.trend)}
        <span className={`text-xs ${
          rate.trend === 'up' ? 'text-green-500' : 
          rate.trend === 'down' ? 'text-red-500' : 
          'text-gray-500'
        }`}>
          {rate.change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}