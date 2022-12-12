const { Signup } = require('../../../models/models.js').Auth;
const { hashPassword } = require('../../utils/passwords.js');
const { createToken } = require('../../utils/userAuth.js');

const signup = async (req, res) => {
  const { username, password } = req.body;
  const hash = hashPassword(password);

  try {
    const usernameUnavailable = await Signup.isUsernameUnavailable(username);
    if(usernameUnavailable) return res.status(409).json('Username Already Exists');
    const id = await Signup.registerUser(username, hash);
    const token = createToken(id, username);
    const authorizedUser = { username, id, token };
    res.status(201).json(authorizedUser);
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  signup
}