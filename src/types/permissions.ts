export enum Permission {
  // Gelir/Gider
  VIEW_TRANSACTIONS = 'view_transactions',
  MANAGE_TRANSACTIONS = 'manage_transactions',

  // Müşteriler
  VIEW_CUSTOMERS = 'view_customers',
  MANAGE_CUSTOMERS = 'manage_customers',

  // Siparişler
  VIEW_ORDERS = 'view_orders',
  MANAGE_ORDERS = 'manage_orders',

  // Çekler
  VIEW_CHECKS = 'view_checks',
  MANAGE_CHECKS = 'manage_checks',

  // Son İşlemler
  VIEW_ACTIVITIES = 'view_activities',

  // Kullanıcılar
  VIEW_USERS = 'view_users',
  MANAGE_USERS = 'manage_users',

  // Ayarlar
  MANAGE_SETTINGS = 'manage_settings'
}

export interface RolePermissions {
  [Permission.VIEW_TRANSACTIONS]: boolean;
  [Permission.MANAGE_TRANSACTIONS]: boolean;
  [Permission.VIEW_CUSTOMERS]: boolean;
  [Permission.MANAGE_CUSTOMERS]: boolean;
  [Permission.VIEW_ORDERS]: boolean;
  [Permission.MANAGE_ORDERS]: boolean;
  [Permission.VIEW_CHECKS]: boolean;
  [Permission.MANAGE_CHECKS]: boolean;
  [Permission.VIEW_ACTIVITIES]: boolean;
  [Permission.VIEW_USERS]: boolean;
  [Permission.MANAGE_USERS]: boolean;
  [Permission.MANAGE_SETTINGS]: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: RolePermissions;
}

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'administrator',
    name: 'Yönetici',
    permissions: Object.values(Permission).reduce((acc, permission) => ({
      ...acc,
      [permission]: true
    }), {} as RolePermissions)
  },
  {
    id: 'manager',
    name: 'Müdür',
    permissions: {
      [Permission.VIEW_TRANSACTIONS]: true,
      [Permission.MANAGE_TRANSACTIONS]: true,
      [Permission.VIEW_CUSTOMERS]: true,
      [Permission.MANAGE_CUSTOMERS]: true,
      [Permission.VIEW_ORDERS]: true,
      [Permission.MANAGE_ORDERS]: true,
      [Permission.VIEW_CHECKS]: true,
      [Permission.MANAGE_CHECKS]: true,
      [Permission.VIEW_ACTIVITIES]: true,
      [Permission.VIEW_USERS]: true,
      [Permission.MANAGE_USERS]: false,
      [Permission.MANAGE_SETTINGS]: false
    }
  },
  {
    id: 'supervisor',
    name: 'Süpervizör',
    permissions: {
      [Permission.VIEW_TRANSACTIONS]: true,
      [Permission.MANAGE_TRANSACTIONS]: false,
      [Permission.VIEW_CUSTOMERS]: true,
      [Permission.MANAGE_CUSTOMERS]: false,
      [Permission.VIEW_ORDERS]: true,
      [Permission.MANAGE_ORDERS]: true,
      [Permission.VIEW_CHECKS]: true,
      [Permission.MANAGE_CHECKS]: true,
      [Permission.VIEW_ACTIVITIES]: true,
      [Permission.VIEW_USERS]: true,
      [Permission.MANAGE_USERS]: false,
      [Permission.MANAGE_SETTINGS]: false
    }
  },
  {
    id: 'accounting',
    name: 'Muhasebe',
    permissions: {
      [Permission.VIEW_TRANSACTIONS]: true,
      [Permission.MANAGE_TRANSACTIONS]: true,
      [Permission.VIEW_CUSTOMERS]: true,
      [Permission.MANAGE_CUSTOMERS]: false,
      [Permission.VIEW_ORDERS]: true,
      [Permission.MANAGE_ORDERS]: false,
      [Permission.VIEW_CHECKS]: true,
      [Permission.MANAGE_CHECKS]: true,
      [Permission.VIEW_ACTIVITIES]: true,
      [Permission.VIEW_USERS]: false,
      [Permission.MANAGE_USERS]: false,
      [Permission.MANAGE_SETTINGS]: false
    }
  },
  {
    id: 'authorized_employee',
    name: 'Yetkili Personel',
    permissions: {
      [Permission.VIEW_TRANSACTIONS]: true,
      [Permission.MANAGE_TRANSACTIONS]: false,
      [Permission.VIEW_CUSTOMERS]: true,
      [Permission.MANAGE_CUSTOMERS]: false,
      [Permission.VIEW_ORDERS]: true,
      [Permission.MANAGE_ORDERS]: false,
      [Permission.VIEW_CHECKS]: true,
      [Permission.MANAGE_CHECKS]: false,
      [Permission.VIEW_ACTIVITIES]: true,
      [Permission.VIEW_USERS]: false,
      [Permission.MANAGE_USERS]: false,
      [Permission.MANAGE_SETTINGS]: false
    }
  }
];