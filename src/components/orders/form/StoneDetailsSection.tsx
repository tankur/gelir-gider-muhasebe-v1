import React from 'react';
import { Plus, Minus } from 'lucide-react';

const TAS_BOYUTLARI = ['SS6', 'SS10', 'SS16', 'SS20', 'SS30'];
const TAS_RENKLERI = [
  'Cristal Jet',
  'Jethematit',
  'Siam',
  'Lt Siam',
  'Colorado',
  'Lt Colorado',
  'Amatis',
  'Lt Amatis'
];

interface StoneDetail {
  id: number;
  tasCinsi: string;
  boyut: string;
  renk: string;
  adet: string;
}

interface StoneDetailsSectionProps {
  details: StoneDetail[];
  onAdd: () => void;
  onDelete: (id: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

export function StoneDetailsSection({ details, onAdd, onDelete, onUpdate }: StoneDetailsSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-800">Taş Detayları</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus size={14} className="mr-1.5" />
          Taş Ekle
        </button>
      </div>

      <div className="space-y-3">
        {details.map((detail, index) => (
          <div key={detail.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-12 gap-3">
              {/* Taş Cinsi */}
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Taş Cinsi</label>
                <select
                  value={detail.tasCinsi || 'dmc'}
                  onChange={(e) => onUpdate(index, 'tasCinsi', e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="dmc">DMC</option>
                  <option value="duble">Duble</option>
                  <option value="kare">Kare</option>
                  <option value="spaciel">Spaciel</option>
                </select>
              </div>

              {/* Taş Boyutu */}
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Boyut</label>
                <select
                  value={detail.boyut}
                  onChange={(e) => onUpdate(index, 'boyut', e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Boyut Seçin</option>
                  {TAS_BOYUTLARI.map(boyut => (
                    <option key={boyut} value={boyut}>{boyut}</option>
                  ))}
                  <option value="diger">Diğer</option>
                </select>
              </div>

              {/* Taş Rengi */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
                <select
                  value={detail.renk}
                  onChange={(e) => onUpdate(index, 'renk', e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Renk Seçin</option>
                  {TAS_RENKLERI.map(renk => (
                    <option key={renk} value={renk}>{renk}</option>
                  ))}
                  <option value="diger">Diğer</option>
                </select>
              </div>

              {/* Adet */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adet</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={detail.adet}
                    onChange={(e) => onUpdate(index, 'adet', e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Adet"
                  />
                  <button
                    type="button"
                    onClick={() => onDelete(detail.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>

              {/* Özel değerler için input alanları */}
              {(detail.boyut === 'diger' || detail.renk === 'diger') && (
                <div className="col-span-12 grid grid-cols-2 gap-3 mt-3">
                  {detail.boyut === 'diger' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Özel Boyut
                      </label>
                      <input
                        type="text"
                        onChange={(e) => onUpdate(index, 'boyut', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Boyut Girin"
                      />
                    </div>
                  )}
                  {detail.renk === 'diger' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Özel Renk
                      </label>
                      <input
                        type="text"
                        onChange={(e) => onUpdate(index, 'renk', e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Renk Girin"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {details.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            Henüz taş detayı eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}