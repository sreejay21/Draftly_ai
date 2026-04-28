const enums = {
  pending: 'pending',
  generated: 'generated',
  approved: 'approved',
  rejected: 'rejected'
}

const ErrorMessages = {
  DRAFT_NOT_FOUND: 'Draft not found',
  ALREADY_SENT: 'Already sent'
}

const responseMessages = {
  QueuedForSending: 'Queued for sending',
  NoRelevantEmails: 'No relevant emails found (threshold: 85%)',
  DraftsGeneratedSuccessfully: 'Drafts generated successfully'
}

const isNoReply = (email = '') => {
  const lower = email.toLowerCase()

  return (
    lower.includes('no-reply') ||
    lower.includes('noreply') ||
    lower.includes('do-not-reply') ||
    lower.includes('donotreply') ||
    lower.includes('jobalerts') ||
    lower.includes('notifications') ||
    lower.includes('alerts')
  )
}

module.exports = {
  enums,
  ErrorMessages,
  responseMessages,
  isNoReply
}

