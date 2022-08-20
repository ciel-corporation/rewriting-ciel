const { Event } = require("../../structures/");
const { logger, notifier } = require("../../utils/");

class Ready extends Event {
	async code(client) {
		client.guilds.cache.each(async guild => {
			await guild.members.fetch().catch(notifier);
		});

		await logger.sucess(`[BOT] - ${client.user.tag} is online!`);
	}
}

module.exports = Ready;
