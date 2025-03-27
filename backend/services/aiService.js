const { HfInference } = require("@huggingface/inference");
const hf = new HfInference("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");
const Transaction = require("../models/Transaction");

const categorizeTransaction = async (description) => {
  const prompt = `Categorize this transaction description:
  "${description}"
  Choose from: Food, Transportation, Housing, Entertainment, Utilities, Shopping, Other
  Respond with only the category name:`;

  try {
    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: { max_new_tokens: 15, temperature: 0.3 },
    });
    return response.generated_text.trim().replace(/"/g, "");
  } catch (err) {
    console.error("AI categorization error:", err);
    return "Other";
  }
};

const generateFinancialAdvice = async (data, mode) => {
  const prompt = `
  Act as a friendly but expert financial advisor. Provide 3 recommendations based on:
  ${JSON.stringify(data)}

  Guidelines:
  1. Use conversational but professional tone
  2. Include 1 personalized observation
  3. Add 1 financial concept (e.g., "compound interest")
  4. Suggest 1 actionable step
  5. Format as:
     - Observation: [noticed pattern]
     - Strategy: [financial concept] 
     - Action: [specific task]

  Example:
  1. I notice you spend heavily on weekends - try the 50/30/20 budget rule
  2. Your grocery spending could benefit from cash envelope systems
  3. Let's automate $100 weekly transfers to leverage compound interest

  Recommendations for ${mode}:
  `;

  const response = await hf.textGeneration({
    model: "gpt2",
    inputs: prompt,
    parameters: {
      max_new_tokens: 300,
      temperature: 0.7,
      repetition_penalty: 1.5
    }
  });

  // Fallback if output quality is poor
  if (response.generated_text.length > 500 || !/\d\./.test(response.generated_text)) {
    return mode === 'goals' 
      ? `1. I notice your goals lack timelines - try SMART criteria\n2. The 1% savings rule could help automate progress\n3. Weekly check-ins would help maintain motivation` 
      : `1. Your weekend spending is 30% higher - try cash envelopes\n2. The 50/30/20 budget could organize your finances\n3. Let's set up auto-transfers to build savings`;
  }

  return response.generated_text;
};

const predictSpending = async (transactions) => {
  const monthlySpending = Array(12).fill(0);
  transactions.forEach((t) => {
    if (t.type === "expense") {
      const month = new Date(t.date).getMonth();
      monthlySpending[month] += t.amount;
    }
  });

  const prompt = `Predict next 3 months spending based on this monthly data:
  ${JSON.stringify(monthlySpending)}
  Return a valid JSON object with this exact structure:
  {
    "predictions": [
      {"month": "January", "amount": 500},
      {"month": "February", "amount": 450},
      {"month": "March", "amount": 600}
    ]
  }`;

  try {
    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: { 
        max_new_tokens: 200,
        temperature: 0.3 // Lower temperature for more structured output
      },
    });

    // Improved JSON parsing with fallback
    try {
      const jsonMatch = response.generated_text.match(/\{.*\}/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Return default predictions if parsing fails
      return {
        predictions: [
          { month: "Next Month", amount: monthlySpending.reduce((a, b) => a + b, 0) / 12 },
          { month: "Following Month", amount: monthlySpending.reduce((a, b) => a + b, 0) / 12 },
          { month: "Month After", amount: monthlySpending.reduce((a, b) => a + b, 0) / 12 }
        ]
      };
    }
  } catch (err) {
    console.error("AI prediction error:", err);
    return { predictions: [] };
  }
};

module.exports = {
  categorizeTransaction,
  generateFinancialAdvice,
  predictSpending,
};
