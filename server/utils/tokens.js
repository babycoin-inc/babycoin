require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Auth } = require('../../../models/models.js');
const { Login } = Auth;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.sendStatus(403);
    req.username = decoded.username;
    next();
  })
}


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

module.exports = verifyToken;