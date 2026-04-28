const { Worker, connection } = require('../config/redis')
const gmailService = require('../services/gmail.service')
const draftRepo = require('../repositories/draft.repository')
const { enums } = require('../utils/constant')

new Worker(
  'email-sending',
  async (job) => {
    const { draftId } = job.data

    const draft = await draftRepo.findById(draftId)
    if (!draft) return

    if (draft.status === enums.DraftStatus.SENT) return

    const body = draft.finalReply || draft.suggestedReply

    await gmailService.sendEmail({
      to: draft.from,
      subject: `Re: ${draft.subject}`,
      body,
      userId: draft.userId
    })

    await draftRepo.updateDraft(draftId, {
      status: enums.DraftStatus.SENT
    })

    console.log(`Email sent for draft: ${draftId}`)
  },
  { connection }
)