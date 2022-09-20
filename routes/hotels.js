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
//GET
//GET ALL

router.get('/', (req, res) => {
  return res.status(200).json({ msg: 'This is our auth path' })
})

export default router
