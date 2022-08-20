const { Event } = require("../../structures/");
const { notifier } = require("../../utils/");

class UncaughtRejection extends Event {
	async code(client, error) {
		await notifier(error);
	}
}

module.exports = UncaughtRejection;
