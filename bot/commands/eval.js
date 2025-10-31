const { Message, Client } = require("discord.js");
exports.name = "evaluate";
exports.description =
    ":computer: Evaluate JavaScript on production docker image.";
exports.usage = "CLIENT_PREFIX:eval [some JS code]";
exports.example = "CLIENT_PREFIX:eval message.channel.send('hello!');";
exports.aliases = [];
exports.hidden = true;

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("you thought, huh.");
    // from https://anidiots.guide/examples/making-an-eval-command cause im lazy

    try {
        // Evaluate (execute) our input
        let evaled = eval(args.join(" "));

        // If the response isn't a string, `util.inspect()`
        // is used to 'stringify' the code in a safe way that
        // won't error out on objects with circular references
        // (like Collections, for example)
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled, { depth: 1 });

        // Replace symbols with character code alternatives
        evaled = evaled
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));

        // Reply in the channel with our result
        return message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
        // Reply in the channel with our error
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${evaled}\n\`\`\``);
    }
};
