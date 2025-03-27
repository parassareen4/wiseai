import React from 'react';

const AdviceCard = ({ advice, mode }) => {
  // Enhanced cleaning and validation function
  const getCleanRecommendations = (input) => {
    if (!input) return null;

    // Handle object case for insights
    if (typeof input === 'object') {
      const allRecommendations = [
        ...(input.advice ? getCleanRecommendations(input.advice) || [] : []),
        ...(input.goalRecommendations ? getCleanRecommendations(input.goalRecommendations) || [] : [])
      ];
      return allRecommendations.length > 0 ? allRecommendations : null;
    }

    // Convert to string and clean
    const text = String(input)
      .replace(/[^\w\s.,!?\-$%\d]/g, '')  // Remove special chars
      .replace(/\s+/g, ' ')               // Normalize whitespace
      .replace(/(http|www)\S+/gi, '')     // Remove URLs
      .replace(/\$\d+/g, '')              // Remove dollar amounts
      .replace(/\b\d{6,}\b/g, '')        // Remove large numbers
      .trim();

    // Extract valid recommendations
    const recommendations = text
      .split(/\d\.|\n-|\n•|\n\*|LINKS|---/)  // Split by list indicators
      .map(item => item.trim())
      .filter(item => {
        // Validate each recommendation
        const wordCount = item.split(/\s+/).length;
        return (
          wordCount >= 4 && wordCount <= 25 &&        // Reasonable length
          !/[A-Z]{4,}/.test(item) &&                 // No ALL CAPS
          !/\b(click|visit|http|www)\b/i.test(item)  // No marketing
        );
      })
      .slice(0, 3); // Limit to 3 best recommendations

    return recommendations.length > 0 ? recommendations : null;
  };

  // Get cleaned recommendations or fallback
  const recommendations = getCleanRecommendations(advice) || 
    (mode === 'goals' 
      ? [
          'Set specific financial targets',
          'Automate your savings',
          'Review progress monthly'
        ]
      : [
          'Track your expenses weekly',
          'Create a realistic budget',
          'Build an emergency fund'
        ]
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {mode === 'insights' ? 'Financial Insights' : 
         mode === 'goals' ? 'Goal Recommendations' : 'Financial Advice'}
      </h2>
      
      <ul className="space-y-3">
        {recommendations.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex-shrink-0 mr-2">
              {index + 1}
            </span>
            <span className="leading-tight">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdviceCard;