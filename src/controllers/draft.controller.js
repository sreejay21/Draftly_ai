const draftRepo = require('../repositories/draft.repository')
const response = require('../utils/responseHandler')

const getUserDrafts = async (req, res) => {
  try {
    const drafts = await draftRepo.findByUser(req.userId)
    return response.Ok(drafts, res)
  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

const approveDraft = async (req, res) => {
  try {
    const draft = await draftRepo.updateDraft(req.params.draftId, {
      status: 'APPROVED',
      finalReply: req.body.finalReply
    })
    return response.Ok(draft, res)
  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

const rejectDraft = async (req, res) => {
  try {
    const draft = await draftRepo.updateDraft(req.params.draftId, {
      status: 'REJECTED'
    })
    return response.Ok(draft, res)
  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

const editDraft = async (req, res) => {
  try {
    const draft = await draftRepo.updateDraft(req.params.draftId, {
      suggestedReply: req.body.reply
    })
    return response.Ok(draft, res)
  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

module.exports = {
  getUserDrafts,
  approveDraft,
  rejectDraft,
  editDraft
}