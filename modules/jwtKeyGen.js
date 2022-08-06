const config = require("config");
const keyGen = function (len) {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

module.exports = keyGen(config.get("JWT_KEY_LENGTH"));
