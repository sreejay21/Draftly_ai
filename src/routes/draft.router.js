const express = require('express')
const router = express.Router()

const draftController = require('../controllers/draft.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, draftController.getUserDrafts)
router.put('/approve/:draftId', authMiddleware, draftController.approveDraft)
router.put('/reject/:draftId', authMiddleware, draftController.rejectDraft)
router.put('/edit/:draftId', authMiddleware, draftController.editDraft)

module.exports = router