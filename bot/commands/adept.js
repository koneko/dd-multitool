const { Client, Message } = require("discord.js");
exports.name = "adept";
exports.description = "CLIENT_PREFIX:abc";
exports.usage = "CLIENT_PREFIX:abcd";
exports.example = "CLIENT_PREFIX:abc";
exports.aliases = [];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
    if (!args[0])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let stat = parseFloat(args[0]);
    if (isNaN(stat))
        return message.channel.send(
            "Given argument is not a number. Consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let scalar = 1.0;
    if (stat > 5000) {
        scalar += stat / 5000;
    }
    const HeroRadiusScalingStat =
        1.0 +
        0.66 * (Math.min(parseInt(stat + 1), 4) ** 0.0825 - 1.0) +
        0.75 * ((stat + 1) ** 0.3375 - 1.0);
    const range = 500 * HeroRadiusScalingStat ** 0.5 * scalar;
    return message.channel.send("Adept range in unreal units: " + range);
};
