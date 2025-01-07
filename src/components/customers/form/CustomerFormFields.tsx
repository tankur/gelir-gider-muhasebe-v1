import React from 'react';
import { Building2, User, Phone, Mail, MapPin, Coins } from 'lucide-react';

interface CustomerFormFieldsProps {
  formData: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    currency: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CustomerFormFields({ formData, onChange }: CustomerFormFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Firma Adı (Opsiyonel) */}
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={formData.companyName}
          onChange={e => onChange('companyName', e.target.value)}
          placeholder="Firma Adı (Opsiyonel)"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Ad Soyad */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={formData.name}
          onChange={e => onChange('name', e.target.value)}
          placeholder="Ad Soyad"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* İletişim Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={e => onChange('phone', e.target.value)}
            placeholder="Telefon"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                     rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="E-posta (Opsiyonel)"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                     rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Para Birimi */}
      <div className="relative">
        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={formData.currency}
          onChange={e => onChange('currency', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="TRY">Türk Lirası (TL)</option>
          <option value="USD">Amerikan Doları (USD)</option>
        </select>
      </div>

      {/* Adres */}
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          value={formData.address}
          onChange={e => onChange('address', e.target.value)}
          placeholder="Adres (Opsiyonel)"
          rows={3}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}