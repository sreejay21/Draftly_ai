const { google } = require('googleapis')
const { getOAuthClient } = require('../config/gmail')
const userRepo = require('../repositories/user.repository')
const { encrypt } = require('../utils/crypto')
const { generateToken } = require('../jsonWebtoken/jwt')

const generateAuthUrl = () => {
  const client = getOAuthClient()

  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send'
    ]
  })
}

const handleOAuthCallback = async (code) => {
  const client = getOAuthClient()

  // 🔥 Step 1: Get tokens
  const { tokens } = await client.getToken(code)
  console.log('TOKENS:', tokens)

  if (!tokens.access_token) {
    throw new Error('No access token received from Google')
  }

  // 🔥 Step 2: Set credentials
  client.setCredentials(tokens)

  // 🔥 Step 3: Fetch user info
  const userInfoResponse = await client.request({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo'
  })

  const data = userInfoResponse.data

  // 🔥 Step 4: Find or create user
  let user = await userRepo.findByEmail(data.email)

  if (!user) {
    user = await userRepo.createUser({
      email: data.email,
      name: data.name
    })
  }

  // 🔥 Step 5: Save tokens
  const updateData = {
    'google.accessToken': encrypt(tokens.access_token),
    'google.expiryDate': tokens.expiry_date
  }

  if (tokens.refresh_token) {
    updateData['google.refreshToken'] = encrypt(tokens.refresh_token)
  }

  user = await userRepo.updateUserTokens(user._id, updateData)

  // 🔥 Step 6: Generate JWT
  const token = generateToken({
    userId: user._id
  })

  // 🔥 Step 7: Return BOTH user + token
  return {
    user,
    token
  }
}

module.exports = {
  generateAuthUrl,
  handleOAuthCallback
}