import { useState, useEffect } from 'react';
import SpendingChart from '../components/charts/SpendingChart';
import ForecastChart from '../components/charts/ForecastChart';

const Analysis = ({ transactions }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/analysis/spending');
        const data = await response.json();
        setForecast(data);
      } catch (err) {
        console.error('Error fetching forecast:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div className="analysis-page">
      <h1>Financial Analysis</h1>
      
      <div className="analysis-section">
        <h2>Spending Breakdown</h2>
        <SpendingChart transactions={transactions} />
      </div>
      
      <div className="analysis-section">
        <h2>Spending Forecast</h2>
        {loading ? (
          <p>Loading forecast data...</p>
        ) : forecast ? (
          <ForecastChart data={forecast} />
        ) : (
          <p>No forecast data available</p>
        )}
      </div>
      
      <div className="analysis-section">
        <h2>Category Insights</h2>
        <div className="category-insights">
          {transactions && transactions.length > 0 ? (
            <ul>
              {Object.entries(
                transactions.reduce((acc, t) => {
                  if (t.type === 'expense') {
                    acc[t.category] = (acc[t.category] || 0) + 1;
                  }
                  return acc;
                }, {})
              )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([category, count]) => (
                <li key={category}>
                  <strong>{category}:</strong> {count} transactions
                </li>
              ))}
            </ul>
          ) : (
            <p>No transaction data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;