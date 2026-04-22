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

module.exports = {
  createDraft,
  updateDraft,
  findByUser
}