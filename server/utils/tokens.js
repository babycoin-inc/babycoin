require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;
const REFRESH_TOKEN_EXPIRY = '1d';

const createAccessToken = (id, username) => {
  const accessToken = jwt.sign(
    { userid: id, username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  return accessToken;
}

const createRefreshToken = (id, username) => {
  const refreshToken = jwt.sign(
    { userid: id, username: username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  return refreshToken;
}

const createNewTokens = (id, username) => {
  const accessToken = createAccessToken(id, username);
  const refreshToken = createRefreshToken(id, username);
  return [accessToken, refreshToken];
}

const hashToken = (token) => bcrypt.hashSync(token, SALT_ROUNDS);

const compareTokenAndHash = (token, hash) => bcrypt.compare(token, hash);

const getRefreshTokenFromHeaders = (reqHeaders) => {
  const bearerToken = reqHeaders.authorization?.split(' ');
  const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;
  if(!bearerToken || !token) return null;
  return token;
}

module.exports = {
  createNewTokens,
  createAccessToken,
  createRefreshToken,
  hashToken,
  compareTokenAndHash,
  getRefreshTokenFromHeaders
};