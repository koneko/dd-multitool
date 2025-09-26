function format(seconds) {
    function pad(s) {
        return (s < 10 ? "0" : "") + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor((seconds % (60 * 60)) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + "h " + pad(minutes) + "m " + pad(seconds) + "s.";
}

exports.name = "ping";
exports.description = ":ping_pong: View service statistics.";
exports.usage = "CLIENT_PREFIX:ping";
exports.example = "CLIENT_PREFIX:ping";
exports.hidden = true;
exports.isAlias = false;
exports.run = async (client, message, args) => {
    return message.channel.send("Fetching data...").then((m) => {
        m.edit(
            `🏓 Latency is **${
                m.createdTimestamp - message.createdTimestamp
            }ms**.\nAPI Latency is **${Math.round(
                client.ws.ping
            )}ms**.\nClient uptime is **${format(process.uptime())}**`
        );
    });
};
