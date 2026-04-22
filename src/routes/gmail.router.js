const express = require('express')
const router = express.Router()
const gmailController = require('../controllers/gmail.controller')

router.get('/unread', gmailController.getUnreadEmails)

module.exports = router