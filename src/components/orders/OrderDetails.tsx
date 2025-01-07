import React from 'react';
import { Order } from '../../types/order';
import { calculateStoneNeeds, STONE_PACKAGE_SIZES } from '../../utils/stoneCalculations';

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const calculateStoneTotals = () => {
    if (!order.tasDetaylari || !order.isAdedi) return null;
    
    return order.tasDetaylari.map(stone => {
      if (!stone.boyut || !stone.adet) return null;
      
      const calculation = calculateStoneNeeds(
        stone.boyut as keyof typeof STONE_PACKAGE_SIZES,
        Number(stone.adet),
        Number(order.isAdedi)
      );

      return {
        ...stone,
        calculation
      };
    }).filter(Boolean);
  };

  const stoneTotals = calculateStoneTotals();

  return (
    <div className="space-y-6">
      {/* Üretim Detayları */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Üretim Detayları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">İş Adedi</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{order.isAdedi}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Renk Varyantı</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {order.renkVaryanti === 'yok' ? '-' : order.renkVaryanti}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lazer Kesim</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {order.lazerKesim === 'var' ? 'Var' : 'Yok'}
            </p>
          </div>
        </div>
      </div>

      {/* Çakım Detayları */}
      {order.cakimYeri !== 'yok' && order.cakimDetaylari && order.cakimDetaylari.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {order.cakimYeri === 'inci' ? 'İnci' : 'Beyoğlu'} Çakım Detayları
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Boy</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Adet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.cakimDetaylari.map((detay, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{detay.boy}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-gray-100">{detay.adet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Taş Detayları */}
      {order.tasDetaylari && order.tasDetaylari.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Taş Detayları</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Taş Cinsi</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Boyut</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Renk</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Adet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.tasDetaylari.map((tas, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tas.tasCinsi}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tas.boyut}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tas.renk}</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-gray-100">{tas.adet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Taş İhtiyaç Özeti */}
            {stoneTotals && stoneTotals.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                  Taş İhtiyaç Özeti
                </h4>
                <div className="space-y-2">
                  {stoneTotals.map((stone, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center text-sm p-2 bg-white dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {stone.tasCinsi} {stone.boyut} {stone.renk}:
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {stone.calculation?.packageCount > 0 && (
                          <span className="mr-2">{stone.calculation.packageCount} paket</span>
                        )}
                        {stone.calculation?.remainingGross > 0 && (
                          <span>{stone.calculation.remainingGross} gros</span>
                        )}
                        <span className="ml-2 text-xs text-gray-500">
                          ({stone.calculation?.totalPieces.toLocaleString()} adet)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}