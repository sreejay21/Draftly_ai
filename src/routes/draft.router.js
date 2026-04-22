const express = require('express')
const router = express.Router()

const draftController = require('../controllers/draft.controller')
// const authMiddleware = require('../middleware/auth.middleware')

router.get('/', draftController.getUserDrafts)
router.put('/approve/:draftId', draftController.approveDraft)
router.put('/reject/:draftId', draftController.rejectDraft)
router.put('/edit/:draftId', draftController.editDraft)

module.exports = router