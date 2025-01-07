export interface Overtime {
  id: number;
  employeeId: number;
  date: string;
  hours: number;
  rate: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
}