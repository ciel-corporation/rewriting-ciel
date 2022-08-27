const { Client, Collection } = require("discord.js");
const { logger } = require("./utils/");

class Bot extends Client {
	constructor() {
		super({
			intents: 3276799,
			presence: {
				activities: [{ name: "meu servidor favorito", type: 3 }],
			},
			ws: {
				properties: {
					browser: "Discord iOS",
				},
			},
		});

		this.commands = new Collection();
    this.subCommands = new Collection();
		this.aliases = new Collection();
	}

	destroy() {
		logger.warn("[CLIENT] - The system is restarting");
		super.destroy();
		process.exit();
	}
}

module.exports = Bot;
