const googleAuthResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean', example: true },
    responsecode: { type: 'number', example: 200 },
    result: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' }
      }
    }
  }
}

const userInfoResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean', example: true },
    responsecode: { type: 'number', example: 200 },
    result: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  }
}

module.exports = {
  googleAuthResponse,
  userInfoResponse
}