import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { useExchangeRates } from '../../../services/exchangeRates';
import { formatDateTime } from '../../../utils/format';
import { ExchangeRateDisplay } from './ExchangeRateDisplay';

interface ExchangeRatesProps {
  isCompact?: boolean;
}

export function ExchangeRates({ isCompact = false }: ExchangeRatesProps) {
  const { rates, loading } = useExchangeRates();

  const handleRefresh = async () => {
    window.location.reload();
  };

  if (!rates) return null;

  return (
    <div className="flex items-center justify-between space-x-6">
      <div className="flex items-center space-x-6">
        {rates.rates.map(rate => (
          <ExchangeRateDisplay 
            key={rate.code} 
            rate={rate}
            isCompact={isCompact}
          />
        ))}
      </div>
      
      {!isCompact && (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Son güncelleme: {formatDateTime(rates.timestamp)}
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
                     p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 
                     disabled:opacity-50 transition-colors"
            title="Kurları Güncelle"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}