const { Message, Client } = require("discord.js");
const { BotExtra } = require("../db");
exports.name = "voiceoftheheavens";
exports.description = ":angel: Speak through the mouth of someone else.";
exports.usage = "CLIENT_PREFIX:voiceoftheheavens [action] [message]";
exports.example =
    "CLIENT_PREFIX:voiceoftheheavens set-guild 123456789\nCLIENT_PREFIX:voiceoftheheavens set-channel 123456789\nCLIENT_PREFIX:voiceoftheheavens hello everyone\nCLIENT_PREFIX:voiceoftheheavens reply[messageID] bruh\nCLIENT_PREFIX:voiceoftheheavens edit[ownMsgID] new text";
exports.aliases = ["v", "speak", "voth"];
exports.hidden = true;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("You shall not speak through me.");
    if (!client.sharedEndpoint)
        return message.channel.send("client.sharedEndpoint is not set.");
    let config = await BotExtra.get();
    console.log(config);
    // TODO: write
    // post client.guilds.fetch("148849688722800640").then(guild => guild.channels.fetch("556864412338749440").then(channel => channel.send("beating greater old one also gives cheater accessories")))
    // edit client.guilds.fetch("148849688722800640").then(guild => guild.channels.fetch("556864412338749440").then(channel => channel.messages.fetch("1436797394275799242").then(msg => msg.edit("beating armorless* greater old one also gives cheater accessories"))))
};
