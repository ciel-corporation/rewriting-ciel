const { Command } = require("../../structures/");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

class Avatar extends Command {
  constructor() {
    super();
    this.description = "Veja o avatar de um usuário";
    this.aliases.push("av", "perfil");
  }

  async code({ client, message, args }) {
    const author = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;
    const avatar = author.displayAvatarURL({ dynamic: true, size: 2048 });

    const embed = new EmbedBuilder()
      .setImage(avatar)
      .setTimestamp()
      .setFooter({ text: author.tag })
      .setColor(this.config.colorEmbed);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Download")
        .setURL(avatar)
        .setStyle(ButtonStyle.Link)
    );

    await message.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = Avatar;
