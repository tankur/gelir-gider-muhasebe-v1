import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionForm } from './TransactionForm';
import { Transaction, TransactionType } from '../types/transaction';
import { useActivities } from '../hooks/useActivities';
import { TransactionList } from './TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { showSuccess, showError, showConfirm } from '../utils/alert';
import { TransactionFilters } from './transactions/TransactionFilters';
import { TransactionSummary } from './transactions/components/TransactionSummary';
import { useTransactionFilters } from './transactions/hooks/useTransactionFilters';
import { formatCurrency } from '../utils/format';

export default function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { logActivity } = useActivities();

  // Filter states
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredTransactions = useTransactionFilters(
    transactions,
    search,
    filterType,
    filterCategory
  );

  const handleSubmit = (transaction: Transaction) => {
    try {
      if (editingTransaction) {
        updateTransaction(transaction);
        showSuccess('İşlem başarıyla güncellendi');
        logActivity(
          'İşlem güncellendi',
          `${transaction.type === TransactionType.INCOME ? 'Gelir' : 'Gider'} işlemi güncellendi: ${transaction.description} - ${formatCurrency(transaction.amount)}`,
          'transaction'
        );
      } else {
        addTransaction(transaction);
        showSuccess('Yeni işlem başarıyla eklendi');
        logActivity(
          'Yeni işlem eklendi',
          `Yeni ${transaction.type === TransactionType.INCOME ? 'gelir' : 'gider'} işlemi: ${transaction.description} - ${formatCurrency(transaction.amount)}`,
          'transaction'
        );
      }
      setIsModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      showError('İşlem kaydedilirken bir hata oluştu');
      console.error('Transaction error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    const confirmed = await showConfirm(
      'İşlemi Sil',
      'Bu işlemi silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        deleteTransaction(id);
        showSuccess('İşlem başarıyla silindi');
        logActivity(
          'İşlem silindi',
          `${transaction.type === TransactionType.INCOME ? 'Gelir' : 'Gider'} işlemi silindi: ${transaction.description} - ${formatCurrency(transaction.amount)}`,
          'transaction'
        );
      } catch (error) {
        showError('İşlem silinirken bir hata oluştu');
        console.error('Delete transaction error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gelir/Gider İşlemleri</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Yeni İşlem
        </button>
      </div>

      <TransactionSummary transactions={filteredTransactions} />

      <TransactionFilters
        search={search}
        type={filterType}
        category={filterCategory}
        onSearchChange={setSearch}
        onTypeChange={setFilterType}
        onCategoryChange={setFilterCategory}
      />

      <TransactionList 
        transactions={filteredTransactions}
        onEdit={(transaction) => {
          setEditingTransaction(transaction);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <TransactionForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          initialData={editingTransaction}
        />
      )}
    </div>
  );
}