import { useLocalStorage } from './useLocalStorage';
import { StonePrice } from '../types/pricing';
import { useStoneColors } from './useStoneColors';
import { STONE_TYPE_SIZES } from '../constants/stoneSizes';

export function useStonePrices() {
  const [stones, setStones] = useLocalStorage<StonePrice[]>('stone-prices', []);
  const { colors } = useStoneColors();

  const addStone = (stone: Omit<StonePrice, 'id'>) => {
    setStones(prev => [...prev, { ...stone, id: Date.now() }]);
  };

  const updateStone = (id: number, stone: Partial<StonePrice>) => {
    setStones(prev => prev.map(s => s.id === id ? { ...s, ...stone } : s));
  };

  const deleteStone = (id: number) => {
    setStones(prev => prev.filter(s => s.id !== id));
  };

  const getStonesByType = (type: 'dmc' | 'duble' | 'spaciel') => {
    return stones.filter(s => s.type === type);
  };

  const ensureDefaultPrices = () => {
    const newStones: StonePrice[] = [];
    let hasChanges = false;

    for (const type of ['dmc', 'duble', 'spaciel'] as const) {
      for (const color of colors) {
        for (const size of STONE_TYPE_SIZES[type]) {
          const exists = stones.some(s => 
            s.type === type && 
            s.color === color && 
            s.size === size
          );

          if (!exists) {
            hasChanges = true;
            newStones.push({
              id: Date.now() + newStones.length,
              type,
              color,
              size,
              price: 1,
              currency: 'USD',
              unit: type === 'spaciel' ? 'adet' : '144 adet (1 Gros)'
            });
          }
        }
      }
    }

    if (hasChanges) {
      setStones(prev => [...prev, ...newStones]);
    }
  };

  return {
    stones,
    addStone,
    updateStone,
    deleteStone,
    getStonesByType,
    ensureDefaultPrices
  };
}