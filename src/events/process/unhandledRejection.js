const { Event } = require("../../structures/");
const { notifier } = require("../../utils/");

class UnhandledRejection extends Event {
	async code(client, error) {
		await notifier(error);
	}
}

module.exports = UnhandledRejection;
