require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: 60 };
const refreshOptions = { expiresIn: '30 days' };
const generateJwt = (payload) => {
  return jwt.sign(payload, tokenPrivateKey, options);
};

const generateRefreshJwt = (payload) => {
  console.log('*** jwt.generateRefreshJwt.payload', payload);
  return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivateKey);
};

module.exports = { generateJwt, generateRefreshJwt, verifyJwt };
