import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import AdviceCard from '../components/advice/AdviceCard';

const Advice = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const res = await api.get('/advice');
        setAdvice(res.data);
      } catch (err) {
        console.error('Failed to fetch advice:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Personalized Financial Advice</h1>
      <AdviceCard advice={advice} />
    </div>
  );
};

export default Advice;