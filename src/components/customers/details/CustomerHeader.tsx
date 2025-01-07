import React from 'react';
import { ArrowLeft, PrinterIcon } from 'lucide-react';
import { Customer } from '../../../types/customer';

interface CustomerHeaderProps {
  customer: Customer;
  onBack: () => void;
  onPrint: () => void;
}

export function CustomerHeader({ customer, onBack, onPrint }: CustomerHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 print:hidden"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          {customer.companyName && (
            <h1 className="text-2xl font-bold text-gray-800">{customer.companyName}</h1>
          )}
          <p className="text-gray-600">{customer.name}</p>
        </div>
      </div>
      <button
        onClick={onPrint}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center print:hidden"
      >
        <PrinterIcon className="h-5 w-5 mr-2" />
        Yazdır
      </button>
    </div>
  );
}