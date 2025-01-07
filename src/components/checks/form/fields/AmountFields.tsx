import React from 'react';
import { DollarSign } from 'lucide-react';
import { useExchangeRates } from '../../../../hooks/useExchangeRates';
import { formatCurrency } from '../../../../utils/format';

interface AmountFieldsProps {
  amount: string | number;
  currency: string;
  onChange: (field: string, value: any) => void;
}

export function AmountFields({ amount, currency, onChange }: AmountFieldsProps) {
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

  const tryEquivalent = React.useMemo(() => {
    if (currency === 'TRY' || !amount) return null;
    const rate = currency === 'USD' 
      ? rates?.rates.find(r => r.code === 'USD/TRY')?.rate 
      : rates?.rates.find(r => r.code === 'EUR/TRY')?.rate;
    return rate ? Number(amount) * rate : null;
  }, [amount, currency, rates]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={amount}
            onChange={e => onChange('amount', e.target.value)}
            placeholder="Tutar"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="relative">
          <select
            value={currency}
            onChange={e => handleCurrencyChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="TRY">TL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {tryEquivalent && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          ≈ {formatCurrency(tryEquivalent, 'TRY')}
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
  );
}