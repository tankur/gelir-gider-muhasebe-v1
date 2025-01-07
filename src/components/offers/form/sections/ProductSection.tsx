import React from 'react';
import { Plus, Minus, Package, DollarSign } from 'lucide-react';
import { OfferProduct } from '../../../../types/offer';

interface ProductSectionProps {
  products: OfferProduct[];
  onChange: (products: OfferProduct[]) => void;
}

export function ProductSection({ products, onChange }: ProductSectionProps) {
  const handleAdd = () => {
    onChange([
      ...products,
      {
        id: Date.now(),
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0
      }
    ]);
  };

  const handleRemove = (id: number) => {
    onChange(products.filter(p => p.id !== id));
  };

  const handleUpdate = (id: number, field: string, value: any) => {
    onChange(products.map(product => {
      if (product.id === id) {
        const updatedProduct = { ...product, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedProduct.totalPrice = updatedProduct.quantity * updatedProduct.unitPrice;
        }
        return updatedProduct;
      }
      return product;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Ürün/Hizmet Detayları
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus size={14} className="mr-1.5" />
          Ürün Ekle
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={product.name}
                  onChange={e => handleUpdate(product.id, 'name', e.target.value)}
                  placeholder="Ürün/Hizmet Adı"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={product.description || ''}
                  onChange={e => handleUpdate(product.id, 'description', e.target.value)}
                  placeholder="Açıklama"
                  className="w-full px-4 py-3 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={e => handleUpdate(product.id, 'quantity', Number(e.target.value))}
                  placeholder="Miktar"
                  className="w-full px-4 py-3 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>

              <div className="col-span-4 relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={product.unitPrice}
                  onChange={e => handleUpdate(product.id, 'unitPrice', Number(e.target.value))}
                  placeholder="Birim Fiyat"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="col-span-4">
                <input
                  type="text"
                  value={product.totalPrice.toFixed(2)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-neutral-800 rounded-lg text-right font-medium"
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
                >
                  <Minus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Henüz ürün eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}