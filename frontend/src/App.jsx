import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transaction';
import Goals from './pages/Goals';
import Advice from './pages/Advice';
import Analysis from './pages/Analysis';
import Navbar from './components/Navbar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('https://wiseai-fub2.onrender.com/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));

    fetch('https://wiseai-fub2.onrender.com/api/goals')
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  const addTransaction = (transaction) => {
    fetch('https://wiseai-fub2.onrender.com/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    })
      .then(res => res.json())
      .then(newTransaction => setTransactions([newTransaction, ...transactions]));
  };

  const addGoal = (goal) => {
    fetch('https://wiseai-fub2.onrender.com/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    })
      .then(res => res.json())
      .then(newGoal => setGoals([...goals, newGoal]));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard transactions={transactions} goals={goals} />} />
          <Route path="/transactions" element={
            <Transactions transactions={transactions} onAdd={addTransaction} />
          } />
          <Route path="/goals" element={
            <Goals goals={goals} onAdd={addGoal} />
          } />
          <Route path="/advice" element={
            <Advice transactions={transactions} />
          } />
          <Route path="/analysis" element={
            <Analysis transactions={transactions} />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;