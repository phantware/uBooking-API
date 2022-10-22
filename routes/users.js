import express from 'express'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js'
import { createError } from '../utils/error.js'

const router = express.Router()

// router.get('/checkAuth', verifyToken, (req, res, next) => {
//   return res.status(200).json('You are logged in')
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   return res
//     .status(200)
//     .json('Hello User, You are logged in and you can delete your account')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   return res
//     .status(200)
//     .json('Hello Admin, You are logged in and you can delete all accounts')
// })
//UPDATE
router.put('/:id', updateUser)

//DELETE
router.delete('/:id', deleteUser)

//GET
router.get('/:id', getUser)

//GET ALL
router.get('/', getAllUsers)
export default router
