import React from 'react';
import { formatCurrency } from '../../../utils/format';

interface CustomerSummaryCardsProps {
  totalOrders: number;
  totalPayments: number;
  balance: number;
  currency: string;
}

export function CustomerSummaryCards({ 
  totalOrders, 
  totalPayments, 
  balance,
  currency
}: CustomerSummaryCardsProps) {
  // Bakiye negatifse müşteri alacaklı, pozitifse borçlu
  const isCustomerOwed = balance < 0;
  const absoluteBalance = Math.abs(balance);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-green-800">Toplam Sipariş</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">
          {formatCurrency(totalOrders, currency)}
        </p>
        <p className="text-sm text-gray-600 mt-1">Alacak</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800">Toplam Ödeme</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">
          {formatCurrency(totalPayments, currency)}
        </p>
        <p className="text-sm text-gray-600 mt-1">Ödendi</p>
      </div>
      <div className={`${isCustomerOwed ? 'bg-red-50' : 'bg-green-50'} p-6 rounded-lg`}>
        <h3 className="text-sm font-medium text-gray-800">Bakiye</h3>
        <p className={`mt-2 text-3xl font-bold ${
          isCustomerOwed ? 'text-red-600' : 'text-green-600'
        }`}>
          {formatCurrency(absoluteBalance, currency)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {isCustomerOwed ? 'Alacak' : 'Borç'}
        </p>
      </div>
    </div>
  );
}