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
    const QUOTES = [
        "try again, maybe it'll work next time :3",
        "wrong bot, genius :nerd:",
        "no thanks :blush:",
        "ask oliver, he might know what to do :shrug:",
        "yeah, you're blacklisted. big shocker :open_mouth:",
    ];

    if (message.author.id != client.ownerID) {
        function random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const quote = QUOTES[random(0, QUOTES.length - 1)];
        return message.channel.send(quote);
    }
    console.log(await new Blacklist().get());
};
