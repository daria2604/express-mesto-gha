const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/token');
const { authorizationErrorMessage } = require('../errors/messages');
const { UnauthorizedError } = require('../errors/errorClasses');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(authorizationErrorMessage));
  }

  req.user = payload;

  next();
};
