import GoalProgress from './GoalProgress';

const GoalList = ({ goals }) => {
  if (goals.length === 0) {
    return (
      <div className="empty-state">
        <p>No goals created yet. Add your first goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalProgress key={goal._id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;