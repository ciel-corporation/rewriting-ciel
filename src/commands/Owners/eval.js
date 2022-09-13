/* eslint-disable no-unused-vars */

const { Command } = require("../../structures/");
const { EmbedBuilder, codeBlock } = require("discord.js");
const { inspect } = require("util");
const config = require("../../config.json");
const updateEmojis = require("../../scripts/updateEmojis.js");

class Eval extends Command {
  constructor() {
    super();
    this.description = "Execute comandos usando o meu eval";
  }

  async code({ client, message, args }) {
    if (!args[0]) return message.reply("Você não disse o comando!");

    const { author, member, guild, channel } = message;

    const code = args.join(" ");
    const result = eval(code);
    const treatedResult = inspect(result, true).substring(0, 4090);

    const embed = new EmbedBuilder()
      .addField(":inbox_tray: Entrada: ", codeBlock(code))
      .addField(":outbox_tray: Saida: ", codeBlock(treatedResult))
      .addField(":thinking: Tipo de Saída: ", codeBlock(typeof result))
      .setColor(config.colorEmbed);

    await message.reply({ embeds: [embed] });
  }
}

module.exports = Eval;
