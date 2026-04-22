const gmailService = require('../services/gmail.service')
const response = require('../utils/responseHandler')

const getUnreadEmails = async (req, res) => {
  try {
    const userId = "69de37979c332d151e557183"

    const emails = await gmailService.getUnreadEmails(userId)

    return response.Ok(emails, res)
  } catch (err) {
    console.error(err)
    return response.internalServerError(res, err.message)
  }
}

module.exports = {
  getUnreadEmails
}