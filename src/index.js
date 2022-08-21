const Client = require("./bot.js");
const config = require("./config.json");
const { logger } = require("./utils/");

(async () => {
	const client = new Client();
  module.exports = client;
  
  await client.login(config.botToken);
	await require("./loaders/").loadAll(client);
	logger.sucess("[INDEX] - The index was successfully loaded!");
})();
