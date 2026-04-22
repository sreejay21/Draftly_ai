const { google } = require('googleapis')

const getOAuthClient = () => {
  console.log('CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
  console.log('CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET)
  console.log('REDIRECT_URI:', process.env.REDIRECT_URI)

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  )
}

module.exports = {
  getOAuthClient
}