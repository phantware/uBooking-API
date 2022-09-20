import express from 'express'

const router = express.Router()

//CREATE
router.post('/', (req, res) => {
  return res.status(200).json({ msg: 'This is our auth path' })
})
//UPDATE
//DELTE
//GET
//GET ALL

router.get('/', (req, res) => {
  return res.status(200).json({ msg: 'This is our auth path' })
})

export default router
