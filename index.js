require('express-async-errors')
require('dotenv').config()

const executeJobs = require('./utils/scheduler.util')
const express = require('express')
const connect = require('./db/connect')
const app = express()

// security packages
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
// other packages
const morgan = require('morgan')
// others
const errorHandler = require('./middleware/error-handler')

// middlewares
// app.use(
//   rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 50,
//   }),
// )
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

if (process.env.APP_ENV == 'development') {
  app.use(logger('dev'))
} else {
  app.use(morgan('tiny'))
}

const router = require('./routes')

app.use('/', router)

app.get('/health', async (req, res) => {
  res.status(200).send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  })
})

app.use(errorHandler)

const port = process.env.PORT || 3000
const start = async () => {
  await connect('mongodb://127.0.0.1:27017/urlshortner')
  app.listen(port, () => {
    console.log(`app is listening on port: ${port}`)
  })
}

start()
executeJobs()
