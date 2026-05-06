const draftItem = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    subject: { type: 'string' },
    emailBody: { type: 'string' },
    suggestedReply: { type: 'string' },
    status: { type: 'string' },
    finalReply: { type: 'string' }
  }
}

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

const draftListResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean' },
    responsecode: { type: 'number' },
    result: {
      type: 'array',
      items: draftItem
    }
  }
}

const unreadEmailsResponse = {
  type: 'object',
  properties: {
    status: { type: 'boolean' },
    responsecode: { type: 'number' },
    result: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        drafts: {
          type: 'array',
          items: draftItem
        },
        totalProcessed: { type: 'number' },
        draftsCreated: { type: 'number' }
      }
    }
  }
}

module.exports = {
  draftResponse,
  draftListResponse,
  unreadEmailsResponse
}