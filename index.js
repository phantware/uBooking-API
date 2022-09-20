import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import authUsers from './routes/users.js'
import authHotels from './routes/hotels.js'
import authRooms from './routes/rooms.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8800
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to mongoDB.')
  } catch (error) {
    throw error
  }
}
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!')
})

// Middleware
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', authUsers)
app.use('/api/hotels', authHotels)
app.use('/api/room', authRooms)

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'You are welcome to Ubooking API' })
})

app.listen(PORT, () => {
  connect()
  console.log(`App running at port ${PORT}`)
})
