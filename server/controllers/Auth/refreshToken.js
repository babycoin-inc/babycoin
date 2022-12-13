const { Login } = require('../../../models/models.js');
const { login } = Login;
const jwt = require('jsonwebtoken');

const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
    const user = await login.getUserByToken(refreshToken);
    if(!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err) return res.sendStatus(403);
      const { id, username } = user;
      const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
      });
      res.json({ accessToken });
    });
  } catch(err) {
    console.log(err);
  }
}

module.exports = refreshToken;