const successResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean', example: true },
    responsecode: { type: 'number', example: 200 },
    result: { type: 'object' }
  }
}

const errorResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean', example: false },
    responsecode: { type: 'number', example: 400 },
    error: { type: 'string' }
  }
}

module.exports = {
  successResponse,
  errorResponse
}