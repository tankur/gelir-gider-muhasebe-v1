import React from 'react';
import { Plus, Minus, DollarSign } from 'lucide-react';

interface AdditionalPrice {
  id: number;
  name: string;
  amount: string;
}

interface AdditionalPriceSectionProps {
  additionalPrices: AdditionalPrice[];
  onChange: (prices: AdditionalPrice[]) => void;
}

export function AdditionalPriceSection({ additionalPrices, onChange }: AdditionalPriceSectionProps) {
  const handleAdd = () => {
    onChange([
      ...additionalPrices,
      { id: Date.now(), name: '', amount: '' }
    ]);
  };

  const handleRemove = (id: number) => {
    onChange(additionalPrices.filter(price => price.id !== id));
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    onChange(additionalPrices.map(price => 
      price.id === id ? { ...price, [field]: value } : price
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Ek Fiyatlar</h3>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} className="mr-1" />
          Ek Fiyat Ekle
        </button>
      </div>

      {additionalPrices.map(price => (
        <div key={price.id} className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-7">
            <input
              type="text"
              value={price.name}
              onChange={e => handleUpdate(price.id, 'name', e.target.value)}
              placeholder="Ek Fiyat Adı"
              className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-4">
            <div className="relative">
              <input
                type="number"
                value={price.amount}
                onChange={e => handleUpdate(price.id, 'amount', e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">₺</span>
            </div>
          </div>
          <div className="col-span-1">
            <button
              type="button"
              onClick={() => handleRemove(price.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
            >
              <Minus size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}