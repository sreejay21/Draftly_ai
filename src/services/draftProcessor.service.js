// services/draftProcessor.service.js

const draftRepo = require('../repositories/draft.repository')
const aiService = require('./ai.service')
const { buildContext, getHeader } = require('../utils/gmail.helper')
const { getThread } = require('./gmailFetch.service')
const {enums, isNoReply} = require('../utils/constant')

const processMessage = async ({ gmail, msg, user }) => {
  const messages = await getThread(gmail, msg.threadId)

  const headers = messages[0].payload.headers
  const context = buildContext(messages)

  const subject = getHeader(headers, 'Subject')
  const from = getHeader(headers, 'From')

  // USER STYLE
  const tone = user.style?.tone || 'professional'
  const signature = user.style?.signature || ''
  const styleContext = user.style?.examples || ''

  // 🤖 AI CALL (NOW RETURNS JSON)
  const aiResult = await aiService.generateEmailReply({
    context,
    tone,
    signature,
    styleContext
  })

  // 🚫 HANDLE SENSITIVE
  if (aiResult.type === 'SENSITIVE') {
    console.log('🚫 Skipped sensitive email:', subject)
    return null
  }

  // ⏭ HANDLE LOW RELEVANCE
  if (aiResult.type === 'SKIP') {
    console.log(`⏭ Skipped low relevance (${aiResult.relevance}):`, subject)
    return null
  }

  // ONLY NOW CREATE DRAFT
  if (aiResult.type === 'DRAFT') {
    const draft = await draftRepo.createDraft({
      userId: user._id,
      messageId: msg.id,
      threadId: msg.threadId,
      subject,
      from,
      context,
      suggestedReply: aiResult.reply,
      relevanceScore: aiResult.relevance,
      status: enums.generated
    })

    // Skip no-reply emails
    if (isNoReply(from)) {
      console.log('⏭ Skipped no-reply email:', subject)
      await draftRepo.updateStatus(draft._id, enums.rejected)
      return null
    }

    console.log(` Draft created (${aiResult.relevance}%):`, subject)

    return draft
  }

  // fallback
  console.log('⚠️ Unknown AI response, skipping')
  return null
}

module.exports = {
  processMessage
}