const express = require('express');
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getGoals)
  .post(protect, addGoal);

router
  .route('/:id')
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;