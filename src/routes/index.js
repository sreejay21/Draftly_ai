const express = require('express')
const router = express.Router()
const AuthRouter = require('./auth.routes')
const gmailRouter = require('./gmail.router')
const draftRouter = require('./draft.router')



router.use('/auth', AuthRouter)
router.use('/gmail', gmailRouter)
router.use('/drafts', draftRouter)

/**
 * @swagger
 * tags:
 *   name: System
 *   description: System health and status
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns server health information.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Draftly API is running
 */
router.get('/health', (req, res) => {
  res.send('Draftly API is running')
})

module.exports = router