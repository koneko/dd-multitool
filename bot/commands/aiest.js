const { Client, Message } = require("discord.js");
exports.name = "aiest";
exports.description =
    ":brain: Use the power of **Artificial Intelligence** to decide on the value of items for you!";
exports.usage = "CLIENT_PREFIX:aiest [description of your item]";
exports.example = "CLIENT_PREFIX:aiest 1600 ab2 dps";
exports.aliases = ["lol"];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    if (!args[0])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix,
            ),
        );

    const sigma = args.join(" ");

    const m = await message.channel.send("Determining value...");
    const response = await client.oaiClient.responses.create({
        model: "gpt-4.1-mini",
        instructions:
            "Please price this armor piece, make no mistakes. The input will probably consist of a number and a tag. If it doesn't contain one of those, do whatever you want. The price you return must be in cv (so just put like, 200cv or something). Don't price anything under 20cv. You should price some pieces higher than others, in the following descending order by tags: ab2, ab1, app, warden, hermit, dps, huntress. Price all others randomly. In general, armor that is >2000 you should price high and other than that price randomly (but not higher than >2000). Don't talk too much, but feel don't be too short.",
        input: sigma,
    });
    return m.edit("Response: " + response.output_text);
};
