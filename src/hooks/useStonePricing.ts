import { useLocalStorage } from './useLocalStorage';
import { StonePrice } from '../types/pricing';

export function useStonePricing() {
  const [stonePrices] = useLocalStorage<StonePrice[]>('stone-prices', []);

  const getStonePrice = (type: string, size: string, color: string): StonePrice | undefined => {
    return stonePrices.find(stone => 
      stone.type === type && 
      stone.size === size && 
      stone.color === color
    );
  };

  const calculateStoneTotal = (type: string, size: string, color: string, quantity: number): number => {
    const stone = getStonePrice(type, size, color);
    if (!stone) return 0;

    // For DMC and Duble stones, price is per 144 pieces (1 gros)
    if (type === 'dmc' || type === 'duble') {
      const grossNeeded = Math.ceil(quantity / 144);
      return grossNeeded * stone.price;
    }

    // For other stone types, price is per piece
    return quantity * stone.price;
  };

  return {
    stonePrices,
    getStonePrice,
    calculateStoneTotal
  };
}