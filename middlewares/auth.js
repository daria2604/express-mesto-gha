const { authorizationErrorMessage } = require('../errors/messages');
const { UnauthorizedError } = require('../errors/errorClasses');
const { checkToken } = require('../utils/token')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  const payload = checkToken(token)

  req.user = payload;
  next();
};
