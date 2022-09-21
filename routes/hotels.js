import express from 'express'
import {
  creatHotel,
  deleteHotel,
  getHotel,
  updateHotel,
} from '../controllers/hotel.js'
import Hotel from '../models/Hotel.js'
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
router.get('/', async (req, res, next) => {
  try {
    const hotels = await Hotel.find()
    return res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
})
export default router
