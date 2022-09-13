const { Command } = require("../../structures/");
const { EmbedBuilder } = require("discord.js");
const weather = require("weather-js");
const { promisify } = require("util");

class Climate extends Command {
  constructor() {
    super();
    this.description = "Veja o clima da sua cidade";
    this.aliases.push("clima");
  }

  async code({ message, args }) {
    const city = args.join(" ").toLowerCase();
    if (!city) return message.reply("Você não disse o nome da cidade!");

    const fetchData = promisify(weather.find);
    
    const result = await fetchData({ search: city, degreeType: "C" });
    if (!result[0]) return message.reply("Desculpa, mas não consegui achar a cidade");

    const data = result[0];

    const embed = new EmbedBuilder()
      .setAuthor({ name: data.location.name, iconURL: data.current.imageUrl })
      .setThumbnail(data.current.imageUrl)
      .addField("Temperatura: ", `${data.current.temperature}°C`)
      .addField("Sensação Térmica: ", `${data.current.feelslike}°C`)
      .addField("Umidade: ", `${data.current.humidity}%`)
      .addField("Velocidade do Vento: ", data.current.windspeed)
      .setColor(this.config.colorEmbed);

    await message.reply({ embeds: [embed] });
  }
}

module.exports = Climate;
