export interface Activity {
  id: number;
  userId: number;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'transaction' | 'customer' | 'check' | 'order' | 'user';
}