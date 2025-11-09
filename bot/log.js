// logger.js
const SHOW_SQL_STATEMENTS = true;
function log(level, message, ...args) {
    if (level == "db" && !SHOW_SQL_STATEMENTS) return;
    const now = new Date().toISOString();
    const levelLabel = `[${level.toUpperCase()}]`.padEnd(8);

    console.log(`${now} ${levelLabel} ${message}`, ...args);
}

module.exports = {
    info: (msg, ...args) => log("info", msg, ...args),
    warn: (msg, ...args) => log("warn", msg, ...args),
    error: (msg, ...args) => log("error", msg, ...args),
    debug: (msg, ...args) => log("debug", msg, ...args),
    db: (msg, ...args) => log("db", msg, ...args),
};
