const generateEmailReply = async ({ context, tone, signature }) => {
  // 🔥 MOCK AI (replace later with OpenRouter)

  return `
Hi,

Based on the conversation below:

${context}

This is a ${tone} response.

${signature}
`
}

module.exports = {
  generateEmailReply
}