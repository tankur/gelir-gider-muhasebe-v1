import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface EditStoneTypeModalProps {
  type: string;
  onSubmit: (oldType: string, newType: string) => void;
  onClose: () => void;
  existingTypes: string[];
}

export function EditStoneTypeModal({ type, onSubmit, onClose, existingTypes }: EditStoneTypeModalProps) {
  const [newType, setNewType] = useState(type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.trim()) return;
    
    const formattedType = newType.trim().toLowerCase();
    if (formattedType === type) {
      onClose();
      return;
    }
    
    if (existingTypes.includes(formattedType)) {
      alert('Bu taş türü zaten mevcut!');
      return;
    }
    
    onSubmit(type, formattedType);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center space-x-2 mb-6">
          <Edit2 className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Taş Türünü Düzenle
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yeni Taş Türü Adı
            </label>
            <input
              type="text"
              value={newType}
              onChange={e => setNewType(e.target.value)}
              placeholder="Taş türü adı"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
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
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}