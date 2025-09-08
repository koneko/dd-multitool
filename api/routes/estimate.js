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
        regex: /\b(?:dps ab1)\b/i,
        returnKeyWord: "dps ab1",
        prices: ["1400;20", "1500;40", "1550;60", "1600;100"],
    },
    {
        regex: /\b(?:dps|ab2|dps armor|ab2 armor|monk)\b/i,
        returnKeyWord: "dps/ab2 piece",
        prices: [
            "1400;20",
            "1450;35",
            "1500;50",
            "1550;75",
            "1600;250",
            "1650;500",
            "1700;800",
            "1750;1000",
            "1800;2000",
        ],
    },
    {
        regex: /\b(?:tb|ab1|tower boost|adept upper)\b/i,
        returnKeyWord: "tb/ab1 piece",
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
        regex: /\b(?:app builder staff|apprentice builder staff|app staff|apprentice staff)\b/i,
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
            "2250;220",
            "2300;500",
            "2350;1000",
            "2400;2000",
        ],
    },
    {
        regex: /\b(?:aura|trange|range)\b/i,
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
        regex: /\b(?:ev|tdmg|tdamage)\b/i,
        returnKeyWord: "builder ev/tower damage piece",
        prices: ["950;5", "1040;10"],
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
        regex: /\b(?:)\b/i,
        returnKeyWord: "",
        prices: ["950;5"],
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

    const combined = req.query.q;
    if (!combined || combined.replace(" ", "").length == 0)
        return res.status(400).json({ error: "missing-query" });

    let entryFound = false;
    let estimatedPrice = 0;
    let subtable, closestInTable;
    let gameValue = -1;
    let returnKeyWord = "";

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
                weightedInterpolatePrice(subtable, gameValue)
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
            });
        }
    } else return res.status(400).json({ error: "entry-not-found" });
};
