const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a goal title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount'],
    min: [1, 'Target amount must be at least 1']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  targetDate: {
    type: Date,
    required: [true, 'Please add a target date']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);