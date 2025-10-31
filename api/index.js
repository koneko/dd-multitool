import express from "express";
import { router } from "express-file-routing";
import { existsSync, readFileSync, writeFileSync } from "fs";
import Database from "better-sqlite3";
if (existsSync(".env")) process.loadEnvFile(".env");
if (!process.env.DATABASE_PATH)
    console.error("Environment variable DATABASE_PATH not set! Aborting!");
if (!process.env.DATABASE_PATH.endsWith("/"))
    console.error("DATABASE_PATH must end with /. Aborting!");
const DATABASE_VERSION = 1;
const PORT = process.env.PORT || 2000;
if (process.env.NODE_ENV !== "test") {
    const db = new Database(process.env.DATABASE_PATH + "app.db");

    if (!existsSync(process.env.DATABASE_PATH + "db.version")) {
        const tables = readFileSync("tables.sql", "utf-8");
        db.exec(tables);
        db.close();
        console.log(
            "No previous database found. Creating new one. Database version: " +
                DATABASE_VERSION
        );
        writeFileSync(
            process.env.DATABASE_PATH + "db.version",
            DATABASE_VERSION.toString(),
            "utf-8"
        );
    } else {
        if (process.env.AUTOMATIC_BACKUP == "true") {
            console.log("Backing up previous database...");
            const backup = readFileSync(process.env.DATABASE_PATH + "app.db");
            writeFileSync(
                process.env.DATABASE_PATH + Date.now() + ".app.db",
                backup
            );
        }
        const ver = readFileSync(process.env.DATABASE_PATH + "db.version");
        if (ver < DATABASE_VERSION) {
            // if you decide to add new table, update database version and UPGRADE THE TABLE HERE!
            console.log("Old database found! Attempting to upgrade version.");
            console.log("Old db.version - " + ver);
            console.log("Current db.version - " + DATABASE_VERSION);
            writeFileSync(
                process.env.DATABASE_PATH + "db.version",
                DATABASE_VERSION.toString(),
                "utf-8"
            );
        }
    }
}
const app = express();

app.use("/", await router());

export default app;
if (process.env.NODE_ENV !== "test")
    app.listen(PORT, () => console.log("API listening on port " + PORT + "."));
