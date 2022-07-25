const badRequestError = require('./bad-request')
const CustomAPIError = require('./custom-api')
const notFoundError = require('./not-found')

module.exports = {
  CustomAPIError,
  notFoundError,
  badRequestError,
}
