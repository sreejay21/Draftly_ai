const buildEmailReplyPrompt = ({ context, tone, signature, styleContext }) => {
  return `
You are an intelligent email assistant.

Your task is to write a reply to the email thread below.

----------------------
EMAIL THREAD:
${context}
----------------------

INSTRUCTIONS:
- Understand the full conversation before replying
- Reply ONLY to the latest email
- Keep the response concise and relevant
- Maintain a ${tone} tone
- Do not repeat the original message
- Do not add unnecessary explanations
- Make the reply sound natural and human-like

${styleContext ? `
USER WRITING STYLE EXAMPLES:
${styleContext}

- Try to match this writing style
` : ''}

${signature ? `
SIGNATURE:
${signature}
- Always include this at the end
` : ''}

OUTPUT:
Only return the email reply text. No extra text, no labels.
`
}

module.exports = {
  buildEmailReplyPrompt
}