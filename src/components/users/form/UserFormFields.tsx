import React from 'react';
import { User, Mail, Lock, UserCog, ToggleLeft } from 'lucide-react';
import { UserRole } from '../../../types/user';
import { DEFAULT_ROLES } from '../../../types/permissions';

interface UserFormFieldsProps {
  formData: {
    username: string;
    password?: string;
    fullName: string;
    role: UserRole;
    isActive: boolean;
  };
  isNewUser: boolean;
  onChange: (field: string, value: any) => void;
}

export function UserFormFields({ formData, isNewUser, onChange }: UserFormFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Kullanıcı Adı */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={formData.username}
          onChange={e => onChange('username', e.target.value)}
          placeholder="Kullanıcı Adı"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Ad Soyad */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={formData.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          placeholder="Ad Soyad"
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Şifre (Sadece yeni kullanıcı eklerken) */}
      {isNewUser && (
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password || ''}
            onChange={e => onChange('password', e.target.value)}
            placeholder="Şifre"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>
      )}

      {/* Yetki */}
      <div className="relative">
        <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={formData.role}
          onChange={e => onChange('role', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {DEFAULT_ROLES.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Durum */}
      <div className="relative">
        <ToggleLeft className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={formData.isActive.toString()}
          onChange={e => onChange('isActive', e.target.value === 'true')}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="true">Aktif</option>
          <option value="false">Pasif</option>
        </select>
      </div>
    </div>
  );
}