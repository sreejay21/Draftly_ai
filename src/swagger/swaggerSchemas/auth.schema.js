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

module.exports = {
  googleAuthResponse
}