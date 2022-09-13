const { Command } = require("../../structures/");
const { EmbedBuilder, codeBlock } = require("discord.js");
const Emojis = require("../../assets/json/emojis.json");
const { promisify } = require("util");
const terminal = promisify(require("child_process").exec);

class Shell extends Command {
  constructor() {
    super();
    this.description = "Abra o meu terminal";
    this.aliases.push("zsh", "terminal");
  }

  async code({ message, args }) {
    if (!args[0]) return message.reply("Você não disse o comando!");

    const embed = new EmbedBuilder()
      .setDescription(`${Emojis.loading} Abrindo terminal`)
      .setColor(this.config.colorEmbed);

    const response = await message.reply({ embeds: [embed] });
    const edit = replyEmbed => response.edit({ embeds: [replyEmbed] });

    const command = args.join(" ");
    console.log(`[TERMINAL] - ${command}`);

    await edit(
      embed.setDescription(`${Emojis.loading} executando o comando: ${command}`)
    );
    const result = await terminal(command); // stderr
    await edit(embed.setDescription(codeBlock(result.toString())));
  }
}

module.exports = Shell;
