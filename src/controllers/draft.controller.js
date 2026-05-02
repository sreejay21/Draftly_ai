  const draftRepo = require('../repositories/draft.repository')
  const response = require('../utils/responseHandler')
  const {enums,ErrorMessages } = require('../utils/constant')
  const { queueSendEmail } = require('../queues/jobs/sendEmail.job')
  const { validateDraft } = require('../services/ai/validator.service')

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
    const { draftId } = req.params;

    const draft = await draftRepo.findById(draftId);

    if (!draft) {
      return response.badRequest(res, ErrorMessages.DRAFT_NOT_FOUND);
    }

    if (draft.status === enums.sent) {
      return response.badRequest(res, ErrorMessages.ALREADY_SENT);
    }

    //  Run validation
    const validation = await validateDraft(
      draft.context,
      draft.suggestedReply
    );

    
    if ((!validation.valid || validation.score < 60)) {
      return response.Ok({
        warning: true,
        message: "Draft may have issues",
        validation,
        draft
      }, res);
    }

    // Proceed with approval
    const updatedDraft = await draftRepo.updateDraft(draftId, {
      status: enums.approved,
      finalReply: draft.suggestedReply,
      validation
    });

    //  Queue email
    await queueSendEmail({
      draftId,
      priority: 3
    });

    return response.Ok({
      message: "Queued for sending",
      draft: updatedDraft
    }, res);

  } catch (err) {
    return response.internalServerError(res, err.message);
  }
};

  const rejectDraft = async (req, res) => {
    try {
      const draft = await draftRepo.updateDraft(req.params.draftId, {
        status: enums.rejected
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