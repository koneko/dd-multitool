exports.name = "bonus";
exports.description =
    ":star: Sums and calculates bonus for player stat numbers.";
exports.usage =
    "CLIENT_PREFIX:bonus <number> <number> [inf optional extra numbers]";
exports.example = "CLIENT_PREFIX:bonus 100 100";
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
            "You have provided invalid arguments to this command, please consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let sum = 0;
    args.forEach((arg) => {
        if (arg > 2000) arg = 2000; // just dont bother for anything higher than 2000
        sum += parseInt(arg);
    });
    if (args.length > 1) sum--;
    return message.channel.send(
        `Will reach ${sum}, ${Math.ceil(sum * 1.4)} with bonus.`
    );
};
