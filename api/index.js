import express from "express";
import { router } from "express-file-routing";
import {
    existsSync,
    readFileSync,
    writeFileSync,
    readdirSync,
    accessSync,
    constants,
} from "fs";
import { Worker } from "worker_threads";
import Database from "better-sqlite3";
import bodyParser from "body-parser";
import cors from "cors";
if (existsSync(".env")) process.loadEnvFile(".env");
const PORT = process.env.PORT || 2000;
const DATABASE_PATH = process.env.DATABASE_PATH;
let db, worker;
if (process.env.NODE_ENV !== "test") {
    if (DATABASE_PATH) {
        worker = new Worker("./worker.js");
        if (
            !DATABASE_PATH.endsWith("\\") &&
            !DATABASE_PATH.endsWith("/") &&
            !DATABASE_PATH.endsWith("\\")
        ) {
            throw "Environment variable DATABASE_PATH MUST END WITH / or \\\\ or \\ to ensure proper Sqlite function.";
        }
        console.log(
            "DATABASE_PATH enviroment variable is set to: " + DATABASE_PATH,
        );
        try {
            accessSync(DATABASE_PATH, constants.W_OK | constants.R_OK);
        } catch (err) {
            throw "Unable to read/write to path defined with DATABASE_PATH environment variable. Make sure to check permissions!";
        }
        const DATABASE_VERSION = readdirSync("./tables/").length;
        db = new Database(DATABASE_PATH + "app.db");
        db.pragma("journal_mode = WAL");
        worker.postMessage("begin");
        const version = db.pragma("user_version")[0].user_version;
        console.log("App database version: " + DATABASE_VERSION);
        console.log("Disk database user_version: " + version);
        if (DATABASE_VERSION != version) {
            console.log(
                "Old version detected! Attempting to upgrade database!",
            );
            writeFileSync(
                DATABASE_PATH + `v${version}.app.db.bak`,
                readFileSync(DATABASE_PATH + "app.db"),
            );
            const files = readdirSync("./tables/");
            for (let i = version; i < DATABASE_VERSION; i++) {
                const fileName = files[i];
                const change = readFileSync("./tables/" + fileName, "utf-8");
                db.exec(change);
            }
            db.pragma("user_version =" + DATABASE_VERSION);
            console.log("Database upgraded!");
        }
    } else throw "Environment variable DATABASE_PATH is not set!";
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    if (process.env.NODE_ENV !== "test") res.locals.db = db;
    next();
});
app.use("/", await router());

export default app;
if (process.env.NODE_ENV !== "test")
    app.listen(PORT, () => console.log("API listening on port " + PORT + "."));
