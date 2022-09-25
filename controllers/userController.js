import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    return res.status(200).json(updateUser)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json('User has been deleted')
  } catch (err) {
    next()
  }
}

export const getUser = async (req, res, next) => {
  try {
    const User = await User.findById(req.params.id)
    return res.status(200).json(User)
  } catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find()
    return res.status(200).json(Users)
  } catch (err) {
    next(err)
  }
}
