const { EmbedBuilder, codeBlock } = require("discord.js");
const { stripIndents } = require("common-tags");
const axios = require("axios");
const config = require("../../config.json");

async function notifier(error) {
	const { username, avatarURL, url, color } = config.webhook;

	let message = error.stack ?? error.message;
	message = codeBlock("js", stripIndents(message.substring(0, 1002)));
	console.error(error.stack);

	const embed = new EmbedBuilder()
		.setAuthor({
			name: username,
			iconURL: avatarURL,
		})
		.setDescription(message)
		.setColor(color);

	await axios.post(url, {
		username,
		avatar: avatarURL,
		content: "Mentions: " + config.ownerIds.reduce((acc, id) => acc + `<@${id}>`, ""),
		embeds: [embed],
	});
}

module.exports = notifier;
