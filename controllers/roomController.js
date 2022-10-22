import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const newRoom = new Room(req.body)

  try {
    const savedRoom = await newRoom.save()
    try {
      await Hotel.findOneAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
    } catch (err) {
      next(err)
    }
    return res.status(200).json(savedRoom)
  } catch (err) {
    next(err)
  }
}
