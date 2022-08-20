const { Event } = require("../../structures/");

class MessageCreate extends Event {
	async code(client, message) {
		if (message.author.bot) return;
		if (!message.inGuild()) return;

		const prefix = this.config.prefix;

		if (!message.content.startsWith(prefix)) return;
		else if (message.content === prefix) return;

		const messageSplit = message.content.split(" ");
		const args = messageSplit.slice(1);
		const cmdName = messageSplit[0].slice(prefix.length);

		const cmdFile = client.commands.get(client.aliases.get(cmdName) || cmdName);

		if (cmdFile) {
			if (cmdFile.category === "Owner" && this.config.ownerIds.includes(author.id)) return;
			await cmdFile.run(client, message, args);
		}
	}
}

module.exports = MessageCreate;
