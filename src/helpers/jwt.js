import 'dotenv/config';
import jwt from 'jsonwebtoken';

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

export const generateJwt = (payload) => {
  return jwt.sign(payload, tokenPrivateKey, options);
};

export const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

export const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivateKey);
};

export const verifyRefreshJwt = (token) => {
  return jwt.verify(token, refreshTokenPrivateKey);
};

export const getTokenFromHeaders = (headers) => {
  const token = headers['authorization'];
  return token ? token.slice(7, token.length) : null;
};
