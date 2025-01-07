import React from 'react';
import { Eye, Edit2, Trash2, Phone, Mail } from 'lucide-react';
import { Customer } from '../../types/customer';

interface CustomerListProps {
  customers: Customer[];
  onView: (id: number) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

export function CustomerList({ customers, onView, onEdit, onDelete }: CustomerListProps) {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Firma Adı
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              İletişim
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Para Birimi
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map(customer => (
            <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {customer.companyName || '-'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {customer.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Phone size={16} className="mr-2" />
                    {customer.phone}
                  </div>
                  {customer.email && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail size={16} className="mr-2" />
                      {customer.email}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  customer.currency === 'USD' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                }`}>
                  {customer.currency || 'TRY'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView(customer.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  title="Görüntüle"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(customer)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  title="Düzenle"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  title="Sil"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz müşteri bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}