const { successResponse, errorResponse } = require('./swaggerSchemas/common.schema')
const { googleAuthResponse, userInfoResponse } = require('./swaggerSchemas/auth.schema')
const { draftResponse, draftListResponse, unreadEmailsResponse } = require('./swaggerSchemas/draft.schema')

const schemas = {
  successResponse,
  errorResponse,
  googleAuthResponse,
  userInfoResponse,
  draftResponse,
  draftListResponse,
  unreadEmailsResponse
}

module.exports = schemas