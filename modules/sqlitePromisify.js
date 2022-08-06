const sqlite = require("sqlite3").verbose();
//let dbFull;
var dbFull = null;
const tr = {
  connect: (path) => {
    if (!dbFull) {
      dbFull = new sqlite.Database(path);
    }
    return this;
  },
};

const db = new Proxy(tr, {
  get: (target, property) => {
    if (typeof target[property] === "function") {
      return function () {
        console.log(
          "This comment is called when the target has a function called " +
            property +
            " inside it"
        );
        target[property].apply(this, arguments);
      };
    } else {
      if (typeof dbFull[property] === "function") {
        return function () {
          return new Promise((res, rej) => {
            console.log("arguments", ...arguments);
            dbFull[property](...arguments, (error, result) => {
              if (error) {
                rej(error);
              } else {
                if (typeof result === "undefined") result = [];
                if (!Array.isArray(result)) result = [result];
                res(result);
              }
            });
          });
        };
      }
    }
  },
});

module.exports = db;
