const { EmbedBuilder } = require("discord.js");
exports.name = "help";
exports.description =
    ":scroll: Shows this message and provides insight into other commands.";
exports.usage = "CLIENT_PREFIX:help [optional other command]";
exports.example = "CLIENT_PREFIX:help res";
exports.aliases = ["cmds"];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
    let embed = new EmbedBuilder();
    embed.setTitle("Commands Helper");
    if (args[0]) {
        let cmd = client.commands.get(args[0]);
        if (!cmd) {
            cmd = client.commands.find((cmd) =>
                cmd.aliases.find((alias) => alias == args[0])
            );
        }
        if (!cmd)
            return message.channel.send(
                "Command not found, try `CLIENT_PREFIX:help` first.".replaceAll(
                    "CLIENT_PREFIX:",
                    client.prefix
                )
            );
        if (cmd.hidden && message.author.id != client.ownerID) return;
        embed.setTitle(`Help for \`${cmd.name}\` command`);
        embed.setDescription(cmd.description);
        embed.addFields(
            {
                name: "Usage",
                value: cmd.usage.replaceAll("CLIENT_PREFIX:", client.prefix),
            },
            {
                name: "Example",
                value: cmd.example.replaceAll("CLIENT_PREFIX:", client.prefix),
            }
        );
        if (cmd.aliases.length > 0) {
            embed.setFooter({
                text: "Aliases: " + cmd.aliases.join(", "),
            });
        }
    } else {
        [...client.commands.values()]
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .forEach((cmd) => {
                if (cmd.hidden && message.author.id != client.ownerID) return;
                embed.addFields({
                    name: cmd.name,
                    value: cmd.description.replaceAll(
                        "CLIENT_PREFIX:",
                        client.prefix
                    ),
                });
            });
    }
    embed.setColor(0x00ff00);
    return message.channel.send({ embeds: [embed] });
};
