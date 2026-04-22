const User = require('../models/user.model')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async (data) => {
  return await User.create(data)
}

const updateUserTokens = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  )
}

module.exports = {
  findById,
  findByEmail,
  createUser,
  updateUserTokens
}