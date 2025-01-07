import { useLocalStorage } from './useLocalStorage';
import { StoneType } from '../types/pricing';
import { DEFAULT_STONE_TYPES } from '../constants/stoneTypes';

export function useStoneTypes() {
  const [stoneTypes, setStoneTypes] = useLocalStorage<StoneType[]>(
    'stone-types', 
    DEFAULT_STONE_TYPES
  );

  const addType = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (stoneTypes.some(type => type.id === id)) {
      throw new Error('Bu taş türü zaten mevcut!');
    }
    setStoneTypes([...stoneTypes, { id, name, sizes: [] }]);
  };

  const updateType = (id: string, newName: string) => {
    const newId = newName.toLowerCase().replace(/\s+/g, '-');
    if (stoneTypes.some(type => type.id === newId && type.id !== id)) {
      throw new Error('Bu taş türü zaten mevcut!');
    }
    setStoneTypes(types => types.map(type => 
      type.id === id ? { ...type, id: newId, name: newName } : type
    ));
  };

  const deleteType = (id: string) => {
    const type = stoneTypes.find(t => t.id === id);
    if (type?.isFixed) {
      throw new Error('Sabit taş türleri silinemez!');
    }
    setStoneTypes(types => types.filter(type => type.id !== id));
  };

  const addSize = (typeId: string, size: string) => {
    setStoneTypes(types => types.map(type => {
      if (type.id === typeId && !type.sizes.includes(size)) {
        return { ...type, sizes: [...type.sizes, size] };
      }
      return type;
    }));
  };

  const removeSize = (typeId: string, size: string) => {
    setStoneTypes(types => types.map(type => {
      if (type.id === typeId) {
        return { ...type, sizes: type.sizes.filter(s => s !== size) };
      }
      return type;
    }));
  };

  return {
    stoneTypes,
    addType,
    updateType,
    deleteType,
    addSize,
    removeSize
  };
}