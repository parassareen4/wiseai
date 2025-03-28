import { useState } from 'react';
import AdviceCard from '../components/AdviceCard';




const Advice = ({ transactions, goals }) => {
  const [adviceType, setAdviceType] = useState('general'); // 'general', 'goals', or 'insights'
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      let endpoint = '/api/advice';
      if (adviceType === 'goals') endpoint = '/api/advice/goals';
      if (adviceType === 'insights') endpoint = '/api/advice/insights';
  
      const response = await fetch(`https://wiseai-fub2.onrender.com${endpoint}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      
      const data = await response.json();
      
      // Handle insights data differently
      if (adviceType === 'insights') {
        setAdvice({
          advice: data.data?.advice || data.advice || "No general advice available",
          goalRecommendations: data.data?.goalRecommendations || data.goalRecommendations || "No goal recommendations",
          predictions: data.data?.predictions || data.predictions || []
        });
      } else {
        setAdvice(data.data || data);
      }
    } catch (err) {
      console.error(err);
      setAdvice(adviceType === 'goals' 
        ? "1. Review your goals monthly\n2. Prioritize high-impact goals\n3. Automate your savings"
        : adviceType === 'insights'
        ? {
            advice: "1. Track your expenses regularly\n2. Create a monthly budget\n3. Save at least 20% of your income",
            goalRecommendations: "1. Set specific goals\n2. Break goals into milestones\n3. Review progress weekly",
            predictions: []
          }
        : "1. Track your expenses regularly\n2. Create a monthly budget\n3. Save at least 20% of your income"
      );
    } finally {
      setLoading(false);
    }
  };
  

  const getAdviceTitle = () => {
    switch (adviceType) {
      case 'goals': return 'Goal Recommendations';
      case 'insights': return 'Financial Insights';
      default: return 'Personalized Financial Advice';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            AI Financial Advisor
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg">
                Analyzed <span className="font-semibold">{transactions.length}</span> transactions
              </p>
            </div>
            {goals?.length > 0 && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg">
                  Tracking <span className="font-semibold">{goals.length}</span> goals
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center mb-8 gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setAdviceType('general')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${adviceType === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              General Advice
            </button>
            {goals?.length > 0 && (
              <button
                onClick={() => setAdviceType('goals')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${adviceType === 'goals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Goal Tips
              </button>
            )}
            <button
              onClick={() => setAdviceType('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${adviceType === 'insights' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Full Insights
            </button>
          </div>

          <button 
            onClick={getAdvice} 
            disabled={loading}
            className={`
              px-6 py-3 rounded-xl font-medium text-white
              flex items-center gap-2 transition-all duration-200
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating {getAdviceTitle()}...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get {getAdviceTitle()}
              </>
            )}
          </button>
        </div>

        <div className={`transition-opacity duration-300 ${advice ? 'opacity-100' : 'opacity-0'}`}>
          {advice && <AdviceCard advice={advice} mode={adviceType} />}
        </div>
      </div>
    </div>
  );
};

export default Advice;