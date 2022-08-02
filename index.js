const express = require("express");
const config = require("config");
const portfinder = require("portfinder");

const app = express();

portfinder.getPort((err, port) => {
  if (!err) {
    app.listen(port, () => {
      console.log("Go to http://localhost:" + port + "/");
    });
  } else {
    console.log(err);
  }
});
