const { getUsersWithTokens } = require("../../repositories/user.repository");
const { getUnreadEmails } = require("../../services/gmail.service");

const processNewEmails = async () => {
  const users = await getUsersWithTokens();

  console.log(`👥 Found ${users.length} users`);

  for (const user of users) {
    try {
      console.log(`➡️ Processing user: ${user._id}`);

      const result = await getUnreadEmails(user._id);

      console.log(
        `📊 User ${user._id}: Processed ${result.totalProcessed}, Drafts ${result.draftsCreated}`
      );

    } catch (err) {
      console.error(`❌ Error for user ${user._id}:`, err.message);
    }
  }
};

module.exports = { processNewEmails };