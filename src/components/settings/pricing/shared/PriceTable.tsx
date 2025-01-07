import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { MaterialPrice } from '../../../../types/pricing';

interface Column {
  key: string;
  header: string;
}

interface PriceTableProps {
  data: MaterialPrice[];
  columns: Column[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function PriceTable({ data, columns, onEdit, onDelete }: PriceTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            {columns.map(column => (
              <th key={column.key} className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column.key} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {item[column.key as keyof MaterialPrice]}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}