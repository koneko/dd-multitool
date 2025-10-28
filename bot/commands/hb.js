const STAT_MULT_INITIAL_AB2 = 0.66;
const STAT_MULT_FULL_AB2 = 0.75;

const STAT_EXP_INITIAL_AB2 = 0.0825;
const STAT_EXP_FULL_AB2 = 0.3375;

const ADDITIONAL_DAMAGE_MULTIPLIER = 0.25;
const ADDITIONAL_DAMAGE_EXPONENT = 0.95;

// Functions
function get_ab2_scaling(stat_val) {
    return (
        1.0 +
        STAT_MULT_INITIAL_AB2 *
            (Math.min(stat_val + 1.0, 4.0) ** STAT_EXP_INITIAL_AB2 - 1.0) +
        STAT_MULT_FULL_AB2 * ((stat_val + 1.0) ** STAT_EXP_FULL_AB2 - 1.0)
    );
}

function get_damage_multiplier(stat_val) {
    return (
        1.0 +
        ADDITIONAL_DAMAGE_MULTIPLIER *
            get_ab2_scaling(Math.max(stat_val, 1)) ** ADDITIONAL_DAMAGE_EXPONENT
    );
}

exports.name = "hb";
exports.description = ":muscle: Calculate hero boost's damage multiplier.";
exports.usage = "CLIENT_PREFIX:hb <points>";
exports.example = "CLIENT_PREFIX:hb 5000";
exports.hidden = false;
exports.isAlias = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
    if (!args[0])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let hbPoints = parseInt(args[0]);
    if (isNaN(hbPoints))
        return message.channel.send(
            "Given argument is not a number. Consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );

    return message.channel.send(
        `With **${hbPoints}** points in your hero boost, you will boost with a **${get_damage_multiplier(
            hbPoints
        ).toFixed(4)}** damage multiplier.`
    );
};
