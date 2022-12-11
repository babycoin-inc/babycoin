const { isUsernameUnavailable, registerUser } = require('../../../models/Login/signup.js');
const { hashPassword } = require('./passwordHelper.js');

const signup = async (req, res) => {
  const { username, password } = req.body;
  const hash = hashPassword(password);

  try {
    const usernameUnavailable = await isUsernameUnavailable(username);
    if(usernameUnavailable) return res.status(409).send('Username Already Exists');
    await registerUser(username, hash);
    res.status(201).send('Account Created');
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  signup
}