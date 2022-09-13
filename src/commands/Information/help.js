const { Command } = require("../../structures/");
const { EmbedBuilder, codeBlock } = require("discord.js");
const Emojis = require("../../assets/json/emojis.json");

class Help extends Command {
  constructor() {
    super();
    this.description = "Veja o meu help";
    this.aliases.push("ajuda", "commands");
  }

  async code({ client, message }) {
    const avatar = client.user.displayAvatarURL();

    const allCommands = client.commands.map(x => x);
    const categories = {};
    const fields = [];

    for (const command of allCommands) {
      const { category, name } = command;
      categories[category] = categories[category] || [];
      categories[category].push(name);
    }

    for (const category in categories) {
      if (
        category === "Owners" &&
        !this.config.ownerIds.includes(message.author.id)
      )
        continue;
      fields.push({
        name: `${Emojis[category]} ${category}: (${categories[category].length})`,
        value: codeBlock(categories[category].join(" - ")),
      });
    }

    const description =
      "Olá, aqui estão todos os meus comandos " +
      `somando um total de **${allCommands.length}**, caso encontre algum bug, use comando **bugreport**, ` +
      "caso você quiser deixar uma sugestão, use o comando **suggestion**";

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Central de comandos", iconURL: avatar })
      .setDescription(description)
      .addFields(fields)
      .setColor(this.config.colorEmbed);

    await message.reply({ embeds: [embed] });
  }
}

module.exports = Help;
