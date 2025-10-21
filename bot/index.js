const {
    Client,
    Events,
    GatewayIntentBits,
    Collection,
    ActivityType,
} = require("discord.js");
const fs = require("fs");
const log = require("./log");
const analytics = require("./analytics");
let cfg = {};
try {
    cfg = require("./config.json");
} catch (e) {
    console.warn(
        "config.json not found or invalid. Falling back to environment variables."
    );
}
const url = "https://drive.overflow.fun/public/react.json";
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
const BLACKLISTED_USERS_IDS = [1054183205726588988]; // so far only Joann rule
const WHEELCHAIRS_GUILD_ID = 1178734676538560543;
const QUOTES = [
    "tboob is too rare, i hope this is good enough for you",
    "Banned <@399275582401282048> ",
    "Muted {author} for 67 seconds",
    "why am i half-paid? i demand no pay! no pay!",
    "time to hop on RL RG PS for the 500th time today, wish me luck :pepega:",
    "yes, sesar IS drunk again",
    "thank you {author} for your many contributions to this community",
    "no.",
    "tigi: >.<",
    "mrrp mrrp meow",
    "tbolt is a gamer who rawdogs rust",
    "if you see this, good for you :)",
    "have a cookie :cookie:",
    "With 21 upgrades spent in resistances, your piece will reach 1285, or 1800 with set bonus! :tada:",
    "WOAH, **I** am replying to Tbot's command? DAMN THATS CRAZY",
    ":nerd: the chance of getting a reply is 1/10 :nerd:",
    "i sometimes choose not to react, teehee :P",
    "mmm i love ++ items :yum:",
    "stop it >:(",
    "im just as good as tbot i swear :sob:",
    "i feel ill at ease... almost like sesar is drunk, again.",
    "1/10 chance i say, 1/10.",
    "hop on gtfo",
    "any @TWA gamers?",
    "any poly gamers?",
    "im busy making divine crystals, go away :disappointed:",
    "Muted <@837309149271425027> for 1 hour, disobedient :(",
    "thank you for reporting a mana hacker, please contact obama for a free event item (bling bling bracers)",
];

client.commands = new Collection();
client.ownerID = 263247134147608578;
client.prefix = prefix;
client.analyticsEndpoint = process.env.ANALYTICS_ENDPOINT;
client.sharedEndpoint = process.env.SHARED_ENDPOINT;
client.usersToReactTo = [];

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

    client.user.setPresence({
        activities: [
            {
                name: `pay me a fair salary! prefix is ${client.prefix}.`,
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
    if (message.content == "<<sesarisdrunkagain") {
        function random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const quote = QUOTES[random(0, QUOTES.length - 1)];
        const rand = random(1, 12);
        if (rand != 1 && message.author.id != client.ownerID) return;
        message.reply(quote.replace("{author}", `<@${message.author.id}>`));
    }
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
                "Command " + cmd.name + " exited with an exception: " + e
            );
        }
        return;
    }
    if (
        message.guildId == DDRNG_GUILD_ID &&
        !DDRNG_ALLOWED_CHANNELS.find((id) => id == message.channelId) &&
        message.author.id != client.ownerID
    )
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;
    try {
        for (let i = 0; i < BLACKLISTED_USERS_IDS.length; i++) {
            let uid = BLACKLISTED_USERS_IDS[i];
            if (message.author.id == uid) return;
        }
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
            client.analyticsEndpoint
        );
    } catch (e) {
        try {
            log.info(e);
            message.channel.send(
                "Command " + cmd.name + " exited with an exception: " + e
            );
        } catch (e2) {
            log.info("Could not send error message to server.");
            log.info(e2);
        }
    }
});

// Log in to Discord with your client's token
client.login(token);
