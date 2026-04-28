const { sendQueue } = require('../email.queue')

const queueSendEmail = async (draftId) => {
  return await sendQueue.add(
    'send-email',
    { draftId },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000
      },
      removeOnComplete: true
    }
  )
}

module.exports = {
  queueSendEmail
}