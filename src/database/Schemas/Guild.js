const { Schema, model } = require("mongoose");
const config = require("../../config.json");

const guildSchema = new Schema({
  _id: { type: String, require: true },
  prefix: { type: String, default: config.prefix },
  version: { type: String, default: "1.0" },
});

const Guild = model("guilds", guildSchema);
module.exports = Guild;
