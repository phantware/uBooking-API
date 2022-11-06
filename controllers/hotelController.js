import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    setTimeout(() => {
      return res.status(200).json(savedHotel)
    }, 3000)
  } catch (err) {
    next(err)
  }
}

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    setTimeout(() => {
      return res.status(200).json(updateHotel)
    }, 3000)
  } catch (err) {
    next(err)
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    setTimeout(() => {
      return res.status(200).json('Hotel has been deleted')
    }, 3000)
  } catch (err) {
    next()
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    setTimeout(() => {
      return res.status(200).json(hotel)
    }, 3000)
  } catch (err) {
    next(err)
  }
}

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit)
    setTimeout(() => {
      return res.status(200).json(hotels)
    }, 3000)
  } catch (err) {
    next(err)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.city.split(',')
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    setTimeout(() => {
      return res.status(200).json(list)
    }, 3000)
  } catch (err) {
    next(err)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const resortCount = await Hotel.countDocuments({ type: 'resort' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    const carbinCount = await Hotel.countDocuments({ type: 'carbin' })

    return res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'carbins', count: carbinCount },
    ])
  } catch (err) {
    next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    setTimeout(() => {
      res.status(200).json(list)
    }, 3000)
  } catch (err) {
    next(err)
  }
}
