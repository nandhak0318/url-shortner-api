const Link = require('../models/link.model')
const { StatusCodes } = require('http-status-codes')
const { randomKeyGen, randomUidGen } = require('../utils/createUniqueKey.util')
const isExpires = require('../utils/isExpires.util')
const customErrors = require('../errors')
const User = require('../models/user.model')
const getLink = async (req, res) => {
  const { key } = req.params
  const link = await Link.findOne({ key: key })
  console.log(link)
  if (!link) {
    return res.send('url not found')
  }
  const clickedAt = Date.now()
  link.clicks.push(clickedAt)
  const temp = isExpires(link.createdAt, link.expires)
  if (link.hits === 0 || temp) {
    await link.save()
    return res
      .status(StatusCodes.NOT_FOUND)
      .send('requested url not found or may be expires')
  }
  link.hits = link.hits - 1
  await link.save()
  return res.send(link.link)
}

const shortLink = async (req, res) => {
  const response = {}
  const { link, hits, expiresIn } = req.body
  if (!link || link === '') {
    throw new customErrors.badRequestError(`link cannot be empty`)
  }
  if (hits) {
    if (isNaN(hits)) {
      throw new customErrors.badRequestError(`hits can't be a string`)
    }
  }
  if (expiresIn) {
    if (isNaN(expiresIn)) {
      throw new customErrors.badRequestError(`expiresIn can't be a string`)
    }
  }

  const key = await randomKeyGen(Link)
  const createdAt = Math.floor(Date.now() / 1000 / 60)
  const body = {
    link: link,
    key: key,
    createdAt: createdAt,
    expires: expiresIn,
  }
  if (req?.body?.uid) {
    body.createdBy = req.body.uid
    const user = await User.findOne({ uid: req.body.uid })
    if (!user) {
      const uid = await randomUidGen(User)
      const newUser = await User.create({ uid: uid, ip: req.ip })
      body.createdBy = newUser.uid
      response.uid = newUser.uid
    }
  }

  if (!hits) {
    body.hits = -1
  } else {
    body.hits = hits
  }
  const createLink = await Link.create(body)
  const shortenLink = process.env.DOMAIN_NAME + '/' + key
  if (createLink?.createdBy) {
    const user = await User.findOne({ uid: createLink.createdBy })
    user.links.push(createLink._id)
    await user.save()
  }
  response.shortenLink = shortenLink
  res.status(StatusCodes.CREATED).json(response)
}
const getHistory = async (req, res) => {
  const response = {}
  const uid = req.query.uid
  const user = await User.findOne({ uid: uid }, []).populate(
    'links',
    '-_id link key hits createdBy givenHits createdAt expires clicks',
  )
  if (!user) {
    const uid = await randomUidGen(User)
    const newUser = await User.create({ uid: uid, ip: req.ip })
    response.uid = newUser.uid
    response.history = []
    return res.status(200).json(response)
  }
  response.history = user.links
  return res.status(200).json(response)
}
const createUser = async (req, res) => {
  const uid = await randomUidGen(User)
  const user = await User.create({ uid: uid, ip: req.ip })
  res.status(201).json({ uid: uid })
}
module.exports = {
  getLink,
  shortLink,
  createUser,
  getHistory,
}
