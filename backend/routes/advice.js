const express = require('express');
const router = express.Router();
const { getAdvice } = require('../controllers/adviceController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAdvice);

module.exports = router;