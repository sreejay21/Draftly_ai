const axios = require("axios");

const validateDraft = async (context, draft) => {
  try {
    const prompt = `
You are an email validation assistant.

Check if the below draft is a correct reply.

CONTEXT:
${context}

DRAFT:
${draft}

Rules:
- Must be relevant to context
- Must not hallucinate
- Must be a proper reply
- Must be professional

Return ONLY JSON:
{
  "valid": true/false,
  "score": number (0-100),
  "reason": "short reason"
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Return only JSON" },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let result = response.data.choices[0].message.content;

    // Clean markdown if present
    result = result.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(result);

    return parsed;

  } catch (err) {
    console.error("Validator Error:", err.message);

    return {
      valid: false,
      score: 0,
      reason: "Validation failed"
    };
  }
};

module.exports = { validateDraft };