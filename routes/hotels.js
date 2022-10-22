import express from 'express'
import {
  creatHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from '../controllers/hotelController.js'
import { createError } from '../utils/error.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//CREATE
router.post('/', verifyAdmin, creatHotel)

//UPDATE
router.put('/:id', verifyAdmin, updateHotel)

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

//GET
router.get('/:id', getHotel)

//GET ALL
router.get('/', getAllHotels)
export default router
