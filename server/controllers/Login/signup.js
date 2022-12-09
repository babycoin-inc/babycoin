const { isUsernameAvailable, registerUser } = require('../../../models/Login/signup.js');
const encryptPassword = require('./passwordHelper.js');

const signup = async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = encryptPassword(password);

  try {
    const usernameAvailable = await isUsernameAvailable(username);
    if(!usernameAvailable) res.status(409).send('Username Already Exists');
    await registerUser(username, encryptedPassword);
    res.status(201).send('Account Created');
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  signup
}