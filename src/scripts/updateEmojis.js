const { emojiGuildsId } = require("../config.json");
const { writeFileSync } = require("fs");

async function RefreshEmojiList(client) {
  const guilds = emojiGuildsId.map(id =>
    client.guilds.fetch(id, { force: true })
  );

  const emojis = [];

  for await (const guild of guilds) {
    const guildEmojis = (await guild.emojis.fetch()).map(x => x);
    emojis.push(...guildEmojis);
  }

  const emojisInObject = emojis.reduce((obj, emoji) => {
    obj[emoji.name] = emoji.toString();
    return obj;
  }, {});

  delete require.cache[require.resolve("../assets/json/emojis.json")];

  writeFileSync(
    "./src/assets/json/emojis.json",
    JSON.stringify(emojisInObject, null, 2)
  );

  console.log("[updateEmojis] - Emojis have been reloaded successfully");
}

module.exports = RefreshEmojiList;
