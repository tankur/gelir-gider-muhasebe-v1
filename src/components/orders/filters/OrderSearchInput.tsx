import React from 'react';
import { Search } from 'lucide-react';

interface OrderSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrderSearchInput({ value, onChange }: OrderSearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Müşteri adı veya model kodu ile ara..."
        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}