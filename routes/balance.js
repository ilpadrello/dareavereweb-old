const express = require("express");
const { route } = require("./signIn");
const router = express.Router();
const sqlite = require("../modules/sqlitePromisify");

module.exports = router;

router.get("/list", async (req, res) => {});
