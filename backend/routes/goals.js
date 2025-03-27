const express = require('express');
const Goal = require('../models/Goal');
const router = express.Router();

// Create goal
router.post('/', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find().sort({ targetDate: 1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update goal progress
router.patch('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $inc: { currentAmount: req.body.amount } },
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;