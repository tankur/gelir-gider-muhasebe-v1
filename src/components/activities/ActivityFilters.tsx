import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ActivityFiltersProps {
  search: string;
  type: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function ActivityFilters({
  search,
  type,
  onSearchChange,
  onTypeChange
}: ActivityFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="İşlem detayları ile ara..."
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Type Filter */}
      <div className="flex items-center space-x-4">
        <Filter size={20} className="text-gray-500 dark:text-gray-400" />
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="form-select bg-gray-50 dark:bg-[#171717] border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tüm İşlemler</option>
          <option value="transaction">Gelir/Gider</option>
          <option value="customer">Müşteri</option>
          <option value="check">Çek</option>
          <option value="order">Sipariş</option>
          <option value="user">Kullanıcı</option>
        </select>
      </div>
    </div>
  );
}