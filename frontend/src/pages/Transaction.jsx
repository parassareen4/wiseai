import { useState } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';

const Transactions = ({ transactions, onAdd, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'income') return t.type === 'income';
    return t.type === 'expense';
  });

  return (
    <div>
      <h1>Transactions</h1>
      
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('income')}>Income</button>
        <button onClick={() => setFilter('expense')}>Expenses</button>
      </div>
      
      <AddTransaction onAdd={onAdd} />
      <TransactionList 
        transactions={filteredTransactions} 
        onDelete={onDelete} 
      />
    </div>
  );
};

export default Transactions;