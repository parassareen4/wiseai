const AdviceCard = ({ advice }) => {
    const formatAdvice = (text) => {
      return text.split('\n')
        .filter(line => line.trim().length > 0)
        .map((line, i) => (
          <li key={i}>{line.replace(/^\d\.|\*/, '').trim()}</li>
        ));
    };
  
    return (
      <div className="advice-card">
        <h3>Your Personalized Recommendations</h3>
        <ul>{formatAdvice(advice)}</ul>
      </div>
    );
  };
  
  export default AdviceCard;