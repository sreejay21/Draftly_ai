const mongoose = require('mongoose')
const {enums} = require('../utils/constant')

const draftSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  messageId: String,
  threadId: String,

  subject: String,
  from: String,

  context: String, 

  suggestedReply: String,
  finalReply: String,

  status: {
    type: String,
    enum: [enums.pending, enums.generated, enums.approved, enums.rejected,],
    default: enums.pending
  }

}, { timestamps: true })

module.exports = mongoose.model('Draft', draftSchema)