// services/gmailClient.service.js
const { google } = require('googleapis')
const { getOAuthClient } = require('../config/gmail')
const { decrypt } = require('../utils/crypto')

const getGmailClient = (user) => {
  const client = getOAuthClient()

  client.setCredentials({
    access_token: decrypt(user.google.accessToken),
    refresh_token: decrypt(user.google.refreshToken)
  })

  return google.gmail({ version: 'v1', auth: client })
}

module.exports = { getGmailClient }