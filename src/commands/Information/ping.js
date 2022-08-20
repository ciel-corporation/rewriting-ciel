const { Command } = require("../../structures/");

class Ping extends Command {
	constructor() {
		super();
		this.description = "Veja o meu ping";
		this.aliases.push("pong", "ws");
	}

	async code(client, message) {
		await message.reply(`O meu ping é **${client.ws.ping}**ms!`);
	}
}

module.exports = Ping;
