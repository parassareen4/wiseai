const Goal = require('../models/Goal');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all goals
exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add goal
exports.addGoal = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const goal = await Goal.create(req.body);
    res.status(201).json({
      success: true,
      data: goal
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update goal
exports.updateGoal = async (req, res, next) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return next(new ErrorResponse(`Goal not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to update this goal`, 401));
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: goal
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete goal
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return next(new ErrorResponse(`Goal not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to delete this goal`, 401));
    }

    await goal.remove();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};