const express = require('express')
const router = express.Router()
const gmailController = require('../controllers/gmail.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * tags:
 *   name: Gmail
 *   description: Gmail email ingestion and processing
 */

/**
 * @swagger
 * /api/gmail/unread:
 *   get:
 *     summary: Fetch unread Gmail messages and generate drafts
 *     tags: [Gmail]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Unread email drafts generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unreadEmailsResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/unread', authMiddleware, gmailController.getUnreadEmails)

module.exports = router