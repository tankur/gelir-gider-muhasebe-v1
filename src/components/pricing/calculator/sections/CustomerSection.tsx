import React from 'react';
import { Building2 } from 'lucide-react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

interface CustomerSectionProps {
  customerId: string | number;
  onChange: (field: string, value: any) => void;
}

export function CustomerSection({ customerId, onChange }: CustomerSectionProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);

  return (
    <div className="relative">
      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <select
        value={customerId}
        onChange={e => onChange('customerId', e.target.value)}
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
  );
}