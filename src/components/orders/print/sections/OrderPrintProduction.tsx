import React from 'react';
import { Order } from '../../../../types/order';

interface OrderPrintProductionProps {
  order: Order;
}

export function OrderPrintProduction({ order }: OrderPrintProductionProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Üretim Detayları</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Renk Varyantı</p>
          <p className="font-medium text-gray-900 dark:text-white">{order.renkVaryanti === 'yok' ? '-' : order.renkVaryanti}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Lazer Kesim</p>
          <p className="font-medium text-gray-900 dark:text-white">{order.lazerKesim === 'var' ? 'Var' : 'Yok'}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Çakım</p>
          <p className="font-medium text-gray-900 dark:text-white">{order.cakimYeri === 'yok' ? '-' : order.cakimYeri}</p>
        </div>
      </div>

      {order.cakimYeri !== 'yok' && order.cakimDetaylari && order.cakimDetaylari.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Çakım Detayları</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="py-2">Boy</th>
                <th className="py-2">Adet</th>
              </tr>
            </thead>
            <tbody>
              {order.cakimDetaylari.map((detay, index) => (
                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white">{detay.boy}</td>
                  <td className="py-2 text-gray-900 dark:text-white">{detay.adet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}