const { EmbedBuilder, Client, Message } = require("discord.js");
const mapArray = require("../maps.json");
exports.name = "mapoftheweek";
exports.description = ":map: Displays the map of the week.";
exports.usage = "CLIENT_PREFIX:mapoftheweek";
exports.example = "CLIENT_PREFIX:mapoftheweek\nCLIENT_PREFIX:motw";
exports.aliases = ["motw"];
exports.hidden = false;
function getTimeChange() {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const jan = new Date(`8.1.${now.getUTCFullYear()} 00:00:00 UTC+0`);
    const firstWeek = jan.getUTCDay();
    let daysUntilTuesday = (firstWeek - dayOfWeek + 7) % 7;
    if (daysUntilTuesday === 0) {
        daysUntilTuesday = 7;
    }

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

function findMap(eit) {
    let map = mapArray.find((map) => map.eit == eit);
    if (!map) map = "Couldn't find map with eit: " + eit;
    return map;
}
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
    try {
        fetch("http://66.42.84.191/api/json/utc/now")
            .then((d) => d.json())
            .then((data) => {
                let extraMap =
                    "*Currently there is no extra Map of the Week...*";
                if (data.extraMapOfTheWeek != "AAAAAA") {
                    extraMap = `:fire: **${
                        findMap(data.extraMapOfTheWeek).friendlyName
                    }** :fire:`;
                }
                let embed = new EmbedBuilder();
                embed.setTitle(":map: Map of the Week");
                embed.addFields(
                    {
                        name: "What is Map of the Week?",
                        value:
                            "Every week, one map will be picked as Map of the Week. It's name will be colored blue and all drops (except for chest drops) on campaign/survival/pure strategy will be **doubled**.\nMap of the Week changes " +
                            `**<t:${getTimeChange()}:R>**.`,
                    },
                    {
                        name: "Current Map of the Week",
                        value:
                            ":exclamation: **" +
                            findMap(data.mapOfTheWeek).friendlyName +
                            "** :exclamation:",
                    },
                    {
                        name: "Extra Map of the Week",
                        value: extraMap,
                    }
                );
                return message.channel.send({ embeds: [embed] });
            })
            .catch((e) => {
                message.channel.send("MOTW API returned error: " + e);
            });
    } catch (e) {
        message.channel.send("MOTW returned error: " + e);
    }
};
