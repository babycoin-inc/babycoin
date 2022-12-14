const { comparePasswords, getHash } = require('./passwords.js');

const authenticateUser = async(username, password) => {
  try {
    const hash = await getHash(username);
    const doPasswordsMatch = await comparePasswords(password, hash);
    if(!doPasswordsMatch) return false;
    return true;
  } catch(err) {
    console.log(err);
  }
};

module.exports = authenticateUser;