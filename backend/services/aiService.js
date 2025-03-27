const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Categorize transaction description
exports.categorizeTransaction = async (description) => {
  const prompt = `Categorize this transaction description for personal finance:
  Description: "${description}"
  
  Respond with JSON format like this:
  { "category": "Food", "tags": ["restaurant", "dining"] }`;
  
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.3
      }
    });
    
    // Parse the JSON response
    const jsonString = response.generated_text.match(/\{.*\}/s)[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('AI categorization failed:', error);
    return { category: 'Other', tags: [] };
  }
};

// Generate financial advice
exports.generateFinancialAdvice = async (transactions) => {
  const summary = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const prompt = `Generate personalized financial advice based on these spending categories:
  ${JSON.stringify(summary, null, 2)}
  
  Provide 3 concise bullet points of advice:`;

  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.5
      }
    });
    
    return response.generated_text;
  } catch (error) {
    console.error('AI advice generation failed:', error);
    return "Currently unable to generate advice. Try again later.";
  }
};