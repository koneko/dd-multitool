const priceTable = [
    {
        regex: /\b(?:thp|summoner|summ|thp armor|summoner armor|summ armor)\b/i,
        returnKeyWord: "summoner/thp piece",
        prices: [
            "1000;10",
            "1050;12",
            "1100;15",
            "1150;25",
            "1200;30",
            "1250;100",
            "1300;500",
        ],
    },
    {
        regex: /\b(?:ab1)\b/i,
        returnKeyWord: "dps ab1",
        prices: [
            "1400;20",
            "1500;40",
            "1550;60",
            "1600;100",
            "1667;300",
            "1770;1500",
        ],
    },
    {
        regex: /\b(?:genie)\b/i,
        returnKeyWord: "genie",
        prices: ["833;55", "900;100", "999;130"],
    },
    {
        regex: /\b(?:dps|ab2|dps armor|ab2 armor)\b/i,
        returnKeyWord: "dps/ab2 piece",
        prices: [
            "1400;20",
            "1450;35",
            "1500;50",
            "1550;75",
            "1580;120",
            "1590;130",
            "1600;150",
            "1650;500",
            "1700;1000",
            "1750;2000",
            "1800;5000",
        ],
    },
    {
        regex: /\b(?:tb|tower boost|adept upper)\b/i,
        returnKeyWord: "tb/pure ab1 piece",
        prices: [
            "980;5",
            "1050;15",
            "1100;40",
            "1150;70",
            "1173;150",
            "1200;500",
        ],
    },
    {
        regex: /\b(?:app builder staff|apprentice builder staff|app staff|apprentice staff|apprentice builder weapon|app builder weapon)\b/i,
        returnKeyWord: "apprentice builder staff",
        prices: [
            "2200;5",
            "2250;15",
            "2300;25",
            "2350;35",
            "2400;45",
            "2450;70",
            "2500;100",
            "2550;175",
            "2600;250",
            "2700;400",
            "2800;500",
            "2900;2000",
        ],
    },
    {
        regex: /\b(?:app builder armor|apprentice builder armor|app builder piece|apprentice builder piece|app piece|apprentice piece|app builder|apprentice builder|app)\b/i,
        returnKeyWord: "apprentice builder piece",
        prices: [
            "2000;25",
            "2050;35",
            "2100;50",
            "2150;80",
            "2200;150",
            "2250;200",
            "2300;500",
            "2350;1000",
            "2400;5000",
        ],
    },
    {
        regex: /\b(?:hermit's swallow|swallow|hermit swallow)\b/i,
        returnKeyWord: "hermit's swallow",
        prices: ["192000;25", "199000;100", "210000;400"],
    },
    {
        regex: /\b(?:builder hermit|herm|hermit)\b/i,
        returnKeyWord: "builder hermit piece", // blame SoL
        prices: [
            "2000;13",
            "2050;17",
            "2100;25",
            "2150;40",
            "2200;75",
            "2250;110",
            "2300;250",
            "2350;500",
            "2400;1000",
        ],
    },
    {
        regex: /\b(?:aura|trange|range|monk)\b/i,
        returnKeyWord: "aura/trange piece",
        prices: [
            "1000;5",
            "1050;15",
            "1100;25",
            "1150;50",
            "1200;100",
            "1250;200",
            "1300;300",
        ],
    },
    {
        regex: /\b(?:lumeric staff|beamer ev|dps ev weapon)\b/i,
        returnKeyWord: "dps ev weapon/lumeric staff",
        prices: ["56000;15"],
    },
    {
        regex: /\b(?:builder ev weapon|kk ev)\b/i,
        returnKeyWord: "builder ev weapon",
        prices: ["999;10"],
    },
    {
        regex: /\b(?:ev|tdmg|tdamage|tower damage)\b/i,
        returnKeyWord: "builder ev/tower damage piece",
        prices: [
            "1000;5",
            "1050;15",
            "1100;25",
            "1150;50",
            "1200;100",
            "1250;200",
            "1300;300",
        ],
    },
    {
        regex: /\b(?:cupid|lover's cupid)\b/i,
        returnKeyWord: "cupid",
        prices: [
            "50000;5",
            "51000;10",
            "52000;15",
            "53000;20",
            "54000;50",
            "55000;90",
            "56000;110",
        ],
    },
    {
        regex: /\b(?:builder warden weapon|warden weapon|warden|warden builder spear|warden spear)\b/i,
        returnKeyWord: "builder warden weapon",
        prices: [
            "2200;5",
            "2300;25",
            "2400;60",
            "2500;100",
            "2600;150",
            "2700;250",
            "2800;400",
            "2810;500",
        ],
    },
    {
        regex: /\b(?:cdrag|crystalline dragon|dragon)\b/i,
        returnKeyWord: "cdrag",
        prices: [
            "60000;90",
            "61000;100",
            "62000;150",
            "63000;190",
            "64000;230",
            "65000;400",
            "66000;700",
            "67000;1500",
        ],
    },
    {
        regex: /\b(?:ult acc|ultimate accessory|ultimate acc|acc|ult accessory)\b/i,
        returnKeyWord: "ultimate accessory",
        prices: ["500;5", "520;150", "540;250"],
    },
    {
        regex: /\b(?:gw armor|gw|gunwitch|gunwitch armor)\b/i,
        returnKeyWord: "gunwitch armor",
        prices: [
            "1484;35",
            "1500;40",
            "1550;60",
            "1580;120",
            "1600;250",
            "1700;500",
        ],
    },
    {
        regex: /\b(?:witch's broom|broom|witch broom)\b/i,
        returnKeyWord: "witch's broom",
        prices: [
            "300000;20",
            "316000;50",
            "330000;105",
            "346000;150",
            "354000;350",
            "368000;500",
        ],
    },
    {
        regex: /\b(?:ice needle|ice needle armor)\b/i,
        returnKeyWord: "ice needle armor",
        prices: ["1084;30"],
    },
    {
        regex: /\b(?:madness boulder thrower|mbt)\b/i,
        returnKeyWord: "madness boulder thrower",
        prices: ["914;20", "974;100", "988;150"],
    },
    {
        regex: /\b(?:calamity blade|cblade|cb)\b/i,
        returnKeyWord: "calamity blade",
        prices: [
            "96000;20",
            "99000;40",
            "102000;75",
            "103000;100",
            "104000;110",
            "106000;125",
        ],
    },
    {
        regex: /\b(?:eye|eye of desolation|eye of ruin|eye of destruction)\b/i,
        returnKeyWord: "eye of desolation/ruin/destruction",
        prices: ["54000;25", "64000;70", "65000;80", "67000;150", "68000;500"],
    },
];

function constructPriceSubTable(idx) {
    const orig = priceTable[idx];
    const priceSubTable = [];
    orig.prices.forEach((price) => {
        const splitPrice = price.split(";");
        const obj = {
            number: parseInt(splitPrice[0]),
            val: parseInt(splitPrice[1]),
        };
        priceSubTable.push(obj);
    });
    return priceSubTable;
}

function findClosestPrice(subtable, gameValue) {
    let closestIdx = 0;
    let closest = subtable[closestIdx];
    let smallestDiff = Math.abs(subtable[0].number - gameValue);

    for (let i = 1; i < subtable.length; i++) {
        const diff = Math.abs(subtable[i].number - gameValue);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = subtable[i];
            closestIdx = i;
        }
    }

    return { val: closest.val, diff: smallestDiff, idx: closestIdx };
}

function weightedInterpolatePrice(pricesArr, inputNum, p = 2) {
    let lower = null;
    let upper = null;

    for (let i = 0; i < pricesArr.length; i++) {
        if (pricesArr[i].number === inputNum) return pricesArr[i].val;
        if (pricesArr[i].number < inputNum) lower = pricesArr[i];
        if (pricesArr[i].number > inputNum) {
            upper = pricesArr[i];
            break;
        }
    }

    if (!lower) return upper.val;
    if (!upper) return lower.val;

    const fraction = (inputNum - lower.number) / (upper.number - lower.number);
    const weight =
        Math.pow(fraction, p) /
        (Math.pow(fraction, p) + Math.pow(1 - fraction, p));

    return lower.val + weight * (upper.val - lower.val);
}

function validateNum(input) {
    const valid = /^(\d+(\.\d+)?)(k)?$/i.test(input);

    if (!valid) {
        return null;
    }

    const match = input.match(/^(\d+(\.\d+)?)(k)?$/i);
    let number = parseFloat(match[1]);

    if (match[3]) {
        number *= 1000;
    }

    return parseInt(number.toString());
}

export const get = async (req, res) => {
    if (req.query.getPriceTable) {
        let tbl = [];
        priceTable.forEach((p) => {
            tbl.push(p.returnKeyWord);
        });
        return res.json(tbl);
    }
    const mass = req.query.mass;
    if (mass != undefined && mass.replace(" ", "").length != 0) {
        try {
            const data = JSON.parse(mass);
            const outputPrices = [];
            data.forEach((item) => {
                let entryFound = false;
                let estimatedPrice = 0;
                let subtable, closestInTable;
                let gameValue = -1;
                let returnKeyWord = "";
                let isLastInTable = false;

                item.split(" ").forEach((arg) => {
                    if (gameValue == -1 && validateNum(arg)) {
                        gameValue = validateNum(arg);
                    }
                });

                if (gameValue == -1) {
                    return outputPrices.push({
                        estimatedPrice: null,
                        closestInTable: null,
                        isLastInTable: null,
                        error: "gameValue-not-found",
                    });
                }

                priceTable.forEach((price, idx) => {
                    if (price.regex.test(item.trim()) && !entryFound) {
                        entryFound = true;
                        returnKeyWord = price.returnKeyWord;
                        subtable = constructPriceSubTable(idx);
                        closestInTable = findClosestPrice(subtable, gameValue);
                        estimatedPrice = Math.round(
                            weightedInterpolatePrice(subtable, gameValue),
                        );
                        if (
                            closestInTable.idx == 0 &&
                            closestInTable.diff > 100
                        ) {
                            estimatedPrice = 0;
                        }
                        if (estimatedPrice < 0) {
                            estimatedPrice = 0;
                        }
                        if (estimatedPrice > 100000) {
                            estimatedPrice = 100000;
                        }
                        if (closestInTable.idx == subtable.length - 1) {
                            isLastInTable = true;
                        }
                    }
                });
                if (entryFound) {
                    outputPrices.push({
                        estimatedPrice,
                        closestInTable,
                        isLastInTable,
                        error: null,
                    });
                } else
                    outputPrices.push({
                        estimatedPrice: null,
                        closestInTable: null,
                        isLastInTable: null,
                        error: "price-not-found",
                    });
            });
            return res.json(outputPrices);
        } catch (e) {
            return res.status(400).json({
                error: "mass should be a JSON array of strings, not anything else.",
            });
        }
    }

    const combined = req.query.q;
    if (!combined || combined.replace(" ", "").length == 0)
        return res.status(400).json({ error: "missing-query" });

    let entryFound = false;
    let estimatedPrice = 0;
    let subtable, closestInTable;
    let gameValue = -1;
    let returnKeyWord = "";
    let isLastInTable = false;

    combined.split(" ").forEach((arg) => {
        if (gameValue == -1 && validateNum(arg)) {
            gameValue = validateNum(arg);
        }
    });

    if (
        gameValue == -1 &&
        (req.query.showTable == "false" || !req.query.showTable)
    ) {
        return res.status(400).json({ error: "gameValue-not-found" });
    }

    priceTable.forEach((price, idx) => {
        if (price.regex.test(combined.trim()) && !entryFound) {
            entryFound = true;
            returnKeyWord = price.returnKeyWord;
            subtable = constructPriceSubTable(idx);
            closestInTable = findClosestPrice(subtable, gameValue);
            estimatedPrice = Math.round(
                weightedInterpolatePrice(subtable, gameValue),
            );
            if (closestInTable.idx == 0 && closestInTable.diff > 100) {
                estimatedPrice = 0;
            }
            if (estimatedPrice < 0) {
                estimatedPrice = 0;
            }
            if (estimatedPrice > 100000) {
                estimatedPrice = 100000;
            }
            if (closestInTable.idx == subtable.length - 1) {
                isLastInTable = true;
            }
        }
    });
    if (entryFound) {
        if (req.query.showTable && req.query.showTable != "false") {
            return res.json({
                returnKeyWord,
                subtable,
            });
        } else {
            return res.json({
                gameValue,
                estimatedPrice,
                returnKeyWord,
                closestInTable,
                isLastInTable,
            });
        }
    } else return res.status(400).json({ error: "entry-not-found" });
};
