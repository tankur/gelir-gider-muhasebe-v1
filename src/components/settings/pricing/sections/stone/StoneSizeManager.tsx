import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { showSuccess, showError } from '../../../../../utils/alert';

interface StoneSizeManagerProps {
  type: string;
  onClose: () => void;
}

export function StoneSizeManager({ type, onClose }: StoneSizeManagerProps) {
  const [stoneTypes, setStoneTypes] = useLocalStorage<{ [key: string]: string[] }>('stone-type-sizes', {});
  const [newSize, setNewSize] = useState('');

  const currentSizes = stoneTypes[type] || [];

  const handleAddSize = () => {
    if (!newSize.trim()) return;
    if (currentSizes.includes(newSize.trim())) {
      showError('Bu boyut zaten mevcut!');
      return;
    }

    const updatedSizes = [...currentSizes, newSize.trim()];
    setStoneTypes({
      ...stoneTypes,
      [type]: updatedSizes
    });
    setNewSize('');
    showSuccess('Boyut başarıyla eklendi');
  };

  const handleDeleteSize = (size: string) => {
    const updatedSizes = currentSizes.filter(s => s !== size);
    setStoneTypes({
      ...stoneTypes,
      [type]: updatedSizes
    });
    showSuccess('Boyut başarıyla silindi');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white capitalize">
          {type} Taşı Boyutları
        </h2>

        <div className="space-y-4">
          {/* Add New Size */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSize}
              onChange={e => setNewSize(e.target.value)}
              placeholder="Yeni boyut (örn: SS40)"
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddSize}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Size List */}
          <div className="mt-4 space-y-2">
            {currentSizes.map((size, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-900 dark:text-gray-100">{size}</span>
                <button
                  onClick={() => handleDeleteSize(size)}
                  className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}