const { sendQueue } = require("../email.queue");

const queueSendEmail = async ({ draftId, priority = 1 }) => {
  return sendQueue.add(
    "send-email",
    { draftId },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      priority,
      removeOnComplete: true,
    }
  );
};

module.exports = { queueSendEmail };