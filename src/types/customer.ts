export interface Customer {
  id: number;
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  address?: string;
  currency?: 'TRY' | 'USD';
  logo?: string;
}