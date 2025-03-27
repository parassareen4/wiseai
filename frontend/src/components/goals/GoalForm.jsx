import { useState } from 'react';

const GoalForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      targetDate: new Date(formData.targetDate).toISOString()
    });
    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="targetAmount" className="block mb-1">Target Amount</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="currentAmount" className="block mb-1">Current Amount (optional)</label>
          <input
            type="number"
            id="currentAmount"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="targetDate" className="block mb-1">Target Date</label>
          <input
            type="date"
            id="targetDate"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalForm;