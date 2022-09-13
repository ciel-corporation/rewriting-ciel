const { Event } = require("../../structures/");
const { User, Guild } = require("../../database/");

class MessageCreate extends Event {
  async code(client, message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;
    
    const author = message.author;
    const guild = message.guild;

    const user = await User.findByIdAndUpdate(author.id, {}, { new: true, upsert: true });
    const server = await Guild.findByIdAndUpdate(guild.id, {}, { new: true, upsert: true });
    
    const prefix = server.prefix;

    if (!message.content.startsWith(prefix)) return;
    else if (message.content === prefix) return;

    const messageSplit = message.content.split(" ");
    const args = messageSplit.slice(1);
    const cmdName = messageSplit[0].slice(prefix.length);

    const cmdFile = client.commands.get(client.aliases.get(cmdName) || cmdName);

    if (cmdFile) {
      if (cmdFile.category === "Owners" && !this.config.ownerIds.includes(author.id)) return;
      await cmdFile.run({ client, message, args, user, server });
    }
  }
}

module.exports = MessageCreate;
