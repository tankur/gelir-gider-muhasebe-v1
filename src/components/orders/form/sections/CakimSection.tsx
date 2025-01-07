import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { CakimDetail } from '../../../../types/order';

const INCI_BOYUTLARI = ['4mm', '5mm', '6mm', '8mm', '10mm'];
const BEYOGLU_BOYUTLARI = ['SS25', 'SS30', 'SS35', '10mm', '12mm', '15mm', '18mm'];

interface CakimSectionProps {
  cakimYeri: string;
  detaylar: CakimDetail[];
  onChange: (detaylar: CakimDetail[]) => void;
}

export function CakimSection({ cakimYeri, detaylar, onChange }: CakimSectionProps) {
  const boyutlar = cakimYeri === 'inci' ? INCI_BOYUTLARI : BEYOGLU_BOYUTLARI;

  const handleAdd = () => {
    onChange([...detaylar, { id: Date.now(), boy: '', adet: '' }]);
  };

  const handleDelete = (id: number) => {
    onChange(detaylar.filter(d => d.id !== id));
  };

  const handleUpdate = (index: number, field: string, value: string) => {
    const newDetaylar = [...detaylar];
    newDetaylar[index] = { ...newDetaylar[index], [field]: value };
    onChange(newDetaylar);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {cakimYeri === 'inci' ? 'İnci' : 'Beyoğlu'} Detayları
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus size={14} className="mr-1.5" />
          {cakimYeri === 'inci' ? 'İnci Ekle' : 'Beyoğlu Ekle'}
        </button>
      </div>

      <div className="space-y-3">
        {detaylar.map((detay, index) => (
          <div key={detay.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Boy</label>
                <select
                  value={detay.boy}
                  onChange={e => handleUpdate(index, 'boy', e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Boy Seçin</option>
                  {boyutlar.map(boy => (
                    <option key={boy} value={boy}>{boy}</option>
                  ))}
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adet</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={detay.adet}
                    onChange={e => handleUpdate(index, 'adet', e.target.value)}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Adet"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(detay.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>

              {detay.boy === 'diger' && (
                <div className="col-span-12 mt-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Özel Boy
                  </label>
                  <input
                    type="text"
                    placeholder="Boy Girin"
                    onChange={e => handleUpdate(index, 'boy', e.target.value)}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {detaylar.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Henüz detay eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}