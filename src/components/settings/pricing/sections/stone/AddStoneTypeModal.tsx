import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AddStoneTypeModalProps {
  onSubmit: (type: string, sizes: string[]) => void;
  onClose: () => void;
  existingTypes: string[];
}

export function AddStoneTypeModal({ onSubmit, onClose, existingTypes }: AddStoneTypeModalProps) {
  const [type, setType] = useState('');
  const [sizes, setSizes] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type.trim()) return;
    
    const formattedType = type.trim().toLowerCase();
    if (existingTypes.includes(formattedType)) {
      alert('Bu taş türü zaten mevcut!');
      return;
    }
    
    onSubmit(formattedType, sizes.filter(s => s.trim()));
  };

  const addSize = () => {
    setSizes([...sizes, '']);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Yeni Taş Türü Ekle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Taş Türü
            </label>
            <input
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder="Taş türü adı"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Boyutlar
              </label>
              <button
                type="button"
                onClick={addSize}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Boyut Ekle
              </button>
            </div>

            {sizes.map((size, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={size}
                  onChange={e => updateSize(index, e.target.value)}
                  placeholder="Örn: SS6, 4mm, vb."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}