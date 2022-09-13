const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { logger } = require("../utils/");
const config = require("../config.json");
const path = require("path");

async function loadCommands(client) {
  client.commands.clear();
  client.aliases.clear();

  const folders = await readdirSync("./src/commands/").filter(x => x !== "command.example.js");

  for (const folder of folders) {
    const commands = readdirSync(`./src/commands/${folder}/`).filter(x => x.endsWith(".js"));

    for (const file of commands) {
      const { name } = path.parse(file);

      if (config.commandsDisabled.includes(name)) continue;

      const command = new (require(`../commands/${folder}/${file}`))();
      command.name = name;
      command.category = folder;
      command._path();

      if (command.isSub) {
        const ref = command.ref;
        const subNames = readdirSync(`./src/commands/${folder}/${ref}/`);
        const subs = new Collection();

        subNames.forEach(sub => {
          const subCommand = require(`../commands/${folder}/${ref}/${sub}`);
          const { name: subName } = path.parse(sub);
          delete require.cache[subName];

          subs.set(subName, subCommand);
          delete require.cache[require.resolve(`../commands/${folder}/${ref}/${sub}`)];
        });

        client.subCommands.set(ref, subs);
      }

      client.commands.set(name, command);
      command.aliases.forEach(alias => {
        client.aliases.set(alias, name);
      });

      delete require.cache[require.resolve(`../commands/${folder}/${file}`)];
    }
  }

  logger.sucess("[COMMANDS] - Commands have been loaded");
}

module.exports = loadCommands;
