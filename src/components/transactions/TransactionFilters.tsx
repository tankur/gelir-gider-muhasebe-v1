import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TransactionType } from '../../types/transaction';
import { CATEGORIES } from '../../constants/categories';

interface TransactionFiltersProps {
  search: string;
  type: TransactionType | 'all';
  category: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: TransactionType | 'all') => void;
  onCategoryChange: (value: string) => void;
}

export function TransactionFilters({
  search,
  type,
  category,
  onSearchChange,
  onTypeChange,
  onCategoryChange
}: TransactionFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Açıklama, kategori veya müşteri adı ile ara..."
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Filter size={20} className="text-gray-500 dark:text-gray-400" />
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
          className="form-select bg-gray-50 dark:bg-[#171717] border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tüm İşlemler</option>
          <option value={TransactionType.INCOME}>Sadece Gelirler</option>
          <option value={TransactionType.EXPENSE}>Sadece Giderler</option>
        </select>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form-select bg-gray-50 dark:bg-[#171717] border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tüm Kategoriler</option>
          {type !== 'all' && CATEGORIES[type as TransactionType].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}