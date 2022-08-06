try {
  const express = require("express");
  const config = require("config");
  const portfinder = require("portfinder");
  const path = require("path");
  const signIn = require("./routes/signIn");
  const sqlite = require("./modules/sqlitePromisify");
  const dbInit = require("./modules/dbInit");

  const app = express();
  sqlite.connect(path.join(__dirname, config.get("DB_FILE_PATH")));
  dbInit(sqlite);

  app.use(express.static(path.join(__dirname, "public")));

  //Basic Middleware
  app.use(express.json());

  //Routing
  app.use("/signin", signIn);

  portfinder.getPort((err, port) => {
    if (!err) {
      app.listen(port, () => {
        console.log("Go to http://localhost:" + port + "/");
      });
    } else {
      console.log(err);
    }
  });
} catch (error) {
  console.log(error);
}
