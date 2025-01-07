import React from 'react';
import { DateFields } from './fields/DateFields';
import { AmountFields } from './fields/AmountFields';
import { BankFields } from './fields/BankFields';
import { DocumentFields } from './fields/DocumentFields';

interface CheckFormFieldsProps {
  formData: {
    customerId: number | string;
    documentNumber: string;
    status: string;
    receiveDate: string;
    dueDate: string;
    amount: string | number;
    currency: string;
    bankName?: string;
    description?: string;
  };
  customers: any[];
  onChange: (field: string, value: any) => void;
}

export function CheckFormFields({ formData, customers, onChange }: CheckFormFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Customer Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Müşteri</label>
        <select
          value={formData.customerId}
          onChange={e => onChange('customerId', Number(e.target.value))}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Document Number and Status */}
      <DocumentFields
        documentNumber={formData.documentNumber}
        status={formData.status}
        onChange={onChange}
      />

      {/* Dates */}
      <DateFields
        receiveDate={formData.receiveDate}
        dueDate={formData.dueDate}
        onChange={onChange}
      />

      {/* Amount and Currency */}
      <AmountFields
        amount={formData.amount}
        currency={formData.currency}
        onChange={onChange}
      />

      {/* Bank and Description */}
      <BankFields
        bankName={formData.bankName || ''}
        description={formData.description || ''}
        onChange={onChange}
      />
    </div>
  );
}