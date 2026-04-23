const axios = require('axios')

const generateReplyFromAI = async (prompt) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1',
      {
        model: 'openai/gpt-4o-mini', // fast + cheap
        messages: [
          {
            role: 'system',
            content: 'You are an intelligent email assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (err) {
    console.error('OpenRouter Error:', err.response?.data || err.message)
    throw new Error('AI generation failed')
  }
}

module.exports = {
  generateReplyFromAI
}