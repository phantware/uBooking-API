import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js'
import { createError } from '../utils/error.js'

const router = express.Router()

router.get('/:checkAuth', verifyToken, (req, res, next) => {
  return res.status(200).json('You are logged in')
})

//UPDATE
router.put('/:id', updateUser)

//DELETE
router.delete('/:id', deleteUser)

//GET
router.get('/:id', getUser)

//GET ALL
router.get('/', getAllUsers)
export default router
