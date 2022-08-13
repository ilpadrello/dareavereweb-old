const config = require("config");
const keyGen = function (len) {
  let key = "";
  for (i = 0; i < len; i++) {
    key += Math.random()
      .toString(36)
      .substring(2, 1 + 2);
  }
  return key;
};
const key = keyGen(config.get("JWT_KEY_LENGTH"));
console.log(key);
module.exports = key;
