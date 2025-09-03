exports.name = "estimate";
exports.description =
    ":money_with_wings: Give an estimated price of certain items in cv.";
exports.usage =
    "CLIENT_PREFIX:estimate [summary of item you want the price of]";
exports.example =
    "CLIENT_PREFIX:estimate 1600 ab2\nCLIENT_PREFIX:estimate 1100 thp\nCLIENT_PREFIX:estimate 2400 app builder staff\nCLIENT_PREFIX:estimate 2200 app builder piece\nCLIENT_PREFIX:estimate 2200 app armor\n(you can also include `showtable` anywhere to show raw price data)\n(always put number first, do not put conflicting data to avoid confusion)";
exports.hidden = false;
exports.isAlias = false;
exports.run = async (client, message, args) => {
    if (!args[0]) {
        return fetch(client.sharedEndpoint + "estimate" + "?getPriceTable=true")
            .then((d) => d.json())
            .then((tbl) => {
                return message.channel.send(
                    `Available items in pricing table:\n\`\`\`\n${tbl.join(
                        "\n"
                    )}\`\`\`\nFor usage, consult \`CLIENT_PREFIX:help estimate\`
                `.replaceAll("CLIENT_PREFIX:", client.prefix)
                );
            });
    }
    const combined = args.join(" ");
    let showtable = combined.includes("showtable");
    if (combined.startsWith("help")) {
        require("./help").run(client, message, ["estimate"]);
        return;
    }

    fetch(
        client.sharedEndpoint +
            "estimate" +
            `?q=${combined}&showTable=` +
            showtable
    )
        .then((d) => d.json())
        .then((data) => {
            if (data.error) {
                if (data.error == "entry-not-found")
                    return message.channel.send(
                        "Your query couldn't be matched with anything, please refine your query or reffer to `CLIENT_PREFIX:help estimate`. You can also use `CLIENT_PREFIX:estimate` to see all available price tables for more information.".replaceAll(
                            "CLIENT_PREFIX:",
                            client.prefix
                        )
                    );
                if (data.error == "gameValue-not-found")
                    return message.channel.send(
                        "Your query did not contain a gameValue, please consult `CLIENT_PREFIX:help estimate`.".replaceAll(
                            "CLIENT_PREFIX:",
                            client.prefix
                        )
                    );
                if (data.error == "")
                    return message.channel.send(
                        "API query is somehow empty, but did not error for `entry-not-found`, please contact shiro."
                    );
            } else {
                if (showtable) {
                    const { returnKeyWord, subtable } = data;
                    let res = "";
                    subtable.forEach((entry) => {
                        res +=
                            String(entry.number).padEnd(14, " ") +
                            entry.val +
                            "\n";
                    });
                    message.channel.send(
                        `Displaying data price table for \`${returnKeyWord}\`.\n\`\`\`\nGame Value\tPrice\n${res}\`\`\``
                    );
                } else {
                    const {
                        gameValue,
                        estimatedPrice,
                        returnKeyWord,
                        closestInTable,
                    } = data;
                    let stringprice;
                    if (estimatedPrice > 499) {
                        stringprice = `a fair amount of (honestly no idea, sheet just says auction/rare )`;
                        closestInTable.val = "auction";
                        closestInTable.diff = "it";
                    } else if (estimatedPrice == 0) {
                        stringprice = "**0** (<:TavKeep:1179145911180480563>)";
                    } else {
                        stringprice = `**${estimatedPrice}**`;
                    }
                    message.channel.send(
                        `Hmm... I estimate your **${gameValue} ${returnKeyWord}** to be worth approximately ${stringprice} cv.\n*Estimation is provided through looking at past trades/price checks/sheets in DDRNG.*\n*Closest price in table: **${closestInTable.val}** cv, diff: **${closestInTable.diff}***.`
                    );
                }
            }
        })
        .catch((e) => {
            message.channel.send(
                "Fetch from API returned error with `" + e + "`"
            );
        });
};
