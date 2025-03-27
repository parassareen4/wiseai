import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">FinanceAI</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/transactions" className="nav-link">Transactions</Link>
          <Link to="/goals" className="nav-link">Goals</Link>
          <Link to="/advice" className="nav-link">Advice</Link>
          <Link to="/analysis" className="nav-link">Analysis</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;