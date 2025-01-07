export interface Payroll {
  id: number;
  employeeId: number;
  amount: number;
  date: string;
  month: number;
  year: number;
  type: 'salary' | 'bonus' | 'advance';
  description?: string;
}