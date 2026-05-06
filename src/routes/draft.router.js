const express = require('express')
const router = express.Router()

const draftController = require('../controllers/draft.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * tags:
 *   name: Drafts
 *   description: Draft review and management
 */

/**
 * @swagger
 * /api/drafts:
 *   get:
 *     summary: Get all drafts for the authenticated user
 *     tags: [Drafts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of drafts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/draftListResponse'
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
router.get('/', authMiddleware, draftController.getUserDrafts)

/**
 * @swagger
 * /api/drafts/approve/{draftId}:
 *   put:
 *     summary: Approve a draft and queue it for sending
 *     tags: [Drafts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: draftId
 *         required: true
 *         schema:
 *           type: string
 *         description: Draft ID to approve
 *     responses:
 *       200:
 *         description: Draft approved and queued for sending
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/successResponse'
 *       400:
 *         description: Bad request or draft not found
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
router.put('/approve/:draftId', authMiddleware, draftController.approveDraft)

/**
 * @swagger
 * /api/drafts/reject/{draftId}:
 *   put:
 *     summary: Reject a draft
 *     tags: [Drafts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: draftId
 *         required: true
 *         schema:
 *           type: string
 *         description: Draft ID to reject
 *     responses:
 *       200:
 *         description: Draft rejected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/draftResponse'
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
router.put('/reject/:draftId', authMiddleware, draftController.rejectDraft)

/**
 * @swagger
 * /api/drafts/edit/{draftId}:
 *   put:
 *     summary: Edit a draft's suggested reply
 *     tags: [Drafts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: draftId
 *         required: true
 *         schema:
 *           type: string
 *         description: Draft ID to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: New suggested reply text
 *             required:
 *               - body
 *     responses:
 *       200:
 *         description: Draft updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/draftResponse'
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
router.put('/edit/:draftId', authMiddleware, draftController.editDraft)

module.exports = router