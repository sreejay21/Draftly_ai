require('dotenv').config({ path: '../.env' });

const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const { connectDB } = require('../config/db');
const gmailService = require("../services/gmail.service");
const draftRepo = require("../repositories/draft.repository");
const { enums } = require("../utils/constant");
const { validateDraft } = require("../services/ai/validator.service");
const Audit = require("../models/audit.model");
const { rateLimit } = require("../utils/rateLimiter");

const startWorker = async () => {
  try {
    //  CONNECT DB FIRST
    await connectDB();

    console.log(" Worker started...");

    new Worker(
      "email-sending",
      async (job) => {
        const { draftId } = job.data;

        try {
          console.log("Processing job for draft:", draftId);

          const draft = await draftRepo.findById(draftId);

          if (!draft) {
            throw new Error("Draft not found");
          }

          if (draft.status === enums.sent) {
            console.log("Already sent, skipping:", draftId);
            return;
          }

          if (draft.status !== enums.approved) {
            console.log("Not approved, skipping:", draftId);
            return;
          }

          const body = draft.finalReply || draft.suggestedReply;

          //  Final validation
          const validation = await validateDraft(draft.context, body);

          if (!validation.valid || validation.score < 60) {
            await draftRepo.updateDraft(draftId, {
              status: enums.DraftStatus.REJECTED,
            });

            await Audit.create({
              action: "SEND_BLOCKED",
              userId: draft.userId,
              metadata: {
                draftId,
                reason: validation.reason,
                score: validation.score,
              },
            });

            console.log("Draft blocked by validation:", draftId);
            return;
          }

          // Rate limit
          await rateLimit();

          //  Send email
          await gmailService.sendEmail({
  to: draft.from,
  subject: `Re: ${draft.subject}`,
  body:draft.finalReply || draft.suggestedReply,
  userId: draft.userId,
  messageId: draft.messageId,   
  threadId: draft.threadId      
});

console.log("📧 Email Body:", body);
          await draftRepo.updateDraft(draftId, {
            status: enums.sent,
          });

          await Audit.create({
            action: "EMAIL_SENT",
            userId: draft.userId,
            metadata: { draftId },
          });

          console.log("Email sent successfully:", draftId);

        } catch (err) {
          console.error("Worker error:", err.message);

          await Audit.create({
            action: "EMAIL_SEND_FAILED",
            metadata: {
              draftId: job?.data?.draftId,
              error: err.message,
            },
          });

          throw err; 
        }
      },
      {
        connection,
        concurrency: 3,
      }
    );

  } catch (err) {
    console.error("Worker startup failed:", err.message);
    process.exit(1);
  }
};

startWorker();