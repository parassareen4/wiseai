const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No transactions found</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li 
              key={t._id} 
              className={`bg-white rounded-lg shadow-sm border-l-4 ${
                t.type === 'income' 
                  ? 'border-green-500' 
                  : 'border-[#ff8042]'
              } hover:shadow-md transition-all duration-200`}
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Description</p>
                    <p className="text-sm text-gray-900">{t.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Amount</p>
                    <p className={`text-sm font-semibold ${
                      t.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      ${t.amount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Category</p>
                    <p className="text-sm text-gray-900">{t.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => onDelete(t._id)}
                  className="ml-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;