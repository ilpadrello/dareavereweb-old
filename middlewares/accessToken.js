const jwtKey = require("../modules/jwtKeyGen");
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  let ip = req.socket.remoteAddress;
  let errorMessage = "";
  let status = 401;
  let jwt;
  if (req.cookies && req.cookies.Authorization && req.headers["user-agent"]) {
    try {
      jwt = jsonwebtoken.verify(req.cookies.Authorization, jwtKey);
    } catch (error) {
      jwt = false;
      errorMessage = "Invalid Signature";
      status = 400;
    }
    let ua = req.headers["user-agent"];
    let ttl = new Date(jwt.ttl);
    let now = new Date();

    //Fingerprinting Control and ttl
    if (jwt.userAgent !== ua) message = "Different User Agent";
    if (ttl < now) {
      message = "Session expired";
      status = 440;
    }
    if (errorMessage === "") {
      next();
      return;
    }
  }
  if (config.get("REDIRECT_TO_HOME")) {
    res.status(301);
    res.redirect("/");
    return;
  } else {
    res.status(status);
    res.send(errorMessage);
    return;
  }
};
