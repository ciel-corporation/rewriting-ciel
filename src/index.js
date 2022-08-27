const Client = require("./bot.js");
const config = require("./config.json");
const { logger } = require("./utils/");
require("dotenv").config();

(async () => {
  const client = new Client();
  module.exports = client;

  await client.login(config.tokenBot);
  await require("./loaders/").loadAll(client);
  await require("./database/index.js").start();

  logger.sucess("[INDEX] - The index was successfully loaded!");
})();
