const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gmail OAuth authentication
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirect user to Google OAuth
 *     description: Initiates Gmail OAuth login flow
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Redirects to Google login
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/google', controller.googleLogin)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get authenticated user profile
 *     description: Returns the current authenticated user's basic profile information.
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userInfoResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/me', authMiddleware, controller.getMe)

/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles Google OAuth callback and stores tokens
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from Google
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/googleAuthResponse'
 *       400:
 *         description: Bad request
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
router.get('/callback', controller.googleCallback)

module.exports = router