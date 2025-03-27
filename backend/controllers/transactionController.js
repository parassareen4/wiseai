const Transaction = require('../models/Transaction');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add transaction
exports.addTransaction = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete transaction
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(new ErrorResponse(`Transaction not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to delete this transaction`, 401));
    }

    await transaction.remove();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};