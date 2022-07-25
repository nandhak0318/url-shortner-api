const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors/custom-api')

const errorHandlerMiddeware = (err, req, res, next) => {
  console.log(err)
  const CustomErr = {
    msg: err.message || `internal server error`,
    statusCode: err.statusCode || 500,
  }
  if (err.name == 'ValidationError') {
    CustomErr.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    CustomErr.statusCode = 400
  }

  if (err.name === 'CastError') {
    CustomErr.msg = `No item found with id : ${err.value}`
    CustomErr.statusCode = 404
  }

  return res.status(CustomErr.statusCode).json({ msg: CustomErr.msg })
}

module.exports = errorHandlerMiddeware
