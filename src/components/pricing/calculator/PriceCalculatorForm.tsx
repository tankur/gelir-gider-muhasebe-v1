import React from 'react';
import { Tag, Package, Building2 } from 'lucide-react';
import { BeadworkSection } from './sections/BeadworkSection';
import { StoneSection } from './sections/StoneSection';
import { ProductionSection } from './sections/ProductionSection';
import { ProfitSection } from './sections/ProfitSection';
import { AdditionalPriceSection } from './sections/AdditionalPriceSection';
import { useCustomers } from '../../../hooks/useCustomers';

interface PriceCalculatorFormProps {
  formData: any;
  onChange: (data: any) => void;
  onCalculate: (data: any) => void;
}

export function PriceCalculatorForm({ formData, onChange, onCalculate }: PriceCalculatorFormProps) {
  const { customers } = useCustomers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Müşteri Seçimi */}
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={formData.customerId || ''}
          onChange={e => onChange({ ...formData, customerId: e.target.value })}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Müşteri Seçin</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.companyName ? `${customer.companyName} - ${customer.name}` : customer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Kodu ve İş Adedi */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.modelKodu}
            onChange={e => onChange({ ...formData, modelKodu: e.target.value })}
            placeholder="Model Kodu"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={formData.isAdedi}
            onChange={e => onChange({ ...formData, isAdedi: e.target.value })}
            placeholder="İş Adedi"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <ProductionSection
        formData={formData}
        onChange={onChange}
      />

      <BeadworkSection
        formData={formData}
        onChange={onChange}
      />

      <StoneSection
        formData={formData}
        onChange={onChange}
      />

      <AdditionalPriceSection
        additionalPrices={formData.additionalPrices || []}
        onChange={(prices) => onChange({ ...formData, additionalPrices: prices })}
      />

      <ProfitSection
        formData={formData}
        onChange={onChange}
      />

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Fiyat Hesapla
        </button>
      </div>
    </form>
  );
}