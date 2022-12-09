const bcrypt = require('bcryptjs');

const encryptPassword = (password) => bcrypt.hashSync(password, 10);

const comparePasswords = (password, encryptedPassword) => bcrypt.compoare(password, encryptedPassword)

module.exports = {
  encryptPassword,
  comparePasswords,
};