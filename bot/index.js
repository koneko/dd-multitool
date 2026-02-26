const {
    Client,
    Events,
    GatewayIntentBits,
    Collection,
    ActivityType,
} = require("discord.js");
const { Worker } = require("worker_threads");
const fs = require("fs");
const log = require("./log");
const analytics = require("./analytics");
const OpenAI = require("openai");
let cfg = {};
try {
    cfg = require("./config.json");
} catch (e) {
    console.warn(
        "config.json not found or invalid. Falling back to environment variables.",
    );
}
const REACTION_URL = "https://drive.overflow.fun/public/react.json";
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
    496061346446835732, 771329671953776661, 556864412338749440,
];
const DDRNG_SPECIAL_ROLES = [
    634979100196339712, // Admins
    192066560410517505, // Mods unhoisted role
    1035187756223172669, // Moderators hoisted role
    979954082913599638, // Dyno Commands
];
const WHEELCHAIRS_GUILD_ID = 1178734676538560543;
client.commands = new Collection();
client.ownerID = 263247134147608578;
client.prefix = prefix;
client.analyticsEndpoint = process.env.ANALYTICS_ENDPOINT;
client.sharedEndpoint = process.env.SHARED_ENDPOINT;
client.usersToReactTo = [];
client.blacklistedUserIDs = [];
client.oaiClient = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});
if (!client.sharedEndpoint && process.argv[2] != "--no-shared")
    return log.error(
        "client.sharedEndpoint (process.env.SHARED_ENDPOINT) is undefined. (Pass --no-shared as flag to disable, be careful though!)",
    );

if (!client.analyticsEndpoint)
    log.warn(
        "client.analyticsEndpoint (process.env.ANALYTICS_ENDPOINT) is undefined.",
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

client.once(Events.ClientReady, async (readyClient) => {
    try {
        const res = await fetch(REACTION_URL);
        const data = await res.json();

        client.usersToReactTo = data.map((entry) => {
            const [userId, emoji] = entry.split("|");
            return { userId, emoji };
        });
    } catch (e) {
        console.warn("Unable to fetch reactions. copyparty might be down.");
    }

    client.user.setPresence({
        activities: [
            {
                name: `My prefix is ${client.prefix} and you can type help if you need any.`,
                type: ActivityType.Custom,
            },
        ],
        status: "online",
    });
    log.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.guildId != DDRNG_GUILD_ID)
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
    // if we are in wheelchairs server, allow use of the `cprefix`.
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
        log.info(args);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        try {
            const a = await cmd.run(client, message, args);
            log.info(a);
        } catch (e) {
            message.channel.send(
                "Command " + cmd.name + " exited with an exception: " + e,
            );
        }
        return;
    }
    if (
        message.guildId == DDRNG_GUILD_ID &&
        message.author.id != client.ownerID &&
        message.author.id != "498160761286164500" && // cause scryllix is my friend :)
        !DDRNG_ALLOWED_CHANNELS.find((id) => id == message.channelId)
    )
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);

    if (!cmd) {
        cmd = client.commands.find((cmd) =>
            cmd.aliases.find((alias) => alias == command),
        );
        if (!cmd && client.sharedEndpoint != null) {
            const result = await fetch(
                client.sharedEndpoint + "knowledge?topic=list",
            );
            const data = await result.json();
            const topic = data.topics.find((t) => t.startsWith(command));
            if (!topic) return;
            cmd = client.commands.get("kb");
            cmd.run(client, message, [topic]);
            return;
        }
    }

    try {
        let cmdResult = await cmd.run(client, message, args);
        if (!cmdResult)
            cmdResult = {
                content:
                    "Command did not return an analytics friendly response.",
            };
        if (cmdResult.content == "") cmdResult.content = "Embeded result.";
        analytics(
            message.author.username,
            message.author.id,
            message.author.avatarURL(),
            cmd.name,
            args,
            cmdResult.content,
            message.author.displayName,
            client.analyticsEndpoint,
        );
    } catch (e) {
        try {
            log.info(e);
            message.channel.send(
                "Command " + cmd.name + " exited with an exception: " + e,
            );
        } catch (e2) {
            log.info("Could not send error message to server.");
            log.info(e2);
        }
    }
});

// Log in to Discord with your client's token
client.login(token);
