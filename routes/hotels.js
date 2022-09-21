import express from 'express'
import {
  creatHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from '../controllers/hotelController.js'
import { createError } from '../utils/error.js'

const router = express.Router()

//CREATE
router.post('/', creatHotel)

//UPDATE
router.put('/:id', updateHotel)

//DELETE
router.delete('/:id', deleteHotel)

//GET
router.get('/:id', getHotel)

//GET ALL
router.get('/', getAllHotels)
export default router
