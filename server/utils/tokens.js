require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;
// const { Auth } = require('../../../models/models.js');
// const { Login } = Auth;
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
const verifyToken = (token, hash) => bcrypt.compare(token, hash);
const getRefreshTokenFromHeaders = (reqHeaders) => {
  const bearerToken = reqHeaders.authorization?.split(' ');
  const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;
  if(!bearerToken || !token) return null;
  return token;
}

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if(token === null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if(err) return res.sendStatus(403);
//     req.username = decoded.username;
//     next();
//   })
// }



// const refreshToken = async(req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(401);
//     const user = await Login.getUserByToken(refreshToken);
//     if(!user) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if(err) return res.sendStatus(403);
//       const { id, username } = user;
//       const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '15s'
//       });
//       res.json({ accessToken });
//     });
//   } catch(err) {
//     console.log(err);
//   }
// }

// module.exports = refreshToken;

module.exports = {
  createNewTokens,
  createAccessToken,
  createRefreshToken,
  hashToken,
  verifyToken,
  getRefreshTokenFromHeaders
};