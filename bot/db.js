const log = require("./log");
function call(obj) {
    try {
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
    } catch (e) {
        console.log(e);
    }
}

class Blacklist {
    static async get() {
        let res = await call({
            table: "Blacklist",
            action: "get",
        });
        res = res.map((arr) => arr.BlacklistedUserDiscordID);
        return res;
    }
    static async addToList(discordId, expires, expirationDate) {
        const res = await call({
            table: "Blacklist",
            action: "set",
            data: {
                id: discordId,
                expires,
                expirationDate,
            },
        });
        return res;
    }
}

class BotExtra {
    static async get() {
        const res = await call({
            table: "Extra",
            action: "get",
        });
        return res;
    }
    static async set(data) {
        const res = await call({
            table: "Extra",
            action: "set",
            data,
        });
        return res;
    }
}

module.exports = { Blacklist, BotExtra };
