const { Event } = require("../../structures/");
const { logger } = require("../../utils/");

class Debug extends Event {
  async code(client, event) {
    await logger.warn(`[BOT] - ${event}`);
  }
}

module.exports = Debug;
