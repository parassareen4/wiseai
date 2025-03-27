const GoalRecommendations = ({ recommendations, loading, onRefresh }) => {
    if (typeof recommendations === 'string') {
      // If recommendations is a string (from GPT-2 response)
      const recommendationItems = recommendations.split('\n')
        .filter(line => line.trim().length > 0)
        .map((line, index) => ({
          id: index,
          text: line.trim().replace(/^\d\.\s*/, '')
        }));
  
      return (
        <div className="recommendations-card">
          <div className="recommendations-header">
            <h3>AI Goal Suggestions</h3>
            <button 
              onClick={onRefresh} 
              disabled={loading}
              className="refresh-btn"
            >
              {loading ? 'Refreshing...' : '⟳'}
            </button>
          </div>
          
          <ul className="recommendations-list">
            {recommendationItems.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      );
    }
  
    return (
      <div className="recommendations-card">
        <h3>Goal Suggestions</h3>
        <p>No recommendations available</p>
      </div>
    );
  };
  
  export default GoalRecommendations;