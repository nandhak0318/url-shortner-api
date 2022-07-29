const mongoose = require('mongoose')

const LinkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, 'link cannot be empty'],
  },
  key: {
    type: String,
  },
  hits: {
    type: Number,
    required: [
      true,
      `you must enter the number of hits, If you need unlimited hits enter -1. `,
    ],
  },
  createdBy: { type: String, ref: 'User' },
  givenHits: Number,
  clicks: [Date],
  createdAt: {
    type: Number,
  },
  isExpires: { type: Boolean, default: false },
  expires: {
    type: Number,
    required: [true, `you need to specify the expire time`],
  },
})

LinkSchema.index({ key: 'text' })
module.exports = mongoose.model('Link', LinkSchema)
