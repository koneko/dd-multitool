import Database from "better-sqlite3";
const db = new Database(process.env.DATABASE_PATH + "app.db");
db.pragma("journal_mode = WAL");

// i probably wont use, but its cool to know anyways.
function checkIfTableExists(tableName) {
    const check = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
        .get(tableName);
    if (check == undefined) return false;
    return true;
}

export const get = async (req, res) => {};
