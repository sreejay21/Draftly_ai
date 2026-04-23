// services/gmail.service.js
const userRepo = require('../repositories/user.repository')
const { getGmailClient } = require('./gmailClient.service')
const { getUnreadMessages } = require('../services/gmailFetch.service')
const { processMessage } = require('./draftProcessor.service')

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

  return results
}

module.exports = {
  getUnreadEmails
}