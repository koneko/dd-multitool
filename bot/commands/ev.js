const BASEDMG = 1e9; // absurdly high to avoid base damage bottleneck

function getHeroDamageScaling(statVal) {
    return (
        1.0 +
        0.33 *
            (Math.pow(4.0, 0.1 * 1.1) -
                1.0 +
                0.68 * (Math.pow(statVal + 1, 0.375 * 1.1) - 1.0))
    );
}

function getAb2Scaling(statVal) {
    return (
        1.0 +
        0.66 * (Math.pow(4.0, 0.0825) - 1.0) +
        0.75 * (Math.pow(statVal + 1, 0.3375) - 1.0)
    );
}

function getTotalDamage(hdmgStat, baseDamage) {
    return Math.max(
        Math.max(32.0, Math.max(1.0, baseDamage)) *
            getHeroDamageScaling(hdmgStat) *
            (1.2 * 0.8 * 0.155),
        1.0
    );
}

function getBeamDamage(hdmg, ab2) {
    return (
        getTotalDamage(hdmg, BASEDMG) * 0.6 * Math.pow(getAb2Scaling(ab2), 0.93)
    );
}

/**
 * Find optimal split of totalStats between hdmg and ab2
 * using a binary/golden section search.
 */
function findOptimalDistribution(totalStats) {
    let left = 0;
    let right = totalStats;
    const phi = (Math.sqrt(5) - 1) / 2; // golden ratio for faster convergence
    let x1 = right - phi * (right - left);
    let x2 = left + phi * (right - left);

    while (Math.abs(right - left) > 1e-3) {
        const f1 = getBeamDamage(x1, totalStats - x1);
        const f2 = getBeamDamage(x2, totalStats - x2);

        if (f1 < f2) {
            left = x1;
            x1 = x2;
            x2 = left + phi * (right - left);
        } else {
            right = x2;
            x2 = x1;
            x1 = right - phi * (right - left);
        }
    }

    const hdmg = (left + right) / 2;
    const ab2 = totalStats - hdmg;
    return {
        hdmg: hdmg,
        ab2: ab2,
    };
}

exports.name = "ev";
exports.description =
    ":robot: Calculate how much hero damage/ab2 you should aim for.";
exports.usage =
    "CLIENT_PREFIX:ev <hdmg> <ab2> OR CLIENT_PREFIX:ev <total stats>";
exports.example = "CLIENT_PREFIX:ev 6000 5000\nCLIENT_PREFIX:ev 10000";
exports.hidden = false;
exports.isAlias = false;
exports.run = (client, message, args) => {
    if (!args[0])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let total = parseInt(args[0]);
    if (isNaN(total))
        return message.channel.send(
            "One of the arguments is not a number. Consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    if (args[1]) {
        if (isNaN(parseInt(args[1]))) {
            return message.channel.send(
                "One of the arguments is not a number. Consult CLIENT_PREFIX:help.".replaceAll(
                    "CLIENT_PREFIX:",
                    client.prefix
                )
            );
        } else total += parseInt(args[1]);
    }

    const distribution = findOptimalDistribution(total);

    return message.channel.send(
        `You should aim for **${
            Math.round(distribution.hdmg) - 3
        }** hero damage and **${
            Math.round(distribution.ab2) + 3
        }** ab2. *(approximately)*`
    );
};
