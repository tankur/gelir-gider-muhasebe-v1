import React from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';

interface PricingSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function PricingSection({ formData, onChange }: PricingSectionProps) {
  const calculateTotal = () => {
    return formData.products?.reduce((sum: number, product: any) => sum + product.totalPrice, 0) || 0;
  };

  React.useEffect(() => {
    onChange('totalAmount', calculateTotal());
  }, [formData.products]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Fiyatlandırma
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={formData.currency || 'TRY'}
            onChange={e => onChange('currency', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="TRY">Türk Lirası (₺)</option>
            <option value="USD">Amerikan Doları ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>

        <div className="relative">
          <div className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-neutral-800 rounded-lg text-right font-medium">
            {formatCurrency(calculateTotal(), formData.currency)}
          </div>
        </div>
      </div>
    </div>
  );
}