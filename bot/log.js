// logger.js
function log(level, message, ...args) {
    const now = new Date().toISOString();
    const levelLabel = `[${level.toUpperCase()}]`.padEnd(8);

    console.log(`${now} ${levelLabel} ${message}`, ...args);
}

module.exports = {
    info: (msg, ...args) => log("info", msg, ...args),
    warn: (msg, ...args) => log("warn", msg, ...args),
    error: (msg, ...args) => log("error", msg, ...args),
    debug: (msg, ...args) => log("debug", msg, ...args),
};
