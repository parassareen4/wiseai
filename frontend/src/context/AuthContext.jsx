import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (err) {
        console.log(err)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    const res = await api.post('/auth/login', formData);
    setUser(res.data);
    navigate('/');
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    setUser(res.data);
    navigate('/');
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;