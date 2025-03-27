import { useState } from 'react';

const GoalForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: 'General'
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
      name: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      category: 'General'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label>Goal Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Target Amount ($)</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Current Amount ($)</label>
          <input
            type="number"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Target Date</label>
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Vacation">Vacation</option>
            <option value="Emergency">Emergency Fund</option>
            <option value="Education">Education</option>
            <option value="Home">Home</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Retirement">Retirement</option>
          </select>
        </div>
      </div>
      
      <button type="submit" className="btn">Save Goal</button>
    </form>
  );
};

export default GoalForm;