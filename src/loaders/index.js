exports.commands = require("./commands.js");
exports.events = require("./events.js");

exports.loadAll = async client => {
	await exports.commands(client);
	await exports.events(client);
};
