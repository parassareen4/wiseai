import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import SummaryCard from '../components/dashboard/SummaryCard';
import RecentTransactions from '../components/transactions/RecentTransactions';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, transactionsRes] = await Promise.all([
          api.get('/transactions/summary'),
          api.get('/transactions?limit=5')
        ]);
        setSummary(summaryRes.data);
        setTransactions(transactionsRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Welcome back, {user?.username}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Balance" value={summary?.balance} type="balance" />
        <SummaryCard title="Total Income" value={summary?.income} type="income" />
        <SummaryCard title="Total Expenses" value={summary?.expenses} type="expense" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;