const { notifier } = require("../utils/");
const { wait } = require("ciel-utils");
const config = require("../config.json");

class Command {
  constructor() {
    this.name = "null";
    this.description = "null";
    this.aliases = [];
    this.config = config;
  }

  code() {}

  async run({ client, message, ...rest }) {
    const { error } = await wait(this.code({ client, message, ...rest }));
    if (error) {
      message.reply("Aconteceu algum error ao tentar usar o comando, tente usar o comando bugreport");
      await notifier(error);
    }
  }

  _path() {
    this.usage = this.usage ? `${this.name} ${this.usage}` : this.name;
    this.aliases.push(this.name.toUpperCase());
    this.ref = this.isSub ? this.name.toLowerCase().replace(/(\s|^)\w/g, m => m.toUpperCase()) : null;
  }
}

module.exports = Command;
