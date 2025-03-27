const AdviceCard = ({ advice }) => {
  const formatAdvice = (text) => {
    if (!text) return [];

    // Split by numbered points or bullet points
    const points = text.split(/\d\.|\n-|\n\*/).filter((point) => point.trim());

    // If no clear points found, return the whole text
    if (points.length === 0) return [text];

    return points.map((point) => point.trim());
  };

  const advicePoints = formatAdvice(advice);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Personalized Advsice</h2>

      {advicePoints.length > 0 ? (
        <ul className="space-y-3">
          {advicePoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No advice generated yet. Add some transactions first.</p>
      )}
    </div>
  );
};

export default AdviceCard;
