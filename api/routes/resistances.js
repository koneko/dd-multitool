export const get = async (req, res) => {
    let mainStat = Number(req.query.mainStat);
    let upgrades = Number(req.query.upgrades);
    let subStat = Number(req.query.subStat);

    if (isNaN(mainStat) || isNaN(upgrades) || isNaN(subStat)) {
        return res.status(400).json({
            error: "mainStat, upgrades, and subStat must be numbers",
        });
    }

    let resistances;
    try {
        resistances = JSON.parse(req.query.resistances);
    } catch (err) {
        return res
            .status(400)
            .json({ error: "resistances must be a valid JSON array" });
    }

    if (!Array.isArray(resistances) || resistances.length !== 4) {
        return res
            .status(400)
            .json({ error: "resistances must be an array of 4 elements" });
    }

    for (let i = 0; i < 3; i++) {
        if (typeof resistances[i] !== "number") {
            return res
                .status(400)
                .json({ error: `resistances[${i}] must be a number` });
        }
    }
    if (resistances[3] !== null && typeof resistances[3] !== "number") {
        return res
            .status(400)
            .json({ error: "resistances[3] must be a number or null" });
    }
    upgrades = upgrades - 1;
    let resUpgrades = 0;
    resistances.forEach((res) => {
        if (res == null) return;
        if (res > 29) res = 29;
        if (res < 29) {
            if (res < 0) {
                let underzero = Math.abs(res);
                if (underzero < 13) {
                    resUpgrades += 23 + Math.abs(res);
                } else {
                    if (underzero == 13 || underzero == 14) {
                        resUpgrades += 23 + 13;
                    }
                    if (underzero == 15 || underzero == 16) {
                        resUpgrades += 23 + 13 + 1;
                    }
                    if (underzero == 17 || underzero == 18) {
                        resUpgrades += 23 + 13 + 2;
                    }
                    if (underzero == 19 || underzero == 20 || underzero == 22) {
                        resUpgrades += 23 + 13 + 3;
                    }
                    if (underzero == 21 || underzero == 23) {
                        resUpgrades += 23 + 13 + 4;
                    }
                    if (underzero > 23) {
                        resUpgrades += 29 - underzero;
                    }
                }
            } else {
                if (res < 14) {
                    let am = 14 - res;
                    resUpgrades += am + 4 + 6;
                } else {
                    if (res == 14) {
                        resUpgrades += 4 + 6;
                    }
                    if (res == 15 || res == 16) {
                        resUpgrades += 3 + 6;
                    }
                    if (res == 17 || res == 18) {
                        resUpgrades += 2 + 6;
                    }
                    if (res == 19 || res == 20 || res == 22) {
                        resUpgrades += 1 + 6;
                    }
                    if (res == 21 || res == 23) {
                        resUpgrades += 6;
                    }
                    if (res > 23) {
                        resUpgrades += 29 - res;
                    }
                }
            }
        }
    });
    upgrades -= resUpgrades;
    mainStat += upgrades;
    if (mainStat > 999) {
        let over = mainStat - 999;
        mainStat -= over;
        subStat += over;
    }
    return res.json({
        resUpgrades,
        mainStat,
        subStat,
        bonus: Math.ceil(mainStat * 1.4 + subStat * 1.4),
    });
};
