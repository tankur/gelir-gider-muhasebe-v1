import React from 'react';
import { StoneDetail } from '../../../../types/order';

interface OrderPrintStonesProps {
  stones: StoneDetail[];
}

export function OrderPrintStones({ stones }: OrderPrintStonesProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Taş Detayları</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
            <th className="py-2">Taş Cinsi</th>
            <th className="py-2">Boyut</th>
            <th className="py-2">Renk</th>
            <th className="py-2">Adet</th>
          </tr>
        </thead>
        <tbody>
          {stones.map((stone, index) => (
            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
              <td className="py-2 text-gray-900 dark:text-white">{stone.tasCinsi}</td>
              <td className="py-2 text-gray-900 dark:text-white">{stone.boyut}</td>
              <td className="py-2 text-gray-900 dark:text-white">{stone.renk}</td>
              <td className="py-2 text-gray-900 dark:text-white">{stone.adet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}