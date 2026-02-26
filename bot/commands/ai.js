const { Client, Message } = require("discord.js");
exports.name = "ai";
exports.description =
    ":brain: Use the power of **Artificial Intelligence** to solve your problems!";
exports.usage = "CLIENT_PREFIX:ai [description of your item]";
exports.example = "CLIENT_PREFIX:ai what do you think about oliver";
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

    const input = {
        author: message.author.displayName,
        authorId: message.author.id,
        content: args.join(" "),
        messageId: msg.id,
        reference: msg.reference.messageId,
    };
    const discordCtx = await message.channel.messages.fetch({ limit: 10 });
    const ctx = [];
    discordCtx.forEach((msg) => {
        if (msg.content == "") return;
        if (msg.content == message.content) return;
        if (msg.author.id == 1179012612650962984) {
            ctx.push({
                author: "You",
                authorId: "1179012612650962984",
                message: msg.content.replace("AI Response: ", ""),
                messageId: msg.id,
                reference: null,
            });
        } else {
            ctx.push({
                author: msg.author.displayName,
                authorId: msg.author.id,
                message: msg.content,
                messageId: msg.id,
                reference: msg.reference.messageId,
            });
        }
    });
    if (
        input.content.includes("dbgctx") &&
        message.author.id == client.ownerID
    ) {
        return message.channel.send(
            "dbgctx: " +
                JSON.stringify(ctx) +
                "\nLatest message: " +
                JSON.stringify(input),
        );
    } else {
        await message.channel.sendTyping();
        const response = await client.oaiClient.responses.create({
            model: "gpt-4.1-mini",
            instructions:
                "You are a chatbot on Discord. Respond to questions and requests in a short, clear, and simple manner, without any unnecessary fluff or excessive detail. The topic of conversation generally revolves around Dungeon Defenders, so try to be on topic (feel free to use the Dungeon Defenders wiki, also only the original game, you must hate the sequel and the company behind it). However it doesn't always have to be like that, so don't blindly stick to the topic. Your response should always be under 1900 characters, including spaces, and resemble how a normal person would respond to someone in a casual conversation. Avoid long paragraphs and give only the most essential information. Be polite, but keep it brief. In each prompt, you will be provided context about the conversation (json array), just go with the flow. If for the author it says 'You' then it refers to a previous instance of you that was asked a question, so try to be cohesive. If you need to, feel free to ping people the standard Discord way (<@theirID>). If someone's message is prefixed with >< or << or >> or ? it means that they are running a command, you can ignore those messages. You MUST primarily respond to the 'Latest message' given out side the context (but still given in a json format and is generally directed at you). You should also try to respond to other messages in the context if the opportunity presents itself. If you are about to output any NSFW words, slurs or anything like that (swearing is fine) then don't and just reprimand the user.",
            input:
                "context: " +
                JSON.stringify(ctx) +
                "\nLatest message: " +
                JSON.stringify(input),
        });
        return message.channel.send(
            response.output_text != ""
                ? response.output_text
                : "I can't sorry.",
        );
    }
};
