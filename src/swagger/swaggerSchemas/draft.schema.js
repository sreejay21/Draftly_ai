const draftResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean' },
    responsecode: { type: 'number' },
    result: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        subject: { type: 'string' },
        emailBody: { type: 'string' },
        suggestedReply: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }
}

module.exports = {
  draftResponse
}