import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import GoalList from '../components/goals/GoalList';
import GoalForm from '../components/goals/GoalForm';

const Goals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get('/goals');
        setGoals(res.data);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async (goalData) => {
    try {
      const res = await api.post('/goals', goalData);
      setGoals([...goals, res.data]);
    } catch (err) {
      console.error('Failed to add goal:', err);
    }
  };

  const handleUpdateGoal = async (id, updatedData) => {
    try {
      const res = await api.put(`/goals/${id}`, updatedData);
      setGoals(goals.map(g => g._id === id ? res.data : g));
    } catch (err) {
      console.error('Failed to update goal:', err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter(g => g._id !== id));
    } catch (err) {
      console.error('Failed to delete goal:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Savings Goals</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <GoalForm onSubmit={handleAddGoal} />
        </div>
        
        <div className="lg:col-span-2">
          <GoalList 
            goals={goals} 
            onUpdate={handleUpdateGoal}
            onDelete={handleDeleteGoal}
          />
        </div>
      </div>
    </div>
  );
};

export default Goals;