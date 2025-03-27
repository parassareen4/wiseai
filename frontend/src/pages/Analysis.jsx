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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Financial Analysis
      </h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Spending Breakdown
        </h2>
        <SpendingChart transactions={transactions} />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Spending Forecast
        </h2>
        {loading ? (
          <div className="text-gray-500 text-center py-4">Loading forecast data...</div>
        ) : forecast ? (
          <ForecastChart data={forecast} />
        ) : (
          <div className="text-gray-500 text-center py-4">No forecast data available</div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Categories
        </h2>
        <div className="space-y-3">
          {transactions && transactions.length > 0 ? (
            Object.entries(
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
              <div 
                key={category}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">
                  {category}
                </span>
                <span className="text-sm text-gray-600">
                  {count} transactions
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No transaction data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;