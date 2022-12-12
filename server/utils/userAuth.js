require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Auth } = require('../../models/models.js');
const { comparePasswords, getHash } = require('./passwords.js');

const authenticateUser = async(username, password) => {
  try {
    const hash = await getHash(username);
    const doPasswordsMatch = await comparePasswords(password, hash);
    if(!doPasswordsMatch) return false;
    return true;
  } catch(err) {
    console.log(err);;
  }
};

const createToken = (id, username) => {
  const token = jwt.sign(
    { userid: id, username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  return token;
}

module.exports = {
  authenticateUser,
  createToken
};