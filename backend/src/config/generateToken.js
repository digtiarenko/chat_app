const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const generateToken = id => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};

module.exports = generateToken;
