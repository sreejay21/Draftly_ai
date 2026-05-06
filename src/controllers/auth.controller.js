const authService = require('../services/auth.service')
const response = require('../utils/responseHandler')
const userRepo = require('../repositories/user.repository')

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
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    return res.redirect(`${frontendUrl}/auth/callback?token=${result.token}`)
  } catch (err) {
    console.error(err)
    return response.internalServerError(res, err.message)
  }
}

const getMe = async (req, res) => {
  try {
    const user = await userRepo.findById(req.userId)
    if (!user) {
      return response.notFound(res)
    }

    return response.Ok({ user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    } }, res)
  } catch (err) {
    console.error(err)
    return response.internalServerError(res, err.message)
  }
}

module.exports = {
  googleLogin,
  googleCallback,
  getMe,
}