const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(');
const Transaction = require('../models/Transaction');

const categorizeTransaction = async (description) => {
  const prompt = `Categorize this transaction description:
  "${description}"
  Choose from: Food, Transportation, Housing, Entertainment, Utilities, Shopping, Other
  Respond with only the category name:`;
  
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: { max_new_tokens: 15, temperature: 0.3 }
    });
    return response.generated_text.trim().replace(/"/g, '');
  } catch (err) {
    console.error('AI categorization error:', err);
    return 'Other';
  }
};

const generateFinancialAdvice = async (transactions) => {
  const spending = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const prompt = `Provide 3 personalized financial recommendations based on these spending patterns:
  ${JSON.stringify(spending, null, 2)}
  Format as numbered bullet points:`;
  
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: { max_new_tokens: 300, temperature: 0.7 }
    });
    return response.generated_text;
  } catch (err) {
    console.error('AI advice error:', err);
    return "1. Track your expenses regularly\n2. Create a monthly budget\n3. Save at least 20% of your income";
  }
};

const predictSpending = async (transactions) => {
  const monthlySpending = Array(12).fill(0);
  transactions.forEach(t => {
    if (t.type === 'expense') {
      const month = new Date(t.date).getMonth();
      monthlySpending[month] += t.amount;
    }
  });

  const prompt = `Predict next 3 months spending based on this monthly data:
  ${JSON.stringify(monthlySpending)}
  Return JSON format: { "predictions": [{"month": "January", "amount": 500}, ...] }`;
  
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: { max_new_tokens: 200 }
    });
    return JSON.parse(response.generated_text.match(/{.*}/s)[0]);
  } catch (err) {
    console.error('AI prediction error:', err);
    return { predictions: [] };
  }
};

module.exports = {
  categorizeTransaction,
  generateFinancialAdvice,
  predictSpending
};