exports.name = "cat";
exports.description = ":cat: Calculates boost for cat.";
exports.usage = "CLIENT_PREFIX:cat <boost> <levels>";
exports.example = "CLIENT_PREFIX:cat 80 120";
exports.hidden = false;
exports.isAlias = false;
exports.run = (client, message, args) => {
    if (!args[0] || !args[1])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let boost = parseInt(args[0]);
    let levels = parseInt(args[1]);
    if (isNaN(boost) || isNaN(levels))
        return message.channel.send(
            "Boost or levels is not a number. Consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let extraboost = Math.floor(levels / 3 - 3);
    let players = Math.floor(levels / 29) + 1;
    if (players > 4) players = 4;
    return message.channel.send(
        `Your cat's boost should be atleast **${
            boost + extraboost
        }**. It will boost atleast **${players}** players.`
    );
};
