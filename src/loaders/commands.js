const { readdirSync } = require("fs");
const { logger } = require("../utils/");
const config = require("../config.json");
const path = require("path");

async function loadCommands(client) {
	client.commands.clear();
	client.aliases.clear();

	const folders = await readdirSync("./src/commands/").filter(x => x !== "command.example.js");

	for (const folder of folders) {
		const commands = readdirSync(`./src/commands/${folder}/`).filter(x => x.endsWith(".js"));

		for (const file of commands) {
			const { name } = path.parse(file);
			delete require.cache[file];

			if (config.commandsDisabled.includes(name)) continue;
      
			const command = new (require(`../commands/${folder}/${file}`))();
			command.name = name;
			command.category = folder;
      command._path();

			client.commands.set(name, command);
			command.aliases.forEach(alias => {
				client.aliases.set(alias, name);
			});
		}
	}

	logger.sucess("[COMMANDS] - Commands have been loaded");
}

module.exports = loadCommands;
