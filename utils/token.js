const JWT = require('jsonwebtoken');

const JWT_SECRET = 'secret';

function generateToken(payload) {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
}

module.exports = { JWT_SECRET, generateToken, checkToken };