import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import authUsers from './routes/users.js'
import authHotels from './routes/hotels.js'
import authRooms from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// const bodyParser = require('body-parser')

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

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

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', authUsers)
app.use('/api/hotels', authHotels)
app.use('/api/rooms', authRooms)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.status || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'You are welcome to Ubooking API' })
})

app.listen(PORT, () => {
  connect()
  console.log(`App running at port ${PORT}`)
})
