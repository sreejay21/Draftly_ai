const Draft = require('../models/draft.model')

const createDraft = async (data) => {
  return await Draft.create(data)
}

const updateDraft = async (id, update) => {
  return await Draft.findByIdAndUpdate(id, update, { new: true })
}

const findByUser = async (userId) => {
  return await Draft.find({ userId }).sort({ createdAt: -1 })
}
const findById = async (id) => {
  return await Draft.findById(id)
}

const isDraftExists = async (messageId) => {
  return await Draft.exists({ messageId })
}

const saveDraft = async (data) => {
  return await Draft.create(data)
}


module.exports = {
  createDraft,
  updateDraft,
  findByUser,
  findById,
  isDraftExists,
  saveDraft
}