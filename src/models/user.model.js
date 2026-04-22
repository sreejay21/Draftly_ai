const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  name: String,

  google: {
    accessToken: String,
    refreshToken: String,
    expiryDate: Number
  },

  style: {
    tone: {
      type: String,
      default: 'professional'
    },
    signature: {
      type: String,
      default: ''
    }
  }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)