import { parentPort } from "worker_threads";
import Database from "better-sqlite3";
const DATABASE_PATH = process.env.DATABASE_PATH;
const db = new Database(DATABASE_PATH + "app.db");
parentPort.on("message", () => {
    setInterval(() => {
        const blacklisted = db.prepare("SELECT * FROM Blacklist").all();
        for (let i = 0; i < blacklisted.length; i++) {
            const blacklistedUser = blacklisted[i];
            if (blacklistedUser.Expires) {
                const now = Date.now();
                const expirationDate = new Date(
                    blacklistedUser.ExpirationDate
                ).getTime();
                if (now >= expirationDate) {
                }
            }
        }
    }, 5000);
});
