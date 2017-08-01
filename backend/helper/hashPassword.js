const crypto = require('crypto');

// Implements the popular 'sha256' hashing method
const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

module.exports = hashPassword;
