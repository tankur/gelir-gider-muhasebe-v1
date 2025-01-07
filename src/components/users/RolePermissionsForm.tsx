import React from 'react';
import { Role, Permission } from '../../types/permissions';
import { Shield, DollarSign, Users, Package, FileCheck, Clock, UserCog, Settings } from 'lucide-react';

interface RolePermissionsFormProps {
  role: Role;
  onPermissionChange: (permission: Permission) => void;
}

export function RolePermissionsForm({ role, onPermissionChange }: RolePermissionsFormProps) {
  const permissionGroups = [
    {
      title: 'Gelir/Gider',
      icon: DollarSign,
      permissions: [
        { key: Permission.VIEW_TRANSACTIONS, label: 'Görüntüleme' },
        { key: Permission.MANAGE_TRANSACTIONS, label: 'Yönetim' }
      ]
    },
    {
      title: 'Müşteriler',
      icon: Users,
      permissions: [
        { key: Permission.VIEW_CUSTOMERS, label: 'Görüntüleme' },
        { key: Permission.MANAGE_CUSTOMERS, label: 'Yönetim' }
      ]
    },
    {
      title: 'Siparişler',
      icon: Package,
      permissions: [
        { key: Permission.VIEW_ORDERS, label: 'Görüntüleme' },
        { key: Permission.MANAGE_ORDERS, label: 'Yönetim' }
      ]
    },
    {
      title: 'Çekler',
      icon: FileCheck,
      permissions: [
        { key: Permission.VIEW_CHECKS, label: 'Görüntüleme' },
        { key: Permission.MANAGE_CHECKS, label: 'Yönetim' }
      ]
    },
    {
      title: 'Son İşlemler',
      icon: Clock,
      permissions: [
        { key: Permission.VIEW_ACTIVITIES, label: 'Görüntüleme' }
      ]
    },
    {
      title: 'Kullanıcılar',
      icon: UserCog,
      permissions: [
        { key: Permission.VIEW_USERS, label: 'Görüntüleme' },
        { key: Permission.MANAGE_USERS, label: 'Yönetim' }
      ]
    },
    {
      title: 'Ayarlar',
      icon: Settings,
      permissions: [
        { key: Permission.MANAGE_SETTINGS, label: 'Yönetim' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
        <Shield className="w-5 h-5" />
        <h3 className="text-lg font-medium">Rol İzinleri</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {permissionGroups.map(group => (
          <div 
            key={group.title}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2 mb-4">
              <group.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-white">{group.title}</h4>
            </div>

            <div className="space-y-3">
              {group.permissions.map(({ key, label }) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={role.permissions[key]}
                    onChange={() => onPermissionChange(key)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}