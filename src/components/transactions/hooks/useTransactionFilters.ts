import { Transaction, TransactionType } from '../../../types/transaction';
import { useCustomers } from '../../../hooks/useCustomers';

export function useTransactionFilters(
  transactions: Transaction[],
  search: string,
  filterType: TransactionType | 'all',
  filterCategory: string
) {
  const { customers } = useCustomers();

  const filteredTransactions = transactions.filter(transaction => {
    const searchLower = search.toLowerCase();
    const searchMatch = searchLower === '' ||
      transaction.description.toLowerCase().includes(searchLower) ||
      transaction.category.toLowerCase().includes(searchLower) ||
      (transaction.type === TransactionType.INCOME && customers.find(c => 
        c.id === transaction.customerId && 
        (c.name.toLowerCase().includes(searchLower) || 
         (c.companyName && c.companyName.toLowerCase().includes(searchLower)))
      ));

    const typeMatch = filterType === 'all' || transaction.type === filterType;
    const categoryMatch = filterCategory === '' || transaction.category === filterCategory;

    return searchMatch && typeMatch && categoryMatch;
  });

  return filteredTransactions;
}