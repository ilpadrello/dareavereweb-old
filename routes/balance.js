const express = require("express");
const { route } = require("./signIn");
const router = express.Router();
const sqlite = require("../modules/sqlitePromisify");

module.exports = router;

// router.get("/basic-info", async (req, res, next) => {
//     let obj = {
//         n_users: await sqlite.all("SELECT COUNT(u.id) FROM users u;"),
//         category: await
//     }
// });

router.get("/list/:nrows/:page", async (req, res, next) => {
  try {
    let limit = req.params.nrows;
    let page = req.params.page;
    let offset = limit * (page - 1);
    let transitions = await sqlite.all(
      `SELECT u.nickname ,t.about ,t.amount ,t.Date ,t.transfer ,t.comment ,c.name AS category FROM Transactions t
        JOIN users u ON t.fk_user = u.id 
        JOIN category c ON t.fk_category = c.id
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
      await sqlite.all(`SELECT nickname, SUM((CAST(t.amount  as REAL)/100)*CAST(t.transfer as REAL)) AS amount FROM USERS u
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
