import User from '../models/User.js'
import bcrypt from 'bcryptjs'
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
