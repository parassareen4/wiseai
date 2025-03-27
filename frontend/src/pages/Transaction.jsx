import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transactionData) => {
    try {
      const res = await api.post('/transactions', transactionData);
      setTransactions([res.data, ...transactions]);
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Transactions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>
        
        <div className="lg:col-span-2">
          <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction} 
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;