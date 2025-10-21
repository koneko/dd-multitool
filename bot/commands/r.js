exports.name = "r";
exports.description =
    ":gift: He was a serial gif(t) giver. If he wanted you joly, he would do that and nobody questioned him!";
exports.usage = "a";
exports.example = "a";
exports.hidden = true;
exports.run = async (client, message, args) => {
    if (message.author.id != client.ownerID)
        return message.channel.send("not for you :3");
    try {
        if (message.reference) {
            const ogMessage = await message.channel.messages.fetch(
                message.reference.messageId
            );
            if (ogMessage.author.id != message.author.id)
                return message.reply("no thanks");
            message.channel.send(ogMessage.content);
            ogMessage.delete();
            message.delete();
        } else {
            message.reply("reference another message");
        }
    } catch (e) {
        message.channel.send("no can do. " + e);
    }
};
