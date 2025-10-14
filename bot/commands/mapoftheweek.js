const { EmbedBuilder } = require("discord.js");

exports.name = "mapoftheweek";
exports.description =
    ":map: Displays previous, current (and soon next) map of the week.";
exports.usage = "CLIENT_PREFIX:mapoftheweek";
exports.example = "CLIENT_PREFIX:mapoftheweek\nCLIENT_PREFIX:motw";
exports.hidden = false;
exports.isAlias = false;
function getNextTuesdayUTC() {
    const now = new Date();

    // Get current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = now.getUTCDay();

    // Calculate how many days until next Tuesday (2)
    let daysUntilTuesday = (2 - dayOfWeek + 7) % 7;
    if (daysUntilTuesday === 0) {
        // It's already Tuesday, so go to next week
        daysUntilTuesday = 7;
    }

    // Create a new date for next Tuesday 00:00 UTC
    const nextTuesday = new Date(
        Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + daysUntilTuesday,
            0,
            0,
            0,
            0
        )
    );

    // Return Unix timestamp (seconds since epoch)
    return Math.floor(nextTuesday.getTime() / 1000);
}
exports.run = (client, message, args) => {
    fetch(client.sharedEndpoint + "motw")
        .then((d) => d.json())
        .then((data) => {
            try {
                let nextMap = ":question: :question: :question:";
                if (args[0] == "force" && message.author.id == client.ownerID)
                    nextMap = `__**${data.next.friendlyName}**__`;
                let embed = new EmbedBuilder();
                embed.setTitle(":map: Map of the Week");
                embed.addFields(
                    {
                        name: "What is Map of the Week?",
                        value:
                            "Every week, one map will be picked as Map of the Week. It's name will be colored blue (it takes 30-60 seconds to show when you enter your tavern) and all drops (except for chest drops) will be **doubled**.\nMap of the Week changes " +
                            `**<t:${getNextTuesdayUTC()}:R>**.`,
                    },
                    {
                        name: "Previous Map of the Week",
                        value: `*${data.prev.friendlyName}*`,
                    },
                    {
                        name: "Current Map of the Week",
                        value:
                            ":exclamation: **" +
                            data.curr.friendlyName +
                            "** :exclamation:",
                    },
                    {
                        name: "Next Map of the Week",
                        value: nextMap,
                    }
                );
                return message.channel.send({ embeds: [embed] });
            } catch (e) {
                return message.channel.send(
                    "Something went wrong. MOTW returned: " + e
                );
            }
        });
};
