const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;
const { Auth } = require('../../models/models.js');

const hashPassword = (password) => bcrypt.hashSync(password, SALT_ROUNDS);
const getHash = (username) => Auth.Login.getHash(username);
const comparePasswords = (password, hash) => bcrypt.compare(password, hash)

module.exports = {
  hashPassword,
  comparePasswords,
  getHash
};