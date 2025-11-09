export const post = async (req, res) => {
    try {
        const table = req.body.table;
        const action = req.body.action;
        console.log(table, action);

        let result = { error: "Unable to fetch data." };
        if (table == "Blacklist") {
            if (action == "get") {
                result = res.locals.db.prepare("SELECT * FROM Blacklist").all();
            }
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};
