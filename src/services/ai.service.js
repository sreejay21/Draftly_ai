const { buildEmailReplyPrompt } = require('../prompts/emailReply.prompt')
const openrouter = require('./openrouter.service')

const generateEmailReply = async ({ context, tone, signature, styleContext }) => {
  const prompt = buildEmailReplyPrompt({
    context,
    tone,
    signature,
    styleContext
  })

  const reply = await openrouter.generateReplyFromAI(prompt)

  return reply
}

module.exports = {
  generateEmailReply
}