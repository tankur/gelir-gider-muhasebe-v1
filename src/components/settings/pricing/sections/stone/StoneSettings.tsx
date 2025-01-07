import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StonePrice } from '../../../../../types/pricing';
import { StonePriceForm } from '../../forms/StonePriceForm';
import { StoneColorManager } from './StoneColorManager';
import { StoneSizeManager } from './StoneSizeManager';
import { Tabs, TabList, Tab, TabPanel } from '../../../Tabs';
import { useStonePrices } from '../../../../../hooks/useStonePrices';
import { showSuccess, showError, showConfirm } from '../../../../../utils/alert';
import { useLocalStorage } from '../../../../../hooks/useLocalStorage';
import { StoneColorList } from './StoneColorList';
import { KonikStoneList } from './KonikStoneList';

const STONE_TYPES = ['dmc', 'duble', 'spaciel', 'konik'] as const;

export function StoneSettings() {
  const { stones, addStone, updateStone, deleteStone } = useStonePrices();
  const [stoneSizes] = useLocalStorage<{ [key: string]: string[] }>('stone-type-sizes', {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColorManagerOpen, setIsColorManagerOpen] = useState(false);
  const [isSizeManagerOpen, setIsSizeManagerOpen] = useState(false);
  const [editingStone, setEditingStone] = useState<StonePrice | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = async (stone: StonePrice) => {
    try {
      if (editingStone) {
        await updateStone(editingStone.id, stone);
        showSuccess('Taş fiyatı güncellendi');
      } else {
        await addStone(stone);
        showSuccess('Yeni taş fiyatı eklendi');
      }
      setIsModalOpen(false);
      setEditingStone(null);
    } catch (error) {
      showError('Fiyat kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      'Taş Fiyatını Sil',
      'Bu taş fiyatını silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        await deleteStone(id);
        showSuccess('Taş fiyatı silindi');
      } catch (error) {
        showError('Fiyat silinirken bir hata oluştu');
      }
    }
  };

  const currentType = STONE_TYPES[activeTab];
  const currentStones = stones.filter(s => s.type === currentType);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Taş Fiyatları
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsColorManagerOpen(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40"
          >
            Renkleri Yönet
          </button>
          {(currentType === 'spaciel' || currentType === 'konik') && (
            <button
              onClick={() => setIsSizeManagerOpen(true)}
              className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40"
            >
              Boyutları Yönet
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Yeni Taş Fiyatı
          </button>
        </div>
      </div>

      <Tabs selectedIndex={activeTab} onChange={setActiveTab}>
        <TabList className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {STONE_TYPES.map((type, index) => (
            <Tab
              key={type}
              selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer capitalize"
            >
              {type}
            </Tab>
          ))}
        </TabList>

        {STONE_TYPES.map((type, index) => (
          <TabPanel key={type} selected={activeTab === index}>
            {type === 'konik' ? (
              <KonikStoneList
                stones={stones.filter(s => s.type === type)}
                onEdit={(stone) => {
                  setEditingStone(stone);
                  setIsModalOpen(true);
                }}
              />
            ) : (
              <StoneColorList
                type={type}
                stones={currentStones}
                onEdit={(stone) => {
                  setEditingStone(stone);
                  setIsModalOpen(true);
                }}
              />
            )}
          </TabPanel>
        ))}
      </Tabs>

      {isModalOpen && (
        <StonePriceForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingStone(null);
          }}
          initialData={editingStone}
          stoneType={currentType}
        />
      )}

      {isColorManagerOpen && (
        <StoneColorManager
          onClose={() => setIsColorManagerOpen(false)}
        />
      )}

      {isSizeManagerOpen && (
        <StoneSizeManager
          type={currentType}
          onClose={() => setIsSizeManagerOpen(false)}
        />
      )}
    </div>
  );
}

export default StoneSettings;