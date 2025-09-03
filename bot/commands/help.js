const { EmbedBuilder } = require("discord.js");
exports.name = "help";
exports.description =
    ":scroll: Shows this message and provides insight into other commands.";
exports.usage = "CLIENT_PREFIX:help [optional other command]";
exports.example = "CLIENT_PREFIX:help res";
exports.hidden = false;
exports.run = (client, message, args) => {
    let embed = new EmbedBuilder();
    embed.setTitle("Commands Helper");
    if (args[0]) {
        const cmd = client.commands.get(args[0]);
        if (!cmd)
            return message.channel.send(
                "Command not found, try `CLIENT_PREFIX:help` first.".replaceAll(
                    "CLIENT_PREFIX:",
                    client.prefix
                )
            );
        if (
            (cmd.hidden && message.author.id != client.ownerID) ||
            cmd.description == "alias"
        )
            return;
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
    } else {
        [...client.commands.values()]
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .forEach((cmd) => {
                if (
                    (cmd.hidden && message.author.id != client.ownerID) ||
                    cmd.isAlias
                )
                    return;
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
    message.channel.send({ embeds: [embed] });
};
