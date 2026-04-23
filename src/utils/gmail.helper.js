
const extractBody = (payload) => {
  if (!payload) return ''

  if (payload.parts) {
    const part = payload.parts.find(p => p.mimeType === 'text/plain')
    if (part?.body?.data) {
      return Buffer.from(part.body.data, 'base64').toString('utf-8')
    }
  }

  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8')
  }

  return ''
}

const getHeader = (headers, name) => {
  return headers.find(h => h.name === name)?.value || ''
}

const buildContext = (messages) => {
  return messages.map(m => {
    const headers = m.payload.headers
    const from = getHeader(headers, 'From')
    const body = extractBody(m.payload)

    return `From: ${from}\n${body}`
  }).join('\n\n---\n\n')
}

module.exports = {
  extractBody,
  getHeader,
  buildContext
}