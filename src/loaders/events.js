const { readdirSync } = require("fs");
const { logger } = require("../utils/");
const config = require("../config.json");
const path = require("path");

async function loadCommands(client) {
	client._events = {};

	const folders = await readdirSync("./src/events/");

	for (const folder of folders) {
		const commands = readdirSync(`./src/events/${folder}/`);

		for (const file of commands) {
			const { name } = path.parse(file);
			delete require.cache[file];

			if (config.disabledEvents.includes(name)) return;

			const event = new (require(`../events/${folder}/${file}`))();
			const eventWithClient = event.run.bind(event, client);

			if (folder === "bot") client.on(name, eventWithClient);
			else if (folder === "process") process.on(name, eventWithClient);
		}
	}

	logger.sucess("[EVENTS] - Events have been loaded");
}

module.exports = loadCommands;
