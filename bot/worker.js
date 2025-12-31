const { parentPort } = require("worker_threads");
// const { Blacklist } = require("./db");
setInterval(async () => {
    // const list = await Blacklist.get();
    // parentPort.postMessage("blacklistedUsers", { list: list });
}, 5000);
