const bcrypt = require('bcryptjs');

const encryptPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = encryptPassword;