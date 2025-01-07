import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types/permissions';
import { useLocalStorage } from './useLocalStorage';

export function usePermissions() {
  const { currentUser } = useAuth();
  const [roles] = useLocalStorage('roles', []);

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser) return false;
    
    const userRole = roles.find(role => role.id === currentUser.role);
    if (!userRole) return false;

    return userRole.permissions[permission] || false;
  };

  return { hasPermission };
}