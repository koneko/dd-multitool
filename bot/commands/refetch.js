exports.name = "refetch";
exports.description = ":ninja: Refetch user react data.";
exports.usage = "CLIENT_PREFIX:refetch";
exports.example = "CLIENT_PREFIX:refetch";
exports.hidden = true;
exports.isAlias = false;
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID) return;
    try {
        const url = "https://drive.overflow.fun/public/react.json";
        client.usersToReactTo = [];
        const res = await fetch(url);
        const data = await res.json();

        client.usersToReactTo = data.map((entry) => {
            const [userId, emoji] = entry.split("|");
            return { userId, emoji };
        });

        message.channel.send(
            "Refetched react data. " + JSON.stringify(client.usersToReactTo)
        );
    } catch (e) {
        message.channel.send("copyparty instance unreachable/offline...");
    }
};
