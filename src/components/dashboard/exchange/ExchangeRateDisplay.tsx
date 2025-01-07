import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ExchangeRate } from '../../../services/exchangeRates';
import { AnimatedCounter } from '../../stats/AnimatedCounter';

interface ExchangeRateDisplayProps {
  rate: ExchangeRate;
  isCompact?: boolean;
}

export function ExchangeRateDisplay({ rate, isCompact }: ExchangeRateDisplayProps) {
  const getTrendIcon = () => {
    switch (rate.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (rate.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isCompact) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{rate.code}:</span>
        <span className={`text-lg font-semibold ${getTrendColor()}`}>
          <AnimatedCounter value={rate.rate} formatter={(v) => v.toFixed(4)} />
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{rate.code}:</span>
      <span className={`text-lg font-semibold ${getTrendColor()}`}>
        <AnimatedCounter value={rate.rate} formatter={(v) => v.toFixed(4)} />
      </span>
      <div className="flex items-center space-x-1">
        {getTrendIcon()}
        <span className={`text-xs ${getTrendColor()}`}>
          {rate.change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}