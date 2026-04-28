
const getUnreadMessages = async (gmail) => {
  const res = await gmail.users.messages.list({
    userId: 'me',
    //q: 'is:unread',
    // q:'is:unread newer_than:1d',
    q:'is:inbox is:unread',
    // q: `after:${lastTimestamp}`
    maxResults: 10
  })

  return res.data.messages || []
}

const getThread = async (gmail, threadId) => {
  const res = await gmail.users.threads.get({
    userId: 'me',
    id: threadId
  })

  return res.data.messages
}

module.exports = {
  getUnreadMessages,
  getThread
}