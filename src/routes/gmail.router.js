const express = require('express')
const router = express.Router()
const gmailController = require('../controllers/gmail.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.get('/unread', authMiddleware, gmailController.getUnreadEmails)

module.exports = router