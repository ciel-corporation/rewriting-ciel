const { connect } = require("mongoose");
const { database_token } = require("../config.json");
const { logger } = require("../utils");

async function start() {
  if (!database_token) throw new Error("the database_token token was not passed correctly!");
  await connect(database_token);
  logger.sucess("[DATABASE] - Connected to the database");
}

module.exports = {
  start,
  User: require("./Schemas/User.js"),
  Guild: require("./Schemas/Guild.js"),
};
