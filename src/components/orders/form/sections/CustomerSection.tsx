import React from 'react';
import { Building2, Tag, Calendar } from 'lucide-react';

interface CustomerSectionProps {
  customerId: string;
  modelKodu: string;
  orderDate: string;
  customers: any[];
  onChange: (field: string, value: any) => void;
}

export function CustomerSection({ customerId, modelKodu, orderDate, customers, onChange }: CustomerSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Müşteri Seçimi */}
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={customerId}
          onChange={e => onChange('customerId', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Model Kodu */}
      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={modelKodu}
          onChange={e => onChange('modelKodu', e.target.value)}
          placeholder="Model Kodu"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Tarih */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="date"
          value={orderDate}
          onChange={e => onChange('orderDate', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
}