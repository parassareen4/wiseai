import { useState } from 'react';
import AdviceCard from '../components/AdviceCard';

const Advice = ({ transactions }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/advice');
      const { advice } = await response.json();
      setAdvice(advice);
    } catch (err) {
      console.log(err)
      setAdvice("Couldn't get advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            AI Financial Advisor
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
            <p className="text-lg">
              Analyzed <span className="font-semibold">{transactions.length}</span> transactions
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
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
                <svg 
                  className="animate-spin h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Advice...
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
                Get Smart Advice
              </>
            )}
          </button>
        </div>

        <div className={`transition-opacity duration-300 ${advice ? 'opacity-100' : 'opacity-0'}`}>
          {advice && <AdviceCard advice={advice} />}
        </div>
      </div>
    </div>
  );
};

export default Advice;