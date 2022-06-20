const bcrypt = require("bcrypt");

module.exports = {
  hashPassword(password) {
    let hash = bcrypt.hashSync(password, 10);
    return hash;
  },
  comparePassword(password, hash) {
    let isValid = bcrypt.compareSync(password, hash);
    return isValid;
  },
};
