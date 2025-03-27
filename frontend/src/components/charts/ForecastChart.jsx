import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ data }) => {
  if (!data || !data.predictions) return <p>No forecast data available</p>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data.predictions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="Predicted Spending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;