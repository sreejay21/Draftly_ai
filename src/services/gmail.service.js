const { google } = require('googleapis')
const { getOAuthClient } = require('../config/gmail')
const { decrypt } = require('../utils/crypto')
const userRepo = require('../repositories/user.repository')

const getUnreadEmails = async (userId) => {
  const user = await userRepo.findById(userId)

  if (!user || !user.google?.accessToken) {
    throw new Error('User not connected to Gmail')
  }

  const client = getOAuthClient()

  // 🔓 Decrypt tokens
  const accessToken = decrypt(user.google.accessToken)
  const refreshToken = user.google.refreshToken
    ? decrypt(user.google.refreshToken)
    : null

  client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  })

  const gmail = google.gmail({ version: 'v1', auth: client })

  // 📥 Get unread messages
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread',
    maxResults: 10
  })

  const messages = res.data.messages || []

  // 📄 Fetch full details
  const emailDetails = await Promise.all(
    messages.map(async (msg) => {
      const mail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id
      })

      const headers = mail.data.payload.headers

      const getHeader = (name) =>
        headers.find(h => h.name === name)?.value

      return {
        id: msg.id,
        threadId: msg.threadId,
        subject: getHeader('Subject'),
        from: getHeader('From'),
        snippet: mail.data.snippet
      }
    })
  )

  return emailDetails
}

module.exports = {
  getUnreadEmails
}