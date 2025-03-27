import { Link } from 'react-router-dom';
import  useAuth  from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Finance Assistant</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/transactions" className="hover:underline">Transactions</Link>
              <Link to="/goals" className="hover:underline">Goals</Link>
              <Link to="/advice" className="hover:underline">Advice</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;