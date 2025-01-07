import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ArrowLeft, PrinterIcon } from 'lucide-react';
import { CustomerHeader } from './details/CustomerHeader';
import { CustomerSummaryCards } from './details/CustomerSummaryCards';
import { CustomerTransactionHistory } from './details/CustomerTransactionHistory';
import { useCustomerTransactions } from '../../hooks/useCustomerTransactions';

interface CustomerDetailsProps {
  customerId: number;
  onBack: () => void;
}

export function CustomerDetails({ customerId, onBack }: CustomerDetailsProps) {
  const [customers] = useLocalStorage<any[]>('customers', []);
  const customer = customers.find(c => c.id === customerId);
  const { 
    transactions, 
    totalOrders, 
    totalPayments, 
    balance 
  } = useCustomerTransactions(customerId);

  if (!customer) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <CustomerHeader 
        customer={customer}
        onBack={onBack}
        onPrint={handlePrint}
      />

      <CustomerSummaryCards
        totalOrders={totalOrders}
        totalPayments={totalPayments}
        balance={balance}
        currency={customer.currency || 'TRY'}
      />

      <CustomerTransactionHistory
        transactions={transactions}
        totalOrders={totalOrders}
        totalPayments={totalPayments}
        balance={balance}
        currency={customer.currency || 'TRY'}
      />
    </div>
  );
}