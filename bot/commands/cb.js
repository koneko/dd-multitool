const log = require("../log");
exports.name = "cb";
exports.description =
    ":crossed_swords: Calculate calamity blade damage taking in to account projectile speed.";
exports.usage = "CLIENT_PREFIX:cb <damage> <ups> [projectile speed]";
exports.example = "CLIENT_PREFIX:cb 10000 250 10000";
exports.hidden = false;
exports.isAlias = false;
exports.run = (client, message, args) => {
    if (!args[0] || !args[1])
        return message.channel.send(
            "Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
                "CLIENT_PREFIX:",
                client.prefix
            )
        );
    let cb = parseInt(args[0]);
    let ups = parseInt(args[1]);
    if (isNaN(cb) || isNaN(ups))
        return message.channel.send("Damage or ups should be a number.");
    let initialspeed = null;
    if (args[2]) {
        initialspeed = parseInt(args[2]);
        if (isNaN(initialspeed))
            return message.channel.send("Projectile speed should be a number.");
        initialspeed = 30000 - initialspeed;
        let t = Math.ceil(initialspeed / 1200);
        log.info(t);
        ups = ups - t;
    }
    let resnum = cb + ups * 192;
    return message.channel.send(
        `Your Calamity Blade will hit **${resnum}** damage.`
    );
};
