const { createToken } = require('../../utils/userAuth.js');

const login = (req, res) => {
  const { id, username } = req.user;
  const token = createToken(id, username);
  const authorizedUser = { id, username, token };
  res.status(200).json(authorizedUser);
}

module.exports = login;
