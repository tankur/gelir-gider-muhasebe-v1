import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { BeadPrice } from '../../../../../types/pricing';
import { formatCurrency } from '../../../../../utils/format';

interface BeadPriceListProps {
  prices: BeadPrice[];
  onEdit: (price: BeadPrice) => void;
  onDelete: (id: number) => void;
  type: 'inci' | 'beyoglu';
}

export function BeadPriceList({ prices, onEdit, onDelete, type }: BeadPriceListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Boyut
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Renk
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                Fiyat
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                Para Birimi
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                Paket Adedi
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {prices.map(price => (
              <tr key={price.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {price.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {price.color}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(price.price, price.currency)}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-100">
                  {price.currency}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-100">
                  {Math.round(price.piecesPerKg).toLocaleString()} adet
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(price)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    title="Düzenle"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(price.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {prices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Henüz fiyat bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}