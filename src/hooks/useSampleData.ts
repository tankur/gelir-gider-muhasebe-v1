import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Transaction, TransactionType } from '../types/transaction';
import { Check } from '../types/check';
import { Order } from '../types/order';

export function useSampleData() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [customers, setCustomers] = useLocalStorage<any[]>('customers', []);
  const [checks, setChecks] = useLocalStorage<Check[]>('checks', []);
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);

  useEffect(() => {
    // Initialize sample data only if no data exists
    if (transactions.length === 0) {
      setTransactions([
        {
          id: 1,
          type: TransactionType.INCOME,
          category: 'Satış',
          description: 'Ürün satışı',
          amount: 5000,
          date: '2024-03-15'
        },
        {
          id: 2,
          type: TransactionType.EXPENSE,
          category: 'Faturalar',
          description: 'Elektrik faturası',
          amount: 750,
          date: '2024-03-10'
        }
      ]);
    }

    if (customers.length === 0) {
      setCustomers([
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          phone: '0532 111 2233',
          email: 'ahmet@example.com'
        },
        {
          id: 2,
          name: 'Ayşe Demir',
          phone: '0533 444 5566',
          email: 'ayse@example.com'
        }
      ]);
    }

    if (checks.length === 0) {
      setChecks([
        {
          id: 1,
          customerId: 1,
          customerName: 'Ahmet Yılmaz',
          amount: 10000,
          dueDate: '2024-04-15',
          status: 'pending'
        }
      ]);
    }

    if (orders.length === 0) {
      setOrders([
        {
          id: 1,
          customerId: 2,
          customerName: 'Ayşe Demir',
          companyName: 'Demir Ltd.',
          items: [
            {
              id: 1,
              productCode: 'PRD001',
              productName: 'Laptop',
              quantity: 2,
              price: 15000
            }
          ],
          totalAmount: 30000,
          status: 'processing',
          orderDate: '2024-03-01'
        }
      ]);
    }
  }, []);
}