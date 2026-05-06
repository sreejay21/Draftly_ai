const userRepo = require('../repositories/user.repository')
const { getGmailClient } = require('./gmailClient.service')
const { getUnreadMessages } = require('../services/gmailFetch.service')
const { processMessage } = require('./draftProcessor.service')
const { responseMessages } = require('../utils/constant')
const { getOAuthClient } = require('../config/gmail')
const { decrypt } = require('../utils/crypto')
const { google } = require('googleapis')
const { isDraftExists, saveDraft } = require('../repositories/draft.repository')


// ================== GET UNREAD EMAILS  ==================
const getUnreadEmails = async (userId) => {
  const user = await userRepo.findById(userId)

  if (!user || !user.google) {
    throw new Error('User Gmail not connected')
  }

  const gmail = getGmailClient(user)
  const messages = await getUnreadMessages(gmail)

  let drafts = []
  let totalProcessed = 0
  for (const msg of messages) {
    const messageId = msg.id
    totalProcessed++

    try {
      //Duplicate protection
      const exists = await isDraftExists(messageId)
      if (exists) {
        console.log(`⏭️ Skipping duplicate: ${messageId}`)
        continue
      }

      // Process message
      const draft = await processMessage({
        gmail,
        msg,
        user
      })

      if (!draft) continue

      // Save draft
      await saveDraft({
        userId: user._id,
        messageId,
        threadId: msg.threadId,
        ...draft
      })

      drafts.push(draft)

      // Mark email as READ
      await gmail.users.messages.modify({
        userId: 'me',
        id: messageId,
        requestBody: {
          removeLabelIds: ['UNREAD']
        }
      })

      console.log(`Processed: ${messageId}`)

    } catch (err) {
      console.error(`Error processing ${messageId}:`, err.message)
    }
  }

  if (drafts.length === 0) {
    return {
      message: responseMessages.NoRelevantEmails,
      drafts: [],
      totalProcessed,
      draftsCreated: 0
    }
  }

  return {
    message: responseMessages.DraftsGeneratedSuccessfully,
    drafts,
    totalProcessed,
    draftsCreated: drafts.length
  }
}


// ================== SEND EMAIL ==================
const sendEmail = async ({
  to,
  subject,
  body,
  userId,
  messageId,
  threadId
}) => {
  const user = await userRepo.findById(userId);

  const client = getOAuthClient();

  client.setCredentials({
    access_token: decrypt(user.google.accessToken),
    refresh_token: decrypt(user.google.refreshToken)
  });

  const gmail = google.gmail({ version: 'v1', auth: client });

  //  Ensure body is valid
  let cleanBody = (body || "").trim();

  if (!cleanBody) {
    throw new Error("Email body is empty");
  }

  //  Proper MIME message 
  const message = [
    `To: ${to}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    `Subject: ${subject}`,
    messageId ? `In-Reply-To: ${messageId}` : '',
    messageId ? `References: ${messageId}` : '',
    '',
    cleanBody
  ]
    .filter(Boolean)
    .join('\r\n');

  // Correct encoding 
  const encodedMessage = Buffer.from(message)
    .toString('base64url'); 

  // Send email
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId: threadId || undefined
    }
  });

  console.log("📧 Email sent with body:", cleanBody);
};

module.exports = {
  getUnreadEmails,
  sendEmail
}