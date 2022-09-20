const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message

  console.log('error', error.name);

  console.log(err.stack.red);
  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Recurso no encontrado con el id ${err.value}`;
    error = new ErrorResponse(message, 404)
  }

  //Mongoose duplicated key
  if (err.name === 'SequelizeUniqueConstraintError') {
    console.log(err);
    const message = err.errors[0].message;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400)
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;
