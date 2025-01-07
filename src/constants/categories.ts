import { TransactionType } from '../types/transaction';

export const CATEGORIES: Record<TransactionType, string[]> = {
  [TransactionType.INCOME]: [
    'Maaş',
    'Satış',
    'Kira Geliri',
    'Faiz',
    'Diğer Gelirler'
  ],
  [TransactionType.EXPENSE]: [
    'Kira',
    'Faturalar',
    'Market',
    'Ulaşım',
    'Sağlık',
    'Eğitim',
    'Eğlence',
    'Diğer Giderler'
  ]
};