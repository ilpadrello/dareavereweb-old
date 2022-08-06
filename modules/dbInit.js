module.exports = async function (sqlite) {
  await sqlite.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          nickname TEXT(30) NOT NULL,
          pwd TEXT NOT NULL,
          email TEXT(30) NOT NULL
      );
      `);
  await sqlite.run(`CREATE TABLE IF NOT EXISTS category (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
      );`);
  await sqlite.run(`CREATE TABLE IF NOT EXISTS Transactions (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          about TEXT NOT NULL,
          amount NUMERIC NOT NULL,
          fk_user INTEGER NOT NULL,
          Date TEXT(40) NOT NULL,
          fk_category INTEGER,
          transfer NUMERIC,
          comment TEXT,
          CONSTRAINT Transactions_FK FOREIGN KEY (fk_user) REFERENCES users(id),
          CONSTRAINT Category_FK FOREIGN KEY (fk_category) REFERENCES category(id)
      );`);
};
