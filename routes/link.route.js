const express = require('express')

const router = express.Router()
const {
  getLink,
  shortLink,
  createUser,
  getHistory,
} = require('../controllers/link.controller')

router.post('/creatUser', createUser)
router.get('/history', getHistory)
router.get('/:key', getLink)
router.post('/', shortLink)

module.exports = router
