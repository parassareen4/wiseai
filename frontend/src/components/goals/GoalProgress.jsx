const GoalProgress = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysLeft = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24));
  
    return (
      <div className="goal-progress">
        <h3>{goal.name}</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="goal-details">
          <span>${goal.currentAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}</span>
          <span>{daysLeft} days remaining</span>
        </div>
      </div>
    );
  };
  
  export default GoalProgress;