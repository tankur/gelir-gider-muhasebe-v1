import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { BEAD_COLORS } from '../../../../../constants/beadColors';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';

interface BeadColorManagerProps {
  type: 'inci' | 'beyoglu';
  onClose: () => void;
}

export function BeadColorManager({ type, onClose }: BeadColorManagerProps) {
  const [colors, setColors] = useLocalStorage<string[]>(`${type}-colors`, BEAD_COLORS[type]);
  const [newColor, setNewColor] = useState('');
  const [editingColor, setEditingColor] = useState<{ color: string; value: string } | null>(null);

  const handleAddColor = () => {
    if (!newColor.trim()) return;
    
    try {
      if (colors.includes(newColor.trim())) {
        showError('Bu renk zaten mevcut!');
        return;
      }
      setColors([...colors, newColor.trim()].sort());
      setNewColor('');
      showSuccess('Renk başarıyla eklendi');
    } catch (error) {
      showError('Renk eklenirken bir hata oluştu');
    }
  };

  const handleUpdateColor = (oldColor: string, newColorValue: string) => {
    if (!newColorValue.trim()) return;
    
    try {
      if (colors.includes(newColorValue.trim()) && oldColor !== newColorValue.trim()) {
        showError('Bu renk zaten mevcut!');
        return;
      }
      setColors(prev => prev.map(c => c === oldColor ? newColorValue.trim() : c).sort());
      setEditingColor(null);
      showSuccess('Renk başarıyla güncellendi');
    } catch (error) {
      showError('Renk güncellenirken bir hata oluştu');
    }
  };

  const handleDeleteColor = async (color: string) => {
    const confirmed = await showConfirm(
      'Rengi Sil',
      'Bu rengi silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setColors(prev => prev.filter(c => c !== color));
        showSuccess('Renk başarıyla silindi');
      } catch (error) {
        showError('Renk silinirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {type === 'inci' ? 'İnci' : 'Beyoğlu'} Renkleri
        </h2>

        <div className="space-y-4">
          {/* Add New Color */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              placeholder="Yeni renk adı"
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddColor}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Color List */}
          <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {editingColor?.color === color ? (
                  <input
                    type="text"
                    value={editingColor.value}
                    onChange={e => setEditingColor({ color, value: e.target.value })}
                    onBlur={() => handleUpdateColor(color, editingColor.value)}
                    onKeyPress={e => e.key === 'Enter' && handleUpdateColor(color, editingColor.value)}
                    className="flex-1 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{color}</span>
                )}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editingColor?.color === color 
                      ? setEditingColor(null)
                      : setEditingColor({ color, value: color })}
                    className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteColor(color)}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
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