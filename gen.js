const fs = require("fs");
let output = "stat,range\n";

for (let stat = 0; stat < 9000; stat++) {
    let scalar = 1.0;
    if (stat > 1000) {
        scalar += stat / 5000;
    }
    const HeroRadiusScalingStat =
        1.0 +
        0.66 * (Math.min(parseInt(stat + 1), 4) ** 0.0825 - 1.0) +
        0.75 * ((stat + 1) ** 0.3375 - 1.0);
    const range = 500 * HeroRadiusScalingStat ** 0.5 * scalar;
    output += stat + "," + Math.round(range * 100) / 100 + "\n";
}

fs.writeFileSync("output.csv", output);
