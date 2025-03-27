const TransactionList = ({ transactions, onDelete }) => {
    return (
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <ul>
            {transactions.map((t) => (
              <li key={t._id} className={t.type}>
                <div className="transaction-info">
                  <span>{t.description}</span>
                  <span>${t.amount.toFixed(2)}</span>
                  <span>{t.category}</span>
                  <span>{new Date(t.date).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => onDelete(t._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TransactionList;