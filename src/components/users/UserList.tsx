import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { User, UserRole } from '../../types/user';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  const getRoleText = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'Yönetici';
      case UserRole.MANAGER: return 'Müdür';
      case UserRole.USER: return 'Kullanıcı';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kullanıcı Adı</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ad Soyad</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Yetki</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Durum</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.fullName}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === UserRole.ADMIN
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === UserRole.MANAGER
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getRoleText(user.role)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                Henüz kullanıcı bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}