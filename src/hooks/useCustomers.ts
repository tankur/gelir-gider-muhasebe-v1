import { useLocalStorage } from './useLocalStorage';

export function useCustomers() {
  const [customers] = useLocalStorage<any[]>('customers', []);

  const getCustomerInfo = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    return {
      id: customer?.id,
      name: customer?.name || '-',
      companyName: customer?.companyName || '',
      phone: customer?.phone,
      email: customer?.email
    };
  };

  return {
    customers,
    getCustomerInfo
  };
}