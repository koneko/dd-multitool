exports.name = "bonus";
exports.description =
    ":star: Sums and calculates bonus for player stat numbers.";
exports.usage =
    "CLIENT_PREFIX:bonus <number> <number> [inf optional extra numbers]";
exports.example = "CLIENT_PREFIX:bonus 100 100";
exports.aliases = [];
exports.hidden = true;
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
        if (isNaN(Number(arg))) {
            is1nan = true;
        }
        arg = Number(arg);
    });
    if (is1nan)
        return message.channel.send(
            "One or more of the provided arguments is not a number, please consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let sum = 0;
    let bonus = 0;
    if (args.length > 1) args[1]--;
    args.forEach((arg) => {
        if (arg > 2000) arg = 2000; // just dont bother for anything higher than 2000
        let num = Number(arg);
        sum += num;
        if (num < 0) bonus += num;
        else bonus += Math.ceil(num * 1.4);
    });
    return message.channel.send(`Will reach ${sum}, ${bonus} with bonus.`);
};
