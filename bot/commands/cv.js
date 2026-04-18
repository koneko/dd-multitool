const { EmbedBuilder } = require("discord.js");


// thank you nienta. i have thieved idea. https://discord.com/channels/148849688722800640/499656239572058132/1495180907538288681
exports.name = "cv";
exports.description =
	":purse: Quickly count your diamonds into spendable cv.";
exports.usage =
	"CLIENT_PREFIX:cv <number of 5s> [number of 10s] [number of 15s]";
exports.example = "CLIENT_PREFIX:cv 10 5 2\nCLIENT_PREFIX:cv 10";
exports.aliases = [];
exports.hidden = false;
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
exports.run = (client, message, args) => {
	let is1nan = false;
	if (!args[0])
		return message.channel.send(
			"Not enough arguments, consult CLIENT_PREFIX:help.".replaceAll(
				"CLIENT_PREFIX:",
				client.prefix
			)
		);
	args.forEach((arg) => {
		if (isNaN(Number(arg))) {
			is1nan = true;
		}
		arg = Number(arg);
	});
	if (is1nan)
		return message.channel.send(
			"One or more of the provided arguments is not a number, please consult CLIENT_PREFIX:help.".replaceAll(
				"CLIENT_PREFIX:",
				client.prefix
			)
		);
	if (!args[1]) args[1] = 0;
	if (!args[2]) args[2] = 0;
	let sum = 0;
	args.forEach((arg, i) => {
		let num = Number(arg);
		sum += num * ((i + 1) * 5)
	});
	let embed = new EmbedBuilder();
	embed.setTitle(`${sum}cv.`)
	embed.setDescription(`With ${args[0]} fives, ${args[1]} tens, and ${args[2]} fifteens,\n\nYou have a total of **${sum}**cv!`);
	embed.setColor(0x00FF00)
	return message.channel.send({ embeds: [embed] });
};
