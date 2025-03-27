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
    <div>
      <h2>AI Financial Advisor</h2>
      <p>Analyzed {transactions.length} transactions</p>
      <button onClick={getAdvice} disabled={loading}>
        {loading ? 'Generating...' : 'Get Smart Advice'}
      </button>
      {advice && <AdviceCard advice={advice} />}
    </div>
  );
};

export default Advice;