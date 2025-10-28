const { Message, Client } = require("discord.js");

exports.name = "cookie";
exports.description =
    ":cookie: Give someone a cookie to show your appreciation.";
exports.usage = "CLIENT_PREFIX:cookie <@mention>";
exports.example = "CLIENT_PREFIX:cookie @Tigi\n*(also supports replying)*";
exports.aliases = ["givecookie"];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.mentions.members.size > 0) {
        return message.channel.send(
            "You gave a :cookie: to <@" +
                message.mentions.members.at(0).id +
                ">. :blush:"
        );
    } else {
        return message.channel.send(
            "Mention someone or reply to a message to give them a cookie!"
        );
    }
};
