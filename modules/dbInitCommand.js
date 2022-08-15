const dbInit = require("./dbInitModule");
const sqlite = require("./sqlitePromisify");
const path = require("path");
const config = require("config");

let dbPath = path.join(__dirname, "../", config.get("DB_FILE_PATH"));
console.log(dbPath);
sqlite.connect(dbPath);
(async function () {
  try {
    console.log("Recreating Basic Database");
    await dbInit(sqlite);
    console.log("Finished");
  } catch (error) {
    console.log(error);
  }
})();
