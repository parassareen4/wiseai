import { useState } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';

const Transactions = ({ transactions, onAdd, onDelete }) => {
  const [filter, setFilter] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'income') return t.type === 'income';
    return t.type === 'expense';
  });

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`https://wiseai-fub2.onrender.com/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      // Call the onDelete prop to update the parent state
      onDelete(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // You might want to add error handling UI here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Transactions
        </h1>
        
        <div className="filter-buttons flex gap-4 mb-8">
          <button 
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              filter === 'all' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setFilter('all')}
          >
            All Transactions
          </button>
          <button 
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              filter === 'income' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
            onClick={() => setFilter('income')}
          >
            Income
          </button>
          <button 
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              filter === 'expense' 
                ? 'bg-[#ff8042] text-white shadow-lg shadow-red-200' 
                : 'text-[#ff8042] hover:bg-red-100'
            }`}
            onClick={() => setFilter('expense')}
          >
            Expenses
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Transaction
          </h2>
          <AddTransaction onAdd={onAdd} />
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Transaction History
          </h2>
          <TransactionList 
            transactions={filteredTransactions} 
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;