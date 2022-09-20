import express from 'express'
import Hotel from '../models/Hotel.js'

const router = express.Router()

//CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    return res.status(200).json(savedHotel)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    return res.status(200).json(updateHotel)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    return res.status(200).json('Hotel has been deleted')
  } catch (err) {
    return res.status(500).json(err)
  }
})

//GET
router.get('/:id', (req, res) => {
  const hotel = Hotel.findById(req.params.id)
  try {
    return res.status(200).json(hotel)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//GET ALL
router.get('/', (req, res) => {
  const hotels = Hotel.find()
  try {
    return res.status(200).json(hotels)
  } catch (err) {
    return res.status(500).json(err)
  }
})
export default router
