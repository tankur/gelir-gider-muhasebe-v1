import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { StonePrice } from '../types/pricing';
import { DEFAULT_STONE_COLORS } from '../constants/stoneColors';
import { STONE_TYPE_SIZES } from '../constants/stoneSizes';

export function useInitializeStones() {
  const [stones, setStones] = useLocalStorage<StonePrice[]>('stone-prices', []);

  useEffect(() => {
    const newStones: StonePrice[] = [];

    // Initialize stones for both DMC and Duble
    for (const type of ['dmc', 'duble'] as const) {
      for (const color of DEFAULT_STONE_COLORS) {
        for (const size of STONE_TYPE_SIZES[type]) {
          const exists = stones.some(s => 
            s.type === type && 
            s.color === color && 
            s.size === size
          );
          
          if (!exists) {
            newStones.push({
              id: Date.now() + newStones.length,
              type,
              color,
              size,
              price: 1,
              currency: 'USD',
              unit: '144 adet (1 Gros)'
            });
          }
        }
      }
    }

    // Only update if we have new stones to add
    if (newStones.length > 0) {
      setStones(prev => [...prev, ...newStones]);
    }
  }, []);
}