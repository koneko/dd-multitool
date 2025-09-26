const {
    Client,
    Events,
    GatewayIntentBits,
    Collection,
    ActivityType,
    EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const log = require("./log");
const TOKEN = process.env.ANALYTICS_TOKEN;
const PREFIX = process.env.ANALYTICS_PREFIX;
const LOG_CHANNEL_ID = process.env.ANALYTICS_LOG_CHANNEL_ID;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.commands = new Collection();
client.ownerID = 263247134147608578;
client.prefix = PREFIX;

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        log.info("Loaded command " + commandName);
        client.commands.set(commandName, props);
    });
});

client.once(Events.ClientReady, async () => {
    client.user.setPresence({
        activities: [
            {
                name: "Online and collecting analytics data.",
                type: ActivityType.Custom,
            },
        ],
        status: "online",
    });
    console.log("Connected to discord as " + client.user.username + ".");
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;
    try {
        await cmd.run(client, message, args);
    } catch (e) {
        message.channel.send(
            "Command " + cmd.name + " exited with an exception: " + e
        );
    }
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.get("/health", (req, res) => {
    res.status(200).send("<p>hi</p>");
});

app.post("/api/command", jsonParser, async (req, res) => {
    try {
        if (!req.body) res.status(400).send("missing body");
        const channel = await client.channels.fetch(LOG_CHANNEL_ID);
        let embed = new EmbedBuilder();
        if (
            !req.body.username ||
            !req.body.userID ||
            !req.body.command ||
            !req.body.args ||
            !req.body.botResult ||
            !req.body.userURL ||
            !req.body.nickname
        )
            return res.status(403).send("invalid body");
        if (req.body.command == "refetch")
            return res.status(200).send("no thanks");
        if (req.body.args.length == 0) req.body.args = ["None."];
        embed.addFields(
            {
                name: "Triggering User",
                value: `\`${req.body.username}\` aka \`${req.body.nickname}\` (<@${req.body.userID}>)`,
            },
            {
                name: "Command",
                value: req.body.command,
            },
            {
                name: "Arguments",
                value: req.body.args.join(" "),
            },
            {
                name: "Bot Result",
                value: req.body.botResult,
            }
        );
        embed.setAuthor({
            name: req.body.username,
            iconURL: req.body.userURL,
        });
        res.send("thanks");
        channel.send({ embeds: [embed] });
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
});

app.listen(process.env.PORT, () => {
    log.info("API listening on port " + process.env.PORT);
    client.login(TOKEN);
});
