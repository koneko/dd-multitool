const logger = require("../log");
exports.name = "res";
exports.description =
    ":shield: Calculates how much upgrades you need to max your resistances. For Ult pieces and better. (slightly inaccurate but this is hard to calculate)";
exports.usage =
    "CLIENT_PREFIX:res <res> <res> <res> [res] | <hero stat> <levels> [second hero stat]";
exports.example = "CLIENT_PREFIX:res -3 1 -16 14 | 406 440";
exports.hidden = false;
exports.isAlias = false;
exports.run = async (client, message, args) => {
    for (let i = 0; i < args.length; i++) {
        if (args[i] == "|") continue;
        args[i] = parseInt(args[i]);
        if (isNaN(args[i]))
            message.channel.send(
                "Unable to parse argument `" +
                    i +
                    1 +
                    "` as number, try again or report this issue."
            );
    }
    let type;
    if (args[4] == "|") type = 4;
    else if (args[3] == "|") type = 3;
    else return message.channel.send("Please provide 3 or 4 resistances.");
    let resistances = [args[0], args[1], args[2], type == 4 ? args[3] : null];
    let mainStat1 = type == 4 ? args[5] : args[4];
    let upgrades = type == 4 ? args[6] : args[5];
    let substat = type == 4 ? args[7] : args[6];
    if (!mainStat1 || !upgrades)
        return message.channel.send("Please provide atleast 2 stats.");
    if (!substat) substat = 0;
    fetch(
        client.sharedEndpoint +
            "resistances" +
            `?mainStat=${mainStat1}&upgrades=${upgrades}&subStat=${substat}&resistances=${JSON.stringify(
                resistances
            )}`
    )
        .then((d) => d.json())
        .then((data) => {
            const { resUpgrades, mainStat, subStat, bonus } = data;
            logger.info(resUpgrades, mainStat, subStat, bonus);
            message.channel.send(
                `With ${resUpgrades} upgrades spent in resistances, your piece will reach ${
                    mainStat + subStat
                }, or ${bonus} with set bonus!`
            );
        });
};
