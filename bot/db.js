const log = require("./log");
function change(obj) {
    if (!process.env.SHARED_ENDPOINT) {
        log.db(
            "process.env.SHARED_ENDPOINT is undefined, database related functions might not work."
        );
        return null;
    }
    return fetch(process.env.SHARED_ENDPOINT + "database", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

class Blacklist {
    async get() {
        const res = await change({
            table: "Blacklist",
            action: "get",
        });
        return res;
    }
    async addToList(id, expires, expirationDate) {
        const res = await change({
            table: "Blacklist",
            action: "add",
            data: {
                id,
                expires,
                expirationDate,
            },
        });
        return res;
    }
}

module.exports = { Blacklist };
