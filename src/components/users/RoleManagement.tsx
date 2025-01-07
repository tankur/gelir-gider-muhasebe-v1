import React, { useState } from 'react';
import { Role, DEFAULT_ROLES, Permission } from '../../types/permissions';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { RolePermissionsForm } from './RolePermissionsForm';
import { Shield } from 'lucide-react';

export default function RoleManagement() {
  const [roles, setRoles] = useLocalStorage<Role[]>('roles', DEFAULT_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id);

  const selectedRole = roles.find(role => role.id === selectedRoleId);

  const handlePermissionChange = (permission: Permission) => {
    if (!selectedRole) return;

    const updatedRoles = roles.map(role => {
      if (role.id === selectedRole.id) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [permission]: !role.permissions[permission]
          }
        };
      }
      return role;
    });

    setRoles(updatedRoles);
  };

  if (!selectedRole) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Shield className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="form-select rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <RolePermissionsForm
          role={selectedRole}
          onPermissionChange={handlePermissionChange}
        />
      </div>
    </div>
  );
}