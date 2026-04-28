const { buildEmailReplyPrompt } = require('../prompts/emailReply.prompt')
const openrouter = require('./openrouter.service')

const generateEmailReply = async ({ context, tone, signature, styleContext }) => {
  const prompt = buildEmailReplyPrompt({
    context,
    tone,
    signature,
    styleContext
  })

  const raw = await openrouter.generateReplyFromAI(prompt)

  let parsed

  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    console.error('AI returned invalid JSON:', raw)
    return {
      type: 'SKIP',
      relevance: 0,
      reason: 'Invalid AI response'
    }
  }

  return parsed
}

module.exports = {
  generateEmailReply
}