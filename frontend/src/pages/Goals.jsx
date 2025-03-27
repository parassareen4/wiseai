import { useState, useEffect } from 'react';
import GoalForm from '../components/goals/GoalForm';
import GoalList from '../components/goals/GoalList';
import GoalRecommendations from '../components/goals/GoalRecommendation';

const Goals = ({ goals, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/goals/recommendations');
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleAddGoal = (goal) => {
    onAdd(goal);
    setShowForm(false);
  };

  return (
    <div className="goals-page">
      <h1>Savings Goals</h1>
      
      <div className="goals-container">
        <div className="goals-main">
          <div className="goals-header">
            <h2>Your Goals</h2>
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="btn"
            >
              {showForm ? 'Cancel' : 'Add New Goal'}
            </button>
          </div>
          
          {showForm && <GoalForm onSubmit={handleAddGoal} />}
          
          <GoalList goals={goals} />
        </div>
        
        <div className="goals-sidebar">
          <GoalRecommendations 
            recommendations={recommendations} 
            loading={loading} 
            onRefresh={fetchRecommendations} 
          />
        </div>
      </div>
    </div>
  );
};

export default Goals;