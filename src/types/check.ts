export type CheckStatus = 
  | 'pending'    // Default status for new checks
  | 'printed'    // Check has been printed
  | 'guarantee'  // Provided as bank guarantee
  | 'used'       // Check has been used
  | 'cancelled'  // Check has been cancelled

export type CheckCurrency = 'TRY' | 'USD' | 'EUR';

export interface Check {
  id: number;
  customerId: number;
  customerName: string;
  documentNumber: string;
  receiveDate: string;
  dueDate: string;
  amount: number;
  currency: CheckCurrency;
  exchangeRate: number;
  status: CheckStatus;
  bankName?: string;
  description?: string;
}

export const CHECK_STATUS_LABELS: Record<CheckStatus, string> = {
  pending: 'Beklemede',
  printed: 'Çek Yazdırıldı',
  guarantee: 'Banka Teminatı Olarak Verildi',
  used: 'Kullanıldı',
  cancelled: 'İptal Edildi'
};