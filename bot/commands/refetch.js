exports.name = "refetch";
exports.description = ":ninja: Refetch user react data.";
exports.usage = "CLIENT_PREFIX:refetch";
exports.example = "CLIENT_PREFIX:refetch";
exports.aliases = [];
exports.hidden = true;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("not for you :3");
    try {
        const url = "https://drive.overflow.fun/public/react.json";
        client.usersToReactTo = [];
        const res = await fetch(url);
        const data = await res.json();

        client.usersToReactTo = data.map((entry) => {
            const [userId, emoji] = entry.split("|");
            return { userId, emoji };
        });

        return message.channel.send(
            "Refetched react data. " + JSON.stringify(client.usersToReactTo)
        );
    } catch (e) {
        return message.channel.send(
            "copyparty instance unreachable/offline...."
        );
    }
};
