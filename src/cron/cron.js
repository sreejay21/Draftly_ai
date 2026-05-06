const cron = require("node-cron");
const { processNewEmails } = require("../queues/jobs/processNewEmails");

let isRunning = false;

const startCron = () => {
  console.log("🕒 Cron started...");

  cron.schedule("*/2 * * * *", async () => {
    if (isRunning) {
      console.log("⚠️ Previous job still running, skipping...");
      return;
    }

    isRunning = true;

    console.log("🚀 Running email sync job...");

    try {
      await processNewEmails();
      console.log("✅ Cron job completed");
    } catch (err) {
      console.error("❌ Cron error:", err);
    } finally {
      isRunning = false;
    }
  });
};

module.exports = { startCron };