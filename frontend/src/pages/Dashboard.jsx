import { Link } from 'react-router-dom';
import SpendingChart from '../components/charts/SpendingChart';
import GoalProgress from '../components/goals/GoalProgress';

const Dashboard = ({ transactions, goals }) => {
  const balance = transactions.reduce((total, t) => (
    t.type === 'income' ? total + t.amount : total - t.amount
  ), 0);

  const recentTransactions = transactions.slice(0, 5);
  const recentGoals = goals.slice(0, 3);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <div className="card">
          <h3>Current Balance</h3>
          <p className="amount">${balance.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Active Goals</h3>
          <p className="amount">{goals.length}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Transactions</h2>
        <ul className="transaction-list">
          {recentTransactions.map(t => (
            <li key={t._id} className={t.type}>
              <span>{t.description}</span>
              <span>${t.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <Link to="/transactions" className="btn">View All</Link>
      </div>

      <div className="dashboard-section">
        <h2>Spending Breakdown</h2>
        <SpendingChart transactions={transactions} />
      </div>

      <div className="dashboard-section">
        <h2>Goal Progress</h2>
        {recentGoals.map(goal => (
          <GoalProgress key={goal._id} goal={goal} />
        ))}
        <Link to="/goals" className="btn">View All Goals</Link>
      </div>
    </div>
  );
};

export default Dashboard;