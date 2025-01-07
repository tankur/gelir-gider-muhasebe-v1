import React from 'react';
import { Settings, Plus, Minus, Palette } from 'lucide-react';
import { BEAD_SIZES, calculateBeadNeeds } from '../../../../utils/beadCalculations';
import { BeadTotalsSummary } from './bead/BeadTotalsSummary';

interface BeadDetail {
  id: number;
  boy: string;
  adet: string;
  renk?: string;
}

interface BeadworkSectionProps {
  cakimYeri: string;
  cakimDetaylari: BeadDetail[];
  isAdedi: string;
  onChange: (value: string) => void;
  onDetailAdd: () => void;
  onDetailDelete: (id: number) => void;
  onDetailUpdate: (index: number, field: string, value: string) => void;
}

export function BeadworkSection({ 
  cakimYeri, 
  cakimDetaylari = [],
  isAdedi,
  onChange,
  onDetailAdd,
  onDetailDelete,
  onDetailUpdate
}: BeadworkSectionProps) {
  const productCount = Number(isAdedi) || 0;
  const boyutlar = cakimYeri === 'inci' ? BEAD_SIZES.inci : BEAD_SIZES.beyoglu;

  return (
    <div className="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Çakım Detayı</h3>
        </div>
        {cakimYeri !== 'yok' && (
          <button
            type="button"
            onClick={onDetailAdd}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium 
                     rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={14} className="mr-1.5" />
            {cakimYeri === 'inci' ? 'İnci Ekle' : 'Beyoğlu Ekle'}
          </button>
        )}
      </div>

      <div>
        <select
          value={cakimYeri}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-200"
        >
          <option value="yok">Çakım Yok</option>
          <option value="inci">İnci Çakım</option>
          <option value="beyoglu">Beyoğlu Çakım</option>
        </select>
      </div>

      {cakimYeri !== 'yok' && (
        <>
          <div className="mt-4 space-y-3">
            {cakimDetaylari.map((detay, index) => {
              const calculation = detay.boy && detay.adet && productCount ? 
                calculateBeadNeeds(detay.boy, Number(detay.adet), productCount) : null;

              return (
                <div key={detay.id} className="p-3 bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Boy Seçimi */}
                    <div className="sm:col-span-4">
                      <select
                        value={detay.boy}
                        onChange={e => onDetailUpdate(index, 'boy', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                                 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Boy Seçin</option>
                        {boyutlar.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                        <option value="diger">Diğer</option>
                      </select>
                    </div>

                    {/* Renk Input */}
                    <div className="sm:col-span-4">
                      <div className="relative">
                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={detay.renk || ''}
                          onChange={e => onDetailUpdate(index, 'renk', e.target.value)}
                          placeholder="Renk"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 dark:border-neutral-800 
                                   dark:bg-[#171717] dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Adet Input ve Sil Butonu */}
                    <div className="sm:col-span-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={detay.adet}
                          onChange={e => onDetailUpdate(index, 'adet', e.target.value)}
                          className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                                   shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Adet"
                        />
                        <button
                          type="button"
                          onClick={() => onDetailDelete(detay.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </div>

                    {calculation && (
                      <div className="sm:col-span-12 mt-2">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          İhtiyaç: {calculation.packageCount > 0 && `${calculation.packageCount} paket`}
                          {calculation.remainingPieces > 0 && calculation.packageCount > 0 && ' + '}
                          {calculation.remainingPieces > 0 && `${calculation.remainingPieces} adet`}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            (Toplam: {calculation.totalPieces.toLocaleString()} adet)
                          </span>
                        </div>
                      </div>
                    )}

                    {detay.boy === 'diger' && (
                      <div className="sm:col-span-12">
                        <input
                          type="text"
                          value={detay.boy === 'diger' ? '' : detay.boy}
                          onChange={e => onDetailUpdate(index, 'boy', e.target.value)}
                          className="w-full rounded-lg border-gray-300 dark:border-neutral-800 dark:bg-[#171717] dark:text-gray-200
                                   shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Özel Boy Girin"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {cakimDetaylari.length === 0 && (
              <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                Henüz detay eklenmemiş
              </div>
            )}
          </div>

          {/* Bead Requirements Summary */}
          {cakimDetaylari.length > 0 && productCount > 0 && (
            <BeadTotalsSummary
              cakimDetaylari={cakimDetaylari}
              productCount={productCount}
              cakimYeri={cakimYeri}
            />
          )}
        </>
      )}
    </div>
  );
}