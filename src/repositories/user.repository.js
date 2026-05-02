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

const getUsersWithTokens = async () => {
  try {
    const users = await User.find({
      "google.accessToken": { $exists: true, $ne: null },
      "google.refreshToken": { $exists: true, $ne: null }
    });

    return users;
  } catch (err) {
    console.error("Error fetching users with tokens:", err.message);
    throw err;
  }
};

module.exports = {
  findById,
  findByEmail,
  createUser,
  getUsersWithTokens,
  updateUserTokens
}