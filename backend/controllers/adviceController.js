const Transaction = require('../models/Transaction');
const { generateFinancialAdvice } = require('../services/aiService');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get financial advice
exports.getAdvice = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const advice = await generateFinancialAdvice(transactions);
    res.status(200).json({
      success: true,
      data: advice
    });
  } catch (err) {
    next(err);
  }
};