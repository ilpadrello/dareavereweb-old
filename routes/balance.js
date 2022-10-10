const express = require("express");
const { route } = require("./signIn");
const router = express.Router();
const sqlite = require("../modules/sqlitePromisify");

module.exports = router;

router.get("/list/:nrows/:page", async (req, res, next) => {
  try {
    let limit = req.params.nrows;
    let page = req.params.page;
    let offset = limit * (page - 1);
    let transitions = await sqlite.all(
      `SELECT u.nickname ,t.about ,t.amount ,t.Date ,t.percentage ,t.comment ,c.name AS categories FROM Transactions t
        JOIN users u ON t.fk_user = u.id 
        JOIN categories c ON t.fk_categories = c.id
        ORDER BY t.date DESC
        LIMIT ? OFFSET ?;`,
      [limit, offset]
    );
    res.send(transitions);
    return;
  } catch (error) {
    console.log(error.message);
    let errorObj = {
      status: 500,
      message: error.message,
    };
    res.error = errorObj;
    next();
    return;
  }
});

router.get("/user-list", async (req, res, next) => {
  try {
    let users =
      await sqlite.all(`SELECT nickname, ROUND(SUM((CAST(t.amount  as REAL)/100)*CAST(t.percentage as REAL)),2) AS amount FROM USERS u
    JOIN Transactions t ON t.fk_user = u.id
    GROUP BY u.id;`);
    res.send(users);
    return;
  } catch (error) {
    console.log(error.message);
    let errorObj = {
      status: 500,
      message: error.message,
    };
    res.error = errorObj;
    next();
    return;
  }
});

router.post("/add", async (req, res, next) => {
  try {
  } catch (error) {
    let errorObj = {
      status: 500,
      message: error.message,
    };
    res.error = errorObj;
    next();
    return;
  }
});
