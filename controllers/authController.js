import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      email,
      password: hash,
    })
    await newUser.save()
    return res.status(201).json('User has been created successfully.')
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return next(createError(404, 'User not found'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong Username or Password'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}
