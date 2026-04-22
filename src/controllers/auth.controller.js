const authService = require('../services/auth.service')
const responseHandler = require('../utils/responseHandler')

const googleLogin = async (req, res) => {
  try {
    const url = authService.generateAuthUrl()
    return res.redirect(url)
  } catch (err) {
    return responseHandler.internalServerError(res, err.message)
  }
}

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query

    if (!code) {
      return responseHandler.badRequest(res)
    }

    const user = await authService.handleOAuthCallback(code)

    return responseHandler.Ok(user, res)
  } catch (err) {
    return responseHandler.internalServerError(res, err.message)
  }
}

module.exports = {
  googleLogin,
  googleCallback
}