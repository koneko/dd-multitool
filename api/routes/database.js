export const post = async (req, res) => {
    try {
        const table = req.body.table;
        const action = req.body.action;
        const data = req.body.data;

        let result = { error: "Unable to fetch data." };
        if (table == "Blacklist") {
            if (action == "get") {
                result = res.locals.db.prepare("SELECT * FROM Blacklist").all();
            }
            if (action == "set") {
                const exists = res.locals.db
                    .prepare(
                        "SELECT ID FROM Blacklist WHERE BlacklistedUserDiscordID = ?"
                    )
                    .get(data.id);
                if (exists)
                    result = res.locals.db
                        .prepare(
                            "UPDATE Blacklist SET Expires = ?, ExpirationDate = ? WHERE ID = ?"
                        )
                        .run(data.expires, data.expirationDate, exists);
                else
                    result = res.locals.db
                        .prepare(
                            "INSERT INTO Blacklist (BlacklistedUserDiscordID, Expires, ExpirationDate) VALUES (?, ?, ?)"
                        )
                        .run(data.id, data.expires, data.expirationDate);
            }
        } else if (table == "Extra") {
            const check = res.locals.db.prepare("SELECT * FROM BotExtra").get();
            console.log(check);
            if (action == "get") {
                if (check) result = JSON.parse(check);
                else result = {};
            }
            if (action == "set") {
                if (!check) {
                    res.locals.db
                        .prepare("INSERT INTO BotExtra (data) VALUES (?)")
                        .run(JSON.stringify(data));
                } else
                    res.locals.db
                        .prepare("UPDATE BotExtra SET data = ?")
                        .run(JSON.stringify(data));
            }
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};
