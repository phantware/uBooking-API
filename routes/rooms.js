import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json({ msg: 'This is our auth path' })
})

export default router
