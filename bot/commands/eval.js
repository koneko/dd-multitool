const { Message, Client } = require("discord.js");
exports.name = "eval";
exports.description = ":computer: Evaluate JavaScript code on prod.";
exports.usage = "CLIENT_PREFIX:eval [some JS code]";
exports.example = "CLIENT_PREFIX:eval process.uptime()";
exports.aliases = ["evaluate"];
exports.hidden = true;

// This function cleans up and prepares the
// result of our eval command input for sending
// to the channel
const clean = async (text) => {
    // If our input is a promise, await it before continuing
    if (text && text.constructor.name == "Promise") text = await text;

    // If the response isn't a string, `util.inspect()`
    // is used to 'stringify' the code in a safe way that
    // won't error out on objects with circular references
    // (like Collections, for example)
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });

    // Replace symbols with character code alternatives
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));

    // Send off the cleaned up result
    return text;
};

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("fak you bradar");
    // from https://anidiots.guide/examples/making-an-eval-command cause im lazy

    try {
        // Evaluate (execute) our input
        const evaled = eval(args.join(" "));

        // Put our eval result through the function
        // we defined above
        const cleaned = await clean(evaled);

        // Reply in the channel with our result
        message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
    } catch (err) {
        // Reply in the channel with our error
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
};
