const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  uid: Number,
  ip: String,
  links: [{ type: String, ref: 'Link' }],
})

UserSchema.index({uid:1})

module.exports = mongoose.model('User', UserSchema)
