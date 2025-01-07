import React from 'react';
import { formatCurrency } from '../../../../utils/format';
import { DollarSign, Package } from 'lucide-react';

interface PriceSectionProps {
  unitPrice: string;
  quantity: string;
  onChange: (field: string, value: string) => void;
}

export function PriceSection({ unitPrice, quantity, onChange }: PriceSectionProps) {
  const totalPrice = Number(unitPrice) * Number(quantity) || 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="h-5 w-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Fiyat Bilgileri</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            İş Adedi
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={quantity}
              onChange={e => onChange('isAdedi', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adet"
              required
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Birim Fiyat
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={unitPrice}
              onChange={e => onChange('unitPrice', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Toplam Tutar
          </label>
          <div className="h-[46px] px-4 flex items-center bg-gray-100 dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}