const { Queue } = require('bullmq')
const { connection } = require('../config/redis')

const sendQueue = new Queue('email-sending', { connection })

module.exports = {
  sendQueue
}