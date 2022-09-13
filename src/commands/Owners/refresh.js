const { Command } = require("../../structures/");
const { commandLoader, eventLoader } = require("../../loaders/");

class Refresh extends Command {
  constructor() {
    super();
    this.description = "Recarregue os comandos ou eventos";
    this.aliases.push("reload");
  }

  async code({ client, message, args }) {
    switch (args[0]) {
      case "commands":
        await commandLoader(client);
        break;
      case "events":
        await eventLoader(client);
        break;
      default:
        return message.reply("Você não disse se é comandos ou eventos!");
    }

    return message.reply(`Todos os **${args[0]}** foram recarregados com **sucesso**.`);
  }
}

module.exports = Refresh;
