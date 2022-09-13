exports.commandLoader = require("./commands.js");
exports.eventLoader = require("./events.js");

exports.loadAll = async client => {
	await exports.commandLoader(client);
	await exports.eventLoader(client);
};
