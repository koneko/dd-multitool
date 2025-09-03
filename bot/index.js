const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const log = require("./log");
let cfg = {};
try {
    cfg = require("./config.json");
} catch (e) {
    console.warn(
        "config.json not found or invalid. Falling back to environment variables."
    );
}
const token = process.env.TOKEN || cfg.TOKEN;
const prefix = process.env.PREFIX || cfg.PREFIX;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const DDRNG_GUILD_ID = 148849688722800640;
const DDRNG_ALLOWED_CHANNELS = [
    496061346446835732, 499656239572058132, 771329671953776661,
    556864412338749440,
];
const WHEELCHAIRS_GUILD_ID = 1178734676538560543;
client.commands = new Collection();
client.ownerID = 263247134147608578;
client.prefix = prefix;
client.sharedEndpoint = process.env.SHARED_ENDPOINT;
if (!client.sharedEndpoint)
    return log.error(
        "client.sharedEndpoint (process.env.SHARED_ENDPOINT) is undefined."
    );

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

const url = "https://drive.overflow.fun/public/react.json";
client.usersToReactTo = [];
client.once(Events.ClientReady, async (readyClient) => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        client.usersToReactTo = data.map((entry) => {
            const [userId, emoji] = entry.split("|");
            return { userId, emoji };
        });
    } catch (e) {
        console.warn("copyparty is offline, wont work.");
    }
    log.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    client.usersToReactTo.forEach(async (item) => {
        if (
            message.mentions.users.find((u) => u.id == item.userId) &&
            !message.reference
        ) {
            try {
                await message.react(item.emoji);
            } catch (err) {
                console.error("Failed to react to message:", err);
            }
        }
    });

    if (
        message.content.indexOf(prefix) !== 0 &&
        message.guildId != WHEELCHAIRS_GUILD_ID
    )
        return;
    if (
        message.guildId == WHEELCHAIRS_GUILD_ID &&
        message.content.indexOf(prefix) !== 0
    ) {
        let cprefix = "<<";
        if (message.content.indexOf(cprefix) !== 0) return;
        const args = message.content.slice(cprefix.length).trim().split(/ +/g);
        console.log(args);
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
        return;
    }
    if (
        message.guildId == DDRNG_GUILD_ID &&
        !DDRNG_ALLOWED_CHANNELS.find((id) => id == message.channelId)
    )
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(args);

    const cmd = client.commands.get(command);
    console.log(command);
    console.log(cmd);

    if (!cmd) return;
    try {
        await cmd.run(client, message, args);
    } catch (e) {
        message.channel.send(
            "Command " + cmd.name + " exited with an exception: " + e
        );
    }
});

// Log in to Discord with your client's token
client.login(token);
