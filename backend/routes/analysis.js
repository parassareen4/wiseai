const express = require('express');
const { predictSpending } = require('../services/aiService');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/spending', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const prediction = await predictSpending(transactions);
    res.json(prediction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;