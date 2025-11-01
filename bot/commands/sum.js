exports.name = "sum";
exports.description = ":1234: Calculate the sum of numbers.";
exports.usage = "CLIENT_PREFIX:sum [as many numbers as you want]";
exports.example = "CLIENT_PREFIX:sum 100 100";
exports.aliases = [];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
    let is1nan = false;
    if (!args[0])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    args.forEach((arg) => {
        if (isNaN(parseInt(arg))) {
            is1nan = true;
        }
        arg = parseInt(arg);
    });
    if (is1nan)
        return message.channel.send(
            "One or more of the provided arguments is not a number, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let sum = 0;
    args.forEach((arg) => {
        sum += parseInt(arg);
    });
    return message.channel.send(`Sum of your numbers: **${sum}**.`);
};
