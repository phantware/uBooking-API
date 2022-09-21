import express from 'express'
import { creatHotel, deleteHotel, updateHotel } from '../controllers/hotel.js'
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
router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    return res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
})

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
