const { EmbedBuilder } = require("discord.js");
exports.name = "kb";
exports.description =
    ":notebook_with_decorative_cover: Quickly access useful data regarding Dungeon Defenders.";
exports.usage = "CLIENT_PREFIX:kb <topic>";
exports.example =
    "CLIENT_PREFIX:kb list (lists available topics)\nCLIENT_PREFIX:kb stacking\nCLIENT_PREFIX:kb cv";
exports.hidden = false;
exports.aliases = [];
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    const topic = args.join(" ");
    if (!topic) {
        return message.channel.send(
            "Topic argument missing, consult `CLIENT_PREFIX:help kb`.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    }
    try {
        const result = await fetch(
            client.sharedEndpoint + "knowledge?topic=" + topic
        );
        const data = await result.json();
        if (data.error == "topic-not-found") {
            return message.channel.send(
                "Could not find data entry for the given topic. consult `CLIENT_PREFIX:help kb`.".replaceAll(
                    "CLIENT_PREFIX:",
                    client.prefix
                )
            );
        }
        if (data.topics) {
            return message.channel.send(
                `List of topics:\n\`\`\`\n${data.topics.join(
                    "\n"
                )}\`\`\`\nUsage: \`CLIENT_PREFIX:kb <topic>\``.replaceAll(
                    "CLIENT_PREFIX:",
                    client.prefix
                )
            );
        }
        const { title, content } = data;
        const embed = new EmbedBuilder();
        embed.setTitle(title);
        embed.setDescription(content);
        embed.setColor("Green");
        return message.channel.send({ embeds: [embed] });
    } catch (e) {
        return message.channel.send(
            "Fetch from API returned error with `" + e + "`"
        );
    }
};
