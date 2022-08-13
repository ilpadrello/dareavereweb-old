try {
  const express = require("express");
  const config = require("config");
  const portfinder = require("portfinder");
  const path = require("path");
  const sqlite = require("./modules/sqlitePromisify");
  const dbInit = require("./modules/dbInit");

  //Loading Middlewares
  const cookieParser = require("cookie-parser");
  const accessToken = require("./middlewares/accessToken");

  //Loading Routes
  const signIn = require("./routes/signIn");
  const balance = require("./routes/balance");

  const app = express();
  sqlite.connect(path.join(__dirname, config.get("DB_FILE_PATH")));
  dbInit(sqlite);

  app.use(cookieParser());

  //Basic Middleware
  app.use(express.json());

  //Routing
  app.use("/src", express.static(path.join(__dirname, "public/src")));
  app.use("/imgs", express.static(path.join(__dirname, "public/imgs")));
  app.use(
    "/node_modules",
    express.static(path.join(__dirname, "public/node_modules"))
  );
  let gotohomepage = function (req, res, next) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    return;
  };
  app.all("/", gotohomepage);
  app.all("/index.html", gotohomepage);
  app.use("/signin", signIn);

  app.use(accessToken);
  //All routes must have access from now on
  app.use("/balance", balance);
  app.use(
    "/restricted",
    express.static(path.join(__dirname, "/public/restricted"))
  );

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
