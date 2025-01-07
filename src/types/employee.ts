export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  position: string;
  salary: number;
  phoneNumber: string;
  email?: string;
  address?: string;
  isActive: boolean;
}

export const DEPARTMENTS = [
  'Üretim',
  'Kalite Kontrol',
  'Tasarım',
  'Satış',
  'Muhasebe',
  'İdari İşler'
] as const;

export const POSITIONS = [
  'İşçi',
  'Usta',
  'Ustabaşı',
  'Teknisyen',
  'Tasarımcı',
  'Satış Temsilcisi',
  'Muhasebeci',
  'İdari Personel',
  'Yönetici'
] as const;