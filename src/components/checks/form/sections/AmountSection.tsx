import React from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';
import { useExchangeRates } from '../../../../hooks/useExchangeRates';

interface AmountSectionProps {
  amount: string | number;
  currency: string;
  exchangeRate: number;
  onChange: (field: string, value: any) => void;
}

export function AmountSection({
  amount,
  currency,
  exchangeRate,
  onChange
}: AmountSectionProps) {
  const { rates } = useExchangeRates();

  const handleCurrencyChange = (newCurrency: string) => {
    let newRate = 1;
    if (newCurrency === 'USD') {
      newRate = rates?.rates.find(r => r.code === 'USD/TRY')?.rate || 1;
    } else if (newCurrency === 'EUR') {
      newRate = rates?.rates.find(r => r.code === 'EUR/TRY')?.rate || 1;
    }

    onChange('currency', newCurrency);
    onChange('exchangeRate', newRate);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <DollarSign className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Tutar Bilgileri</span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Tutar
            </label>
            <input
              type="number"
              value={amount || ''}
              onChange={e => onChange('amount', e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Para Birimi
            </label>
            <select
              value={currency}
              onChange={e => handleCurrencyChange(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="TRY">TL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {currency !== 'TRY' && (
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Kur
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={exchangeRate || ''}
                onChange={e => onChange('exchangeRate', e.target.value)}
                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
                min="0"
                step="0.0001"
              />
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                ≈ {formatCurrency(Number(amount) * exchangeRate, 'TRY')}
              </div>
            </div>
          </div>
        )}

        {/* Live Exchange Rates */}
        {currency !== 'TRY' && rates && (
          <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
            <p>Güncel Kur:</p>
            {rates.rates.map(rate => (
              <p key={rate.code} className="mt-1">
                1 {rate.code.split('/')[0]} = {rate.rate.toFixed(4)} TRY
                <span className={`ml-2 ${
                  rate.trend === 'up' ? 'text-green-500' : 
                  rate.trend === 'down' ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {rate.trend === 'up' ? '↑' : rate.trend === 'down' ? '↓' : '→'} 
                  {rate.change.toFixed(2)}%
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}