const { Event } = require("../../structures/");
const { logger } = require("../../utils/");

class Ready extends Event {
	async code(client) {
		client.guilds.cache.each(async guild => {
			await guild.members.fetch().catch(console.error);
		});

		await logger.sucess(`[BOT] - ${client.user.tag} is online!`);
	}
}

module.exports = Ready;
