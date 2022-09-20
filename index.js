import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

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

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'You are welcome to Ubooking API' })
})

app.listen(PORT, () => {
  connect()
  console.log('Connected to backend.')
})
