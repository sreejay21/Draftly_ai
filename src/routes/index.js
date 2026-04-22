const express = require('express')
const router = express.Router()
const AuthRouter = require('./auth.routes')
const gmailRouter = require('./gmail.router')




router.use('/auth', AuthRouter)
router.use('/gmail', gmailRouter)

router.get('/health', (req, res) => {
  res.send('Draftly API is running')
})

module.exports = router