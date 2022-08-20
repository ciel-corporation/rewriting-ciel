const { notifier } = require("../utils/");
const { wait } = require("ciel-utils");
const config = require("../config.json");

class Event {
	constructor() {
		this.config = config;
	}

	async run(client, message, ...rest) {
		const { error } = await wait(this.code(client, message, ...rest));
		if (error) await notifier(error);
	}

	code() {}
}

module.exports = Event;
