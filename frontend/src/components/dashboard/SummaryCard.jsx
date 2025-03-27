const SummaryCard = ({ title, value, type }) => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount || 0);
    };
  
    const getColorClass = () => {
      switch (type) {
        case 'income':
          return 'bg-green-100 text-green-800';
        case 'expense':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-blue-100 text-blue-800';
      }
    };
  
    return (
      <div className={`p-6 rounded-lg shadow ${getColorClass()}`}>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-2xl font-bold">{formatCurrency(value)}</p>
      </div>
    );
  };
  
  export default SummaryCard;