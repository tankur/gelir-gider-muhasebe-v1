import React, { useState, useEffect } from 'react';
import { RefreshCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ExchangeRates as RatesType, fetchExchangeRates, useExchangeRatesPolling } from '../../services/exchangeRates';
import { formatDateTime } from '../../utils/format';

export function ExchangeRates() {
  const [rates, setRates] = useState<RatesType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { startPolling, stopPolling } = useExchangeRatesPolling((newRates) => {
      setRates(newRates);
      setLoading(false);
    });

    startPolling();
    return () => stopPolling();
  }, []);

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

  const handleRefresh = async () => {
    setLoading(true);
    const newRates = await fetchExchangeRates();
    setRates(newRates);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
        {rates?.rates.map(rate => (
          <div key={rate.code} className="flex items-center space-x-2">
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
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Son güncelleme: {rates ? formatDateTime(new Date(rates.timestamp).toISOString()) : '-'}
        </span>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 disabled:opacity-50 transition-colors"
          title="Kurları Güncelle"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
}