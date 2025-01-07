import { useLocalStorage } from './useLocalStorage';
import { CustomerTransaction } from '../types/customer';
import { TransactionType } from '../types/transaction';

export function useCustomerTransactions(customerId: number) {
  const [orders] = useLocalStorage<any[]>('orders', []);
  const [payments] = useLocalStorage<any[]>('payments', []);
  const [transactions] = useLocalStorage<any[]>('transactions', []);

  const customerOrders = orders.filter(o => o.customerId === customerId);
  const customerPayments = payments.filter(p => p.customerId === customerId);
  const customerIncomeTransactions = transactions.filter(t => 
    t.type === TransactionType.INCOME && t.customerId === customerId
  );

  const totalOrders = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalPayments = customerPayments.reduce((sum, p) => sum + p.amount, 0) + 
    customerIncomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalOrders - totalPayments;

  const allTransactions: CustomerTransaction[] = [
    ...customerOrders.map(order => ({
      id: order.id,
      type: 'order' as const,
      date: order.orderDate,
      description: `Sipariş #${order.id}`,
      amount: order.totalAmount,
      runningBalance: 0 // Will be calculated below
    })),
    ...customerPayments.map(payment => ({
      id: payment.id,
      type: 'payment' as const,
      date: payment.date,
      description: `Ödeme #${payment.id} - ${payment.type}`,
      amount: -payment.amount,
      runningBalance: 0 // Will be calculated below
    })),
    ...customerIncomeTransactions.map(transaction => ({
      id: transaction.id,
      type: 'payment' as const,
      date: transaction.date,
      description: `Ödeme - ${transaction.category} - ${transaction.description}`,
      amount: -transaction.amount,
      runningBalance: 0 // Will be calculated below
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate running balance
  let runningBalance = 0;
  allTransactions.forEach(transaction => {
    runningBalance += transaction.amount;
    transaction.runningBalance = runningBalance;
  });

  return {
    transactions: allTransactions,
    totalOrders,
    totalPayments,
    balance
  };
}