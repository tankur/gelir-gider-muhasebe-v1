import React from 'react';

interface CustomerSectionProps {
  customerId: number;
  orderDate: string;
  customers: any[];
  onChange: (field: string, value: any) => void;
}

export function CustomerSection({ customerId, orderDate, customers, onChange }: CustomerSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-base font-medium text-gray-700">Müşteri</label>
        <select
          value={customerId}
          onChange={e => onChange('customerId', Number(e.target.value))}
          className="w-full h-10 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

      <div>
        <label className="block text-base font-medium text-gray-700">Sipariş Tarihi</label>
        <input
          type="date"
          value={orderDate}
          onChange={e => onChange('orderDate', e.target.value)}
          className="w-full h-10 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>
    </div>
  );
}