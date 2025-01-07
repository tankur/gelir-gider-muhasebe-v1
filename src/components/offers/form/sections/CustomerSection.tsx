import React from 'react';
import { Building2, Calendar } from 'lucide-react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

interface CustomerSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function CustomerSection({ formData, onChange }: CustomerSectionProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === Number(customerId));
    if (customer) {
      onChange('customerId', customerId);
      onChange('customerName', customer.name);
      onChange('companyName', customer.companyName);
      onChange('currency', customer.currency || 'TRY');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Müşteri Bilgileri
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={formData.customerId || ''}
            onChange={e => handleCustomerChange(e.target.value)}
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

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={formData.validUntil || ''}
            onChange={e => onChange('validUntil', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
    </div>
  );
}