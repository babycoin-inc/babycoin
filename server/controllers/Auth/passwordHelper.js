const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;

const hashPassword = (password) => bcrypt.hashSync(password, SALT_ROUNDS);

const comparePasswords = (password, hash) => bcrypt.compare(password, hash)

module.exports = {
  hashPassword,
  comparePasswords,
};