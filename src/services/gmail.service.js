const userRepo = require('../repositories/user.repository')
const { getGmailClient } = require('./gmailClient.service')
const { getUnreadMessages } = require('../services/gmailFetch.service')
const { processMessage } = require('./draftProcessor.service')
const {responseMessages} = require('../utils/constant')

const getUnreadEmails = async (userId) => {
  const user = await userRepo.findById(userId)

  if (!user || !user.google) {
    throw new Error('User Gmail not connected')
  }

  const gmail = getGmailClient(user)

  const messages = await getUnreadMessages(gmail)

  const results = await Promise.all(
    messages.map(msg =>
      processMessage({
        gmail,
        msg,
        user
      })
    )
  )
  const filteredResults = results.filter(Boolean)

    if (filteredResults.length === 0) {
      return {
        message: responseMessages.NoRelevantEmails,
        drafts: [],
        totalProcessed: results.length,
        draftsCreated: 0
      }
    }

    return {
      message: responseMessages.DraftsGeneratedSuccessfully,
      drafts: filteredResults,
      totalProcessed: results.length,
      draftsCreated: filteredResults.length
    }
}

const sendEmail = async ({ to, subject, body, userId }) => {
  const user = await userRepo.findById(userId)

  const client = getOAuthClient()

  client.setCredentials({
    access_token: decrypt(user.google.accessToken),
    refresh_token: decrypt(user.google.refreshToken)
  })

  const gmail = google.gmail({ version: 'v1', auth: client })

  const message = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    `Subject: ${subject}`,
    '',
    body
  ].join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  })
}

module.exports = {
  getUnreadEmails,
  sendEmail
}