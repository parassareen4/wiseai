const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal'); // Assuming you have a Goal model
const { generateFinancialAdvice } = require('../services/aiService');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get financial advice based on transactions
// @route   GET /api/v1/advice
// @access  Private
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

// @desc    Get goal recommendations
// @route   GET /api/v1/goals/recommendations
// @access  Private
exports.getGoalRecommendations = async (req, res, next) => {
  try {
    // Get user's goals from database
    const goals = await Goal.find({ user: req.user.id });
    
    if (!goals || goals.length === 0) {
      return next(new ErrorResponse('No goals found. Please create goals first.', 404));
    }

    // Format goals data for AI prompt
    const goalsData = goals.map(goal => ({
      category: goal.category,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount || 0,
      targetDate: goal.targetDate,
      createdAt: goal.createdAt,
      progress: goal.currentAmount && goal.targetAmount 
        ? (goal.currentAmount / goal.targetAmount * 100).toFixed(2) + '%'
        : '0%',
      priority: goal.priority || 'medium'
    }));

    // Create customized prompt for goal recommendations
    const prompt = `Provide 3-5 personalized goal recommendations based on these financial goals:
    ${JSON.stringify(goalsData, null, 2)}
    
    Consider:
    - Current progress towards each goal
    - Time remaining until target dates
    - Goal categories and priorities
    - Suggested actions to accelerate progress
    
    Format as numbered bullet points:`;

    // Get recommendations from AI
    const recommendations = await generateFinancialAdvice(goalsData);

    res.status(200).json({
      success: true,
      data: recommendations
    });

  } catch (err) {
    console.error('Error getting goal recommendations:', err);
    // Fallback recommendations
    const fallbackRecommendations = [
      "1. Review your goals monthly and adjust targets if needed",
      "2. Focus on completing high-priority goals first",
      "3. Automate savings for your most important goals"
    ].join('\n');
    
    res.status(200).json({
      success: true,
      data: fallbackRecommendations
    });
  }
};

// @desc    Predict future spending
// @route   GET /api/v1/predictions/spending
// @access  Private
exports.getSpendingPredictions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const predictions = await predictSpending(transactions);
    res.status(200).json({
      success: true,
      data: predictions
    });
  } catch (err) {
    next(err);
  }
};

