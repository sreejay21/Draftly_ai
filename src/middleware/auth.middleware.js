const { verifyToken } = require('../jsonWebtoken/jwt')
const response = require('../utils/responseHandler')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return response.unAuthorized(res)
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return response.unAuthorized(res)
    }

    const decoded = verifyToken(token)

    req.userId = decoded.userId

    next()
  } catch (err) {
    return response.unAuthorized(res)
  }
}

module.exports = authMiddleware