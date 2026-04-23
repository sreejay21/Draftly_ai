// services/draftProcessor.service.js
const draftRepo = require('../repositories/draft.repository')
const aiService = require('./ai.service')
const { buildContext, getHeader } = require('../utils/gmail.helper')
const { getThread } = require('./gmailFetch.service')

const processMessage = async ({ gmail, msg, user }) => {
  const messages = await getThread(gmail, msg.threadId)

  const headers = messages[0].payload.headers
  const context = buildContext(messages)

  // CREATE DRAFT
  let draft = await draftRepo.createDraft({
    userId: user._id,
    messageId: msg.id,
    threadId: msg.threadId,
    subject: getHeader(headers, 'Subject'),
    from: getHeader(headers, 'From'),
    context
  })

  // USER STYLE
  const tone = user.style?.tone || 'professional'
  const signature = user.style?.signature || ''
  const styleContext = user.style?.examples || ''

  // AI CALL
  const reply = await aiService.generateEmailReply({
    context,
    tone,
    signature,
    styleContext
  })

  // UPDATE DRAFT
  draft = await draftRepo.updateDraft(draft._id, {
    suggestedReply: reply,
    status: 'GENERATED'
  })

  return draft
}

module.exports = {
  processMessage
}