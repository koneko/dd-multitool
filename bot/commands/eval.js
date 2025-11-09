const { Message, Client } = require("discord.js");
exports.name = "eval";
exports.description = ":computer: Evaluate JavaScript code on prod.";
exports.usage = "CLIENT_PREFIX:eval [some JS code]";
exports.example = "CLIENT_PREFIX:eval process.uptime()";
exports.aliases = ["evaluate"];
exports.hidden = true;

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("you really think i'd let you do that?");
    // from https://anidiots.guide/examples/making-an-eval-command cause im lazy

    try {
        let evaled = eval(args.join(" "));
        if (evaled) {
            if (evaled.constructor.name == "Promise") evaled = await evaled;
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { depth: 1 });
            evaled = evaled
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }

        return message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${evaled}\n\`\`\``);
    }
};
