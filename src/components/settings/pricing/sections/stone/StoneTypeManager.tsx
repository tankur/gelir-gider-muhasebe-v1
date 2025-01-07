import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useStoneTypes } from '../../../../../hooks/useStoneTypes';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';

interface StoneTypeManagerProps {
  onClose: () => void;
}

export function StoneTypeManager({ onClose }: StoneTypeManagerProps) {
  const { stoneTypes, addType, updateType, deleteType } = useStoneTypes();
  const [newType, setNewType] = useState('');
  const [editingType, setEditingType] = useState<{ id: string; name: string } | null>(null);

  const handleAddType = () => {
    if (!newType.trim()) return;
    
    try {
      addType(newType.trim());
      setNewType('');
      showSuccess('Taş türü başarıyla eklendi');
    } catch (error) {
      showError('Bu taş türü zaten mevcut!');
    }
  };

  const handleUpdateType = (id: string, newName: string) => {
    if (!newName.trim()) return;
    
    try {
      updateType(id, newName.trim());
      setEditingType(null);
      showSuccess('Taş türü başarıyla güncellendi');
    } catch (error) {
      showError('Bu taş türü zaten mevcut!');
    }
  };

  const handleDeleteType = async (id: string) => {
    const type = stoneTypes.find(t => t.id === id);
    if (!type) return;

    if (type.isFixed) {
      showError('Bu taş türü silinemez!');
      return;
    }

    const confirmed = await showConfirm(
      'Taş Türünü Sil',
      'Bu taş türünü ve ilgili tüm fiyatları silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        deleteType(id);
        showSuccess('Taş türü başarıyla silindi');
      } catch (error) {
        showError('Taş türü silinirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Taş Türleri
        </h2>

        <div className="space-y-4">
          {/* Add New Type */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newType}
              onChange={e => setNewType(e.target.value)}
              placeholder="Yeni taş türü adı"
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddType}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Type List */}
          <div className="mt-4 space-y-2">
            {stoneTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {editingType?.id === type.id ? (
                  <input
                    type="text"
                    value={editingType.name}
                    onChange={e => setEditingType({ ...editingType, name: e.target.value })}
                    onBlur={() => handleUpdateType(type.id, editingType.name)}
                    onKeyPress={e => e.key === 'Enter' && handleUpdateType(type.id, editingType.name)}
                    className="flex-1 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{type.name}</span>
                )}
                <div className="flex items-center space-x-2">
                  {!type.isFixed && (
                    <>
                      <button
                        onClick={() => editingType?.id === type.id 
                          ? setEditingType(null)
                          : setEditingType({ id: type.id, name: type.name })}
                        className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteType(type.id)}
                        className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
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