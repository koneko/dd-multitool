const alias = require("./mapoftheweek");
exports.name = "motw";
exports.description = alias.description;
exports.usage = alias.usage;
exports.example = alias.example;
exports.hidden = false;
exports.isAlias = true;
exports.run = alias.run;
