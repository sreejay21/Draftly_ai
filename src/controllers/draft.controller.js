const draftRepo = require('../repositories/draft.repository')
const response = require('../utils/responseHandler')
const {enums,ErrorMessages } = require('../utils/constant')
const { queueSendEmail } = require('../queues/jobs/sendEmail.job')

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
    const { draftId } = req.params

    const draft = await draftRepo.findById(draftId)
    if (!draft) {
      return response.badRequest(res, ErrorMessages.DRAFT_NOT_FOUND)
    }

    if (draft.status === enums.DraftStatus.SENT) {
      return response.badRequest(res, ErrorMessages.ALREADY_SENT)
    }

    // Update draft
    const updatedDraft = await draftRepo.updateDraft(draftId, {
      status: enums.DraftStatus.APPROVED,
      finalReply: req.body.finalReply || draft.suggestedReply
    })
    await queueSendEmail(draftId)

    return response.Ok({
      message: 'Queued for sending',
      draft: updatedDraft
    }, res)

  } catch (err) {
    return response.internalServerError(res, err.message)
  }
}

const rejectDraft = async (req, res) => {
  try {
    const draft = await draftRepo.updateDraft(req.params.draftId, {
      status: enums.DraftStatus.REJECTED
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