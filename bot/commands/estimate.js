exports.name = "estimate";
exports.description =
    ":money_with_wings: Give an estimated price of certain items in cv.";
exports.usage =
    "CLIENT_PREFIX:estimate [summary of item you want the price of]";
exports.example =
    "CLIENT_PREFIX:estimate 1600 ab2\nCLIENT_PREFIX:estimate 1100 thp\nCLIENT_PREFIX:estimate 2400 app builder staff\nCLIENT_PREFIX:estimate 2200 app builder piece\nCLIENT_PREFIX:estimate 2200 app armor\n(running the command without a query shows all available items)\n(you can also include `showtable` anywhere to show raw price data)\n(you can also include `bereal` for prices that are above 500cv for the result to be less ambigous)\n(always put number first, do not put conflicting data to avoid confusion)";
exports.aliases = ["est", "pc", "pricecheck"];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
    const isDisabled = true
    if (!client.sharedEndpoint)
        return message.channel.send(
            "client.sharedEndpoint is not set, please ping shiro.",
        );
    if (!args[0]) {
        return fetch(client.sharedEndpoint + "estimate" + "?getPriceTable=true")
            .then((d) => d.json())
            .then((tbl) => {
                return message.channel.send(
                    `Available items in pricing table:\n\`\`\`\n${tbl.join(
                        "\n",
                    )}\`\`\`\nFor usage, consult \`CLIENT_PREFIX:help estimate\`
                `.replaceAll("CLIENT_PREFIX:", client.prefix),
                );
            });
    }
    if (args[0] == "contribute") {
        return message.channel.send(
            "Do YOU want to contribute pricing data?\nWell, you can submit data to [this](https://forms.gle/8xAxaTWMu3HDY2P66) Google form. Submissions can be seen [here](https://docs.google.com/spreadsheets/d/1sq7uMNMGsw-kWebvVguOPagIRO-AnPtoaXd0vux-uUw/edit?usp=sharing) and [here](https://cdn.discordapp.com/attachments/345777754903674880/1411858405068640266/image.png?ex=68bec0da&is=68bd6f5a&hm=dc8f5a75cfe06ed630f6134080ea27e2dc034635bb2edaa5d175b71492e907bc&) is an example of how to properly fill out the form. Thank you for your contribution.",
        );
    }
    const combined = args.join(" ");
    let showtable = combined.includes("showtable");
    if (combined.startsWith("help")) {
        require("./help").run(client, message, ["estimate"]);
        return;
    }
    try {
        const result = await fetch(
            client.sharedEndpoint +
            "estimate" +
            `?q=${combined}&showTable=` +
            showtable,
        );
        const data = await result.json();
        if (data.error) {
            if (isDisabled)
                return message.channel.send(
                    "price estimation has been disabled until shiro works out a better method that factors in sides. you can still use `showtable` but even that is wrong, so at this point, sit tight and wait for a better solution. thanks for believing in me.",
                );
            if (data.error == "entry-not-found")
                return message.channel.send(
                    "Your query couldn't be matched with anything, please refine your query or refer to `CLIENT_PREFIX:help estimate`. You can also use `CLIENT_PREFIX:estimate` to see all available price tables for more information.".replaceAll(
                        "CLIENT_PREFIX:",
                        client.prefix,
                    ),
                );
            if (data.error == "gameValue-not-found")
                return message.channel.send(
                    "Your query did not contain a gameValue, please consult `CLIENT_PREFIX:help estimate`.".replaceAll(
                        "CLIENT_PREFIX:",
                        client.prefix,
                    ),
                );
            if (data.error == "")
                return message.channel.send(
                    "API query is somehow empty, but did not error for `entry-not-found`, please contact shiro.",
                );
        } else {
            if (showtable) {
                const { returnKeyWord, subtable } = data;
                let res = "";
                subtable.forEach((entry) => {
                    res +=
                        String(entry.number).padEnd(14, " ") + entry.val + "\n";
                });
                return message.channel.send(
                    `Displaying data price table for \`${returnKeyWord}\`.\n\`\`\`\nGame Value\tPrice\n${res}\`\`\``,
                );
            } else {
                if (isDisabled)
                    return message.channel.send(
                        "price estimation has been disabled until shiro works out a better method that factors in sides. you can still use `showtable` but even that is wrong, so at this point, sit tight and wait for a better solution. thanks for believing in me.",
                    );
                const {
                    gameValue,
                    estimatedPrice,
                    returnKeyWord,
                    isLastInTable,
                } = data;
                let stringprice;
                let mentionBeReal = "";
                if (estimatedPrice > 499 && !combined.includes("bereal")) {
                    stringprice = `**>__500__**`;
                    mentionBeReal =
                        " Use `bereal` for a more precise estimate.";
                } else if (estimatedPrice == 0) {
                    stringprice = "**0** (<:TavKeep:1179145911180480563>)";
                } else {
                    stringprice = `**${estimatedPrice}**`;
                }
                return message.channel.send(
                    `Price estimate of a **${gameValue} ${returnKeyWord}** is ${stringprice} cv.\n-# Estimation is provided through looking at past trades/price checks/sheets in DDRNG.${mentionBeReal}${isLastInTable
                        ? "\n-# Notice: This is the last price in the price table. It might not be accurate if your item greatly exceeds it!"
                        : ""
                    }`,
                );
            }
        }
    } catch (e) {
        return message.channel.send(
            "Fetch from API returned error with `" + e + "`",
        );
    }
};
