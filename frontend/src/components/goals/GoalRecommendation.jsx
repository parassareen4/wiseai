import { useState, useEffect, useCallback } from 'react';

const GoalRecommendations = ({ userId, forceRefresh }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Add cache-busting parameter
      const timestamp = Date.now();
      const response = await fetch(
        `https://wiseai-fub2.onrender.com/api/advice/goals?refresh=${timestamp}`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          cache: 'no-store' // Disable caching
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setRecommendations(data.data || data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load recommendations');
      setRecommendations([
        "1. Review your goals monthly",
        "2. Set smaller milestones",
        "3. Automate savings"
      ].join('\n'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount and when refreshKey changes
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations, refreshKey]);

  // Add this effect to respond to parent's forceRefresh
  useEffect(() => {
    if (forceRefresh) {
      setRefreshKey(prev => prev + 1); // Triggers re-fetch
    }
  }, [forceRefresh]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1); // Increment to force re-fetch
  };

  // Rest of your component remains the same...
  if (loading && !recommendations) {
    return <div className="recommendations-card loading">Loading...</div>;
  }

  if (error) {
    return <div className="recommendations-card error">{error}</div>;
  }

  if (typeof recommendations === 'string') {
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
            onClick={handleRefresh} 
            disabled={loading}
            className={`refresh-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? '⟳ Refreshing...' : '⟳ Refresh'}
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