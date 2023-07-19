const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/token');
const { UNAUTHORIZED } = require('../errors/status');
const { authorizationErrorMessage } = require('../errors/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: authorizationErrorMessage });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: authorizationErrorMessage });
  }

  req.user = payload;

  next();
};
