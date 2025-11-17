const { Blacklist } = require("../db");
exports.name = "blacklist";
exports.description = ":pregnant_man: See who's blacklisted.";
exports.example =
    "CLIENT_PREFIX:blacklist @Tigi 31d\nCLIENT_PREFIX:blacklist @SirPanquakes 1s\nCLIENT_PREFIX:blacklist @Sesar :megachicken:s";
exports.usage = "CLIENT_PREFIX:blacklist [whatever arguments you want]";
exports.aliases = [];
exports.hidden = true;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID) return;
    if (args[0] == "get") {
    }
};
