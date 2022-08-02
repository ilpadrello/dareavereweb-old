const express = require("express");
const config = require("config");
const portfinder = require("portfinder");
const path = require("path");
const signIn = require("./routes/signIn");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/popperjs",
  express.static(path.join(__dirname, "./node_modules/@popperjs/core/dist"))
);

//Basic Middleware
// app.use();

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
