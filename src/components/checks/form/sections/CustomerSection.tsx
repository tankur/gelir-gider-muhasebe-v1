import React from 'react';
import { Building2 } from 'lucide-react';

interface CustomerSectionProps {
  customerId: number;
  customers: any[];
  onChange: (field: string, value: any) => void;
}

export function CustomerSection({ customerId, customers, onChange }: CustomerSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <Building2 className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Müşteri Bilgileri</span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <select
          value={customerId}
          onChange={e => onChange('customerId', Number(e.target.value))}
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
    </div>
  );
}