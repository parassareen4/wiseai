import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#4A6FA5', // Primary blue
  '#47B881', // Success green
  '#FFB020', // Warning yellow
  '#FF5630', // Danger red
  '#9F7AEA', // Purple
  '#38B2AC', // Teal
  '#ED8936', // Orange
  '#667EEA'  // Indigo
];

const SpendingChart = ({ transactions }) => {
  const data = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const totalSpending = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Spending Overview
        </h3>
        <p className="text-gray-500">
          Total spent: <span className="font-semibold text-blue-600">${totalSpending.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 text-sm"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-medium text-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
              label={({ name, percent }) => (
                `${(percent * 100).toFixed(0)}%`
              )}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Categories</p>
          <p className="text-xl font-bold text-gray-800">{data.length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Average per Category</p>
          <p className="text-xl font-bold text-gray-800">
            ${(totalSpending / data.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;