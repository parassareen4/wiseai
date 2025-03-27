const AdviceCard = ({ advice }) => {
  const formatAdvice = (text) => {
    return text.split('\n')
      .filter(line => line.trim().length > 0)
      .map((line, i) => {
        // Extract any numbers or amounts from the advice
        const amounts = line.match(/\$\d+(\.\d{2})?/g) || [];
        const formattedLine = line.replace(/^\d\.|\*/, '').trim();
        
        return (
          <li 
            key={i}
            className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Number indicator */}
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{i + 1}</span>
            </div>
            
            {/* Advice content */}
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">
                {formattedLine}
              </p>
              
              {/* If there are dollar amounts, show them highlighted */}
              {amounts.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {amounts.map((amount, index) => (
                    <span 
                      key={index}
                      className="text-sm font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md"
                    >
                      {amount}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">
            Your Personalized Recommendations
          </h3>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <ul className="space-y-2">
          {formatAdvice(advice)}
        </ul>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Based on your transaction history and spending patterns
        </p>
      </div>
    </div>
  );
};

export default AdviceCard;