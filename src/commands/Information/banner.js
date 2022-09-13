const { Command } = require("../../structures/");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

class Avatar extends Command {
  constructor() {
    super();
    this.description = "Veja o banner de um usuário";
    this.aliases.push("bnr");
  }

  async code({ client, message, args }) {
    const author = await client.users.fetch(
      (client.users.cache.get(args[0]) || message.mentions.users.first() || message.author).id,
      {
        cache: false,
        force: true,
      }
    );
    const banner = author.bannerURL({ dynamic: true, size: 2048 });

    const embed = new EmbedBuilder()
      .setImage(banner)
      .setTimestamp()
      .setFooter({ text: author.tag })
      .setColor(this.config.colorEmbed);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel("Download").setURL(banner).setStyle(ButtonStyle.Link),
    );

    await message.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = Avatar;
