const { Event } = require("../../structures/");
const { logger } = require("../../utils/");

class Error extends Event {
  async code(client, error) {
    await logger.error(`[BOT] - ${error}`);
  }
}

module.exports = Error;
