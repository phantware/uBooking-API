import User from '../models/User.js'
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const newUser = new User({
      username,
      email,
      password,
    })
    await newUser.save()
    return res.status(201).json('User has been created successfully.')
  } catch (err) {
    next(err)
  }
}
