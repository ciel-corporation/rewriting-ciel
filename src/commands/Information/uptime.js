const { Command } = require("../../structures/");
const { formatDate } = require("ciel-utils");

class Uptime extends Command {
	constructor() {
		super();
		this.description = "Veja a quanto tempo estou acordado";
		this.aliases.push("up");
	}

	async code({ client, message }) {
    const time = formatDate(Date.now() - client.readyAt, "medium");
		await message.reply(`Estou acordado há: **${time}**`);
	}
}

module.exports = Uptime;
