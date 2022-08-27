const { PermissionsBitField } = require("discord.js");
const { Command } = require("../../structures/");
const { Guild } = require("../../database");
const { notifier } = require("../../utils/");

class Prefix extends Command {
  constructor() {
    super();
    this.description = "altere o meu prefixo padrão";
    this.aliases.push("p");
  }

  async code({ message, args, server }) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return message.reply("Você precisa das permissão de **Manage_Guild**!!");

    const prefix = args[0];

    if (!prefix) return message.reply("Você não disse qual é o prefixo!");
    else if (prefix.length > 4) return message.reply("O tamanho máximo do prefix é **4** caracteres");
    else if (prefix === server.prefix) return message.reply("O prefix escolhido é mesmo de agora!");

    await Guild.findByIdAndUpdate(message.guild.id, { $set: { prefix: prefix } })
      .then(message.reply(`Agora o novo prefix do servidor é **${prefix}**`))
      .catch(async error => {
        await message.reply("Não foi possivel trocar o prefix, pois ocorreu algum error interno");
        notifier(error);
      });
  }
}

module.exports = Prefix;
