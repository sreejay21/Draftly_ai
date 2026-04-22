const authService = require('../services/auth.service')
const response = require('../utils/responseHandler')

const googleLogin = (req, res) => {
  try {
    const url = authService.generateAuthUrl()
    return response.Ok({ url }, res)
  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query

    const result = await authService.handleOAuthCallback(code)

    return response.Ok(result, res)
  } catch (err) {
    console.error(err)
    return response.internalServerError(res, err.message)
  }
}

module.exports = {
  googleLogin,
  googleCallback
}