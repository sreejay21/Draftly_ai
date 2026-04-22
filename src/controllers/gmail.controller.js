const gmailService = require('../services/gmail.service')
const response = require('../utils/responseHandler')

const getUnreadEmails = async (req, res) => {
  try {
    const data = await gmailService.getUnreadEmails("69de37979c332d151e557183")
    return response.Ok(data, res)
  } catch (err) {
    console.error(err)
    return response.internalServerError(res, err.message)
  }
}

module.exports = {
  getUnreadEmails
}