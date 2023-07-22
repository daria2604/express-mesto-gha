const { SERVER_ERROR } = require('../utils/statusCodes');
const { serverErrorMessage } = require('../errors/messages');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? serverErrorMessage : message,
  });

  next();
};
