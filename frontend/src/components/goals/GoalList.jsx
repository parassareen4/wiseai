import { useState } from 'react';

const GoalList = ({ goals, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: ''
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEditClick = (goal) => {
    setEditingId(goal._id);
    setEditFormData({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      targetDate: goal.targetDate.split('T')[0]
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = (id) => {
    onUpdate(id, {
      ...editFormData,
      targetAmount: parseFloat(editFormData.targetAmount),
      currentAmount: parseFloat(editFormData.currentAmount),
      targetDate: new Date(editFormData.targetDate).toISOString()
    });
    setEditingId(null);
  };

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {goals.map((goal) => (
            <tr key={goal._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === goal._id ? (
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  goal.title
                )}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === goal._id ? (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <span>Current:</span>
                      <input
                        type="number"
                        name="currentAmount"
                        value={editFormData.currentAmount}
                        onChange={handleEditChange}
                        className="w-20 p-1 border rounded"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <span>Target:</span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={editFormData.targetAmount}
                        onChange={handleEditChange}
                        className="w-20 p-1 border rounded"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span>{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</span>
                      <span>{calculateProgress(goal.currentAmount, goal.targetAmount)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === goal._id ? (
                  <input
                    type="date"
                    name="targetDate"
                    value={editFormData.targetDate}
                    onChange={handleEditChange}
                    className="p-1 border rounded"
                  />
                ) : (
                  formatDate(goal.targetDate)
                )}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {editingId === goal._id ? (
                  <>
                    <button
                      onClick={() => handleEditSubmit(goal._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(goal)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(goal._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalList;