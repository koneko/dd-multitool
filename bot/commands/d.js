const { Message, Client } = require("discord.js");
exports.name = "blacklist";
exports.description =
    ":thinking: Repeat last command found in channel. Useful for testing.";
exports.usage = "CLIENT_PREFIX:d";
exports.example = "CLIENT_PREFIX:d";
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
        return message.channel.send("only for shiro, unlucky.");

    const res = await message.channel.messages.fetch({ limit: 10 });
    const foundMessage = res.find(
        (msg) =>
            !msg.author.bot &&
            !msg.content.startsWith(client.prefix + "d") &&
            msg.content.startsWith(client.prefix)
    );
    const foundArgs = foundMessage.content
        .slice(client.prefix.length)
        .trim()
        .split(/ +/g);
    const foundCommand = foundArgs.shift().toLowerCase();

    let cmd = client.commands.get(foundCommand);

    if (!cmd) {
        cmd = client.commands.find((cmd) =>
            cmd.aliases.find((alias) => alias == foundCommand)
        );
        if (!cmd) {
            return message.channel.send(
                "Could not find valid command in latest 10 messages."
            );
        }
    }

    try {
        await cmd.run(client, foundMessage, foundArgs);
    } catch (e) {
        return message.channel.send(
            "Duplicated command returned error when being run: " + e
        );
    }
};
