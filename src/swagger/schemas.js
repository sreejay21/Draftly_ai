const { successResponse, errorResponse } = require('./swaggerSchemas/common.schema')
const { googleAuthResponse } = require('./swaggerSchemas/auth.schema')
const { draftResponse } = require('./swaggerSchemas/draft.schema')

const schemas = {
  successResponse,
  errorResponse,
  googleAuthResponse,
  draftResponse
}

module.exports = schemas