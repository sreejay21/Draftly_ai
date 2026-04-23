
const getUnreadMessages = async (gmail) => {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread',
    maxResults: 5
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