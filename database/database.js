const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./events.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, venue TEXT, date DATE DEFAULT (date('now')))"
  );
});

module.exports = db;
