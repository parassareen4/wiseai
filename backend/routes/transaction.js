const express = require('express');
const Transaction = require('../models/Transaction');
const { categorizeTransaction } = require('../services/aiService');
const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new transaction
router.post('/', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const category = await categorizeTransaction(description);
    
    const transaction = new Transaction({
      description,
      amount,
      type,
      category
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;