export interface Payment {
  id: number;
  customerId: number;
  amount: number;
  date: string;
  type: 'cash' | 'bank' | 'check';
  reference?: string;
  notes?: string;
}

export interface CustomerStatement {
  customer: {
    id: number;
    name: string;
    companyName?: string;
    phone: string;
    email?: string;
  };
  orders: {
    id: number;
    date: string;
    amount: number;
    status: string;
  }[];
  payments: Payment[];
}