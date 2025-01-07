import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { BEAD_SIZES } from '../../../../utils/beadCalculations';

interface BeadworkSectionProps {
  formData: any;
  onChange: (data: any) => void;
}

export function BeadworkSection({ formData, onChange }: BeadworkSectionProps) {
  const handleAddDetail = () => {
    const newDetails = [
      ...formData.cakimDetaylari,
      { id: Date.now(), boy: '', adet: '' }
    ];
    onChange({ ...formData, cakimDetaylari: newDetails });
  };

  const handleRemoveDetail = (id: number) => {
    const newDetails = formData.cakimDetaylari.filter((d: any) => d.id !== id);
    onChange({ ...formData, cakimDetaylari: newDetails });
  };

  const handleDetailChange = (id: number, field: string, value: string) => {
    const newDetails = formData.cakimDetaylari.map((d: any) => 
      d.id === id ? { ...d, [field]: value } : d
    );
    onChange({ ...formData, cakimDetaylari: newDetails });
  };

  const boyutlar = formData.cakimYeri === 'inci' ? BEAD_SIZES.inci : BEAD_SIZES.beyoglu;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Çakım
        </label>
        <select
          value={formData.cakimYeri}
          onChange={e => onChange({ ...formData, cakimYeri: e.target.value })}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="yok">Çakım Yok</option>
          <option value="inci">İnci</option>
          <option value="beyoglu">Beyoğlu</option>
        </select>
      </div>

      {formData.cakimYeri !== 'yok' && (
        <div className="space-y-3">
          {formData.cakimDetaylari.map((detay: any) => (
            <div key={detay.id} className="flex items-center space-x-3">
              <select
                value={detay.boy}
                onChange={e => handleDetailChange(detay.id, 'boy', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Boy Seçin</option>
                {boyutlar.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <input
                type="number"
                value={detay.adet}
                onChange={e => handleDetailChange(detay.id, 'adet', e.target.value)}
                placeholder="Adet"
                className="w-32 px-3 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleRemoveDetail(detay.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
              >
                <Minus size={20} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddDetail}
            className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500 transition-colors"
          >
            <Plus size={20} className="inline-block mr-2" />
            {formData.cakimYeri === 'inci' ? 'İnci Ekle' : 'Beyoğlu Ekle'}
          </button>
        </div>
      )}
    </div>
  );
}