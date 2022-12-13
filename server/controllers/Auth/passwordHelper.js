const bcrypt = require('bcryptjs');

const encryptPassword = (password) => bcrypt.hashSync(password, 12);

const comparePasswords = (password, encryptedPassword) => bcrypt.compare(password, encryptedPassword)

module.exports = {
  encryptPassword,
  comparePasswords,
};