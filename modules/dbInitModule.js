const crypto = require("crypto");
const pwd = crypto.createHash("sha512").update("password").digest("hex");
const random = require("./random");
const moment = require("moment");

const categories = ["leclerc", "Elisa", "Auto", "Intermarché"];
const transactions = [];
const comments = [
  "",
  "Questo é un commento semplice",
  "questo é un commento ^^ con dei ` caratteri # speciali",
  "This is a comment",
  "",
  "",
  "",
];
const transactionNumber = 100;

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = async function (sqlite) {
  await sqlite.run(`DROP TABLE IF EXISTS users;`);
  await sqlite.run(`DROP TABLE IF EXISTS categories;`);
  await sqlite.run(`DROP TABLE IF EXISTS transactions;`);

  await sqlite.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          nickname TEXT(30) NOT NULL UNIQUE,
          pwd TEXT NOT NULL,
          email TEXT(30) NOT NULL UNIQUE
      );
      `);
  await sqlite.run(`CREATE TABLE IF NOT EXISTS categories (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
      );`);
  await sqlite.run(`CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          about TEXT NOT NULL,
          amount NUMERIC NOT NULL,
          fk_user INTEGER NOT NULL,
          date TEXT(40) NOT NULL,
          fk_category INTEGER,
          percentage NUMERIC,
          comment TEXT,
          CONSTRAINT Transactions_FK FOREIGN KEY (fk_user) REFERENCES users(id),
          CONSTRAINT Category_FK FOREIGN KEY (fk_category) REFERENCES category(id)
      );`);

  await sqlite.run(`DELETE FROM users;`);
  await sqlite.run(`DELETE FROM categories;`);
  await sqlite.run(`DELETE FROM transactions;`);

  //Populating Users
  await sqlite.run(
    `INSERT INTO users VALUES(1,'Simone','${pwd}','simone.panebianco@gmail.com');`
  );
  await sqlite.run(
    `INSERT INTO users VALUES(2,'Rosi','${pwd}','rosicosentino@gmail.com');`
  );

  //Populating categories
  categories.forEach(async (category) => {
    await sqlite.run("INSERT INTO categories VALUES (null, ?)", [category]);
  });

  //Populating transactions
  let abouts = ["Spesa", "Riparazione", "Acquisto", "Necessario", "Viaggio"];
  for (let i = 0; i < transactionNumber; i++) {
    let transaction = {};
    transaction.about = getRandomFromArray(abouts);
    transaction.amount = random(10, 400, 2);
    transaction.fk_user = random(1, 2);
    transaction.date = moment
      .unix(random(1648832327, 1660582727))
      .format("YYYY-MM-DD");
    transaction.transfer = 50;
    transaction.category = random(1, categories.length);
    transaction.comment = getRandomFromArray(comments);

    await sqlite.run(
      `INSERT INTO transactions VALUES (null,'${transaction.about}', ${transaction.amount},${transaction.fk_user} ,'${transaction.date}', ${transaction.category}, ${transaction.transfer},'${transaction.comment}')`
    );
  }
};
