const { google } = require('googleapis')
const { getOAuthClient } = require('../config/gmail')
const { decrypt } = require('../utils/crypto')
const userRepo = require('../repositories/user.repository')
const draftRepo = require('../repositories/draft.repository')
const aiService = require('./ai.service')

const extractBody = (payload) => {
  let body = ''

  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8')
        break
      }
    }
  } else if (payload.body?.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8')
  }

  return body
}

const getHeader = (headers, name) => {
  return headers.find(h => h.name === name)?.value
}

const getUnreadEmails = async (userId) => {
  const user = await userRepo.findById(userId)

  const client = getOAuthClient()

  client.setCredentials({
    access_token: decrypt(user.google.accessToken),
    refresh_token: decrypt(user.google.refreshToken)
  })

  const gmail = google.gmail({ version: 'v1', auth: client })

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread',
    maxResults: 5
  })

  const messages = res.data.messages || []

  const results = await Promise.all(
    messages.map(async (msg) => {

      // GET THREAD
      const thread = await gmail.users.threads.get({
        userId: 'me',
        id: msg.threadId
      })

      // BUILD CONTEXT
      const context = thread.data.messages.map(m => {
        const headers = m.payload.headers
        const from = getHeader(headers, 'From')
        const body = extractBody(m.payload)

        return `From: ${from}\n${body}`
      }).join('\n\n---\n\n')

      const headers = thread.data.messages[0].payload.headers

      //  CREATE DRAFT
      let draft = await draftRepo.createDraft({
        userId,
        messageId: msg.id,
        threadId: msg.threadId,
        subject: getHeader(headers, 'Subject'),
        from: getHeader(headers, 'From'),
        context
      })

      // USER STYLE
      const tone = user.style?.tone || 'professional'
      const signature = user.style?.signature || ''

      // AI GENERATION
      const reply = await aiService.generateEmailReply({
        context,
        tone,
        signature
      })

      // UPDATE DRAFT
      draft = await draftRepo.updateDraft(draft._id, {
        suggestedReply: reply,
        status: 'GENERATED'
      })

      return draft
    })
  )

  return results
}

module.exports = {
  getUnreadEmails
}