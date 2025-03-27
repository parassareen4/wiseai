const express = require('express');
const { 
  generateFinancialAdvice,
  predictSpending,
  categorizeTransaction
} = require('../services/aiService');
const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');
const router = express.Router();

// Remove duplicate imports and auth middleware for now
// @desc    Get general financial advice
// @route   GET /api/advice
// @access  Public
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const advice = await generateFinancialAdvice(transactions);
    res.status(200).json({
      success: true,
      data: advice
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Get goal recommendations
// @route   GET /api/advice/goals
// @access  Public
router.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    const recommendations = await generateFinancialAdvice(goals);
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Get spending predictions
// @route   GET /api/advice/predictions
// @access  Public
router.get('/predictions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const predictions = await predictSpending(transactions);
    res.status(200).json({
      success: true,
      data: predictions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Categorize a transaction
// @route   POST /api/advice/categorize
// @access  Public
router.post('/categorize', async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Transaction description is required'
      });
    }

    const category = await categorizeTransaction(description);
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error('Error categorizing transaction:', err);
    res.status(500).json({
      success: false,
      error: 'Error categorizing transaction',
      fallbackCategory: 'Other'
    });
  }
});
// In your backend routes (adviceRoutes.js)
router.get('/goals/recommendations', async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    const recommendations = await generateFinancialAdvice(goals);
    
    res.set('Cache-Control', 'no-store');
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});
// @desc    Get comprehensive financial insights
// @route   GET /api/advice/insights
// @access  Public
router.get('/insights', async (req, res) => {
  try {
    const [transactions, goals] = await Promise.all([
      Transaction.find(),
      Goal.find()
    ]);

    const [advice, predictions, recommendations] = await Promise.all([
      generateFinancialAdvice(transactions).catch(e => "1. Track expenses\n2. Create budget\n3. Save regularly"),
      predictSpending(transactions).catch(e => ({ predictions: [] })),
      goals.length > 0 ? 
        generateFinancialAdvice(goals).catch(e => "1. Review goals\n2. Set milestones\n3. Automate savings") : 
        "No goals to analyze"
    ]);

    res.status(200).json({
      success: true,
      data: {
        advice,
        predictions,
        goalRecommendations: recommendations
      }
    });
  } catch (err) {
    console.error('Error getting financial insights:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      fallback: {
        advice: "1. Track expenses\n2. Create budget\n3. Save regularly",
        predictions: { predictions: [] },
        goalRecommendations: "1. Review goals\n2. Set milestones\n3. Automate savings"
      }
    });
  }
});

module.exports = router;