const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transaction');
const goalRoutes = require('./routes/goals');
const adviceRoutes = require('./routes/advice');
const analysisRoutes = require('./routes/analysis');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://akshitvig213:NBEVF9stJg1gYxeB@cluster0.wvw0s.mongodb.net/wiser', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/advice', adviceRoutes);
app.use('/api/analysis', analysisRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));