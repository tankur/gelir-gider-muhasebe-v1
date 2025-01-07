export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: number;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: string;
  customerId?: number; // Made optional
}