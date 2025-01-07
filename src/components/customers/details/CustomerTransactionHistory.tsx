import React from 'react';
import { formatCurrency } from '../../../utils/format';
import { CustomerTransaction } from '../../../types/customer';

interface CustomerTransactionHistoryProps {
  transactions: CustomerTransaction[];
  totalOrders: number;
  totalPayments: number;
  balance: number;
  currency: string;
}

export function CustomerTransactionHistory({
  transactions,
  totalOrders,
  totalPayments,
  balance,
  currency
}: CustomerTransactionHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">İşlem Geçmişi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Tarih</th>
                <th className="text-left py-3 px-4">İşlem Tipi</th>
                <th className="text-left py-3 px-4">Açıklama</th>
                <th className="text-right py-3 px-4">Tutar</th>
                <th className="text-right py-3 px-4">Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-3 px-4">
                    {new Date(transaction.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'order'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {transaction.type === 'order' ? 'Sipariş' : 'Ödeme'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{transaction.description}</td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    transaction.amount >= 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatCurrency(Math.abs(transaction.amount), currency)}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    transaction.runningBalance >= 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatCurrency(Math.abs(transaction.runningBalance), currency)}
                    <span className="text-xs text-gray-500 ml-1">
                      {transaction.runningBalance >= 0 ? '(Borç)' : '(Alacak)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2">
              <tr className="font-bold">
                <td colSpan={3} className="py-4 px-4">Genel Toplam</td>
                <td className="py-4 px-4 text-right">
                  {formatCurrency(totalOrders, currency)} / {formatCurrency(totalPayments, currency)}
                </td>
                <td className={`py-4 px-4 text-right ${
                  balance >= 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {formatCurrency(Math.abs(balance), currency)}
                  <span className="text-xs text-gray-500 ml-1">
                    {balance >= 0 ? '(Borç)' : '(Alacak)'}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}