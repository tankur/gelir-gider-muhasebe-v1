import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatCurrency } from '../../utils/format';
import { CustomerStatement } from '../../types/payment';
import { PrinterIcon } from 'lucide-react';

interface CustomerStatementProps {
  customerId: number;
}

export function CustomerStatement({ customerId }: CustomerStatementProps) {
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });
  const [customers] = useLocalStorage<any[]>('customers', []);
  const [orders] = useLocalStorage<any[]>('orders', []);
  const [payments] = useLocalStorage<Payment[]>('payments', []);

  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  const customerOrders = orders.filter(o => o.customerId === customerId);
  const customerPayments = payments.filter(p => p.customerId === customerId);

  const statement: CustomerStatement = {
    customer,
    orders: customerOrders.map(o => ({
      id: o.id,
      date: o.orderDate,
      amount: o.totalAmount,
      status: o.status
    })),
    payments: customerPayments
  };

  const totalOrders = statement.orders.reduce((sum, o) => sum + o.amount, 0);
  const totalPayments = statement.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = totalOrders - totalPayments;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Button */}
      <div className="mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PrinterIcon size={20} className="mr-2" />
          Yazdır
        </button>
      </div>

      {/* Printable Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="h-16 w-auto" />
            ) : (
              <div className="text-2xl font-bold text-gray-800">{settings.title}</div>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">Müşteri Ekstre</h2>
            <p className="text-gray-600">{new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Müşteri Bilgileri</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">{statement.customer.name}</p>
              {statement.customer.companyName && (
                <p className="text-gray-600">{statement.customer.companyName}</p>
              )}
              <p className="text-gray-600">{statement.customer.phone}</p>
              {statement.customer.email && (
                <p className="text-gray-600">{statement.customer.email}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium">Bakiye</p>
              <p className={`text-xl font-bold ${
                balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(balance)}
              </p>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
      </div>
    </>
  );
}