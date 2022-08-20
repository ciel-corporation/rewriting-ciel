const colors = require("console-colors.js").default;

module.exports = {
	sucess: message => console.log(colors.green(message)),
	danger: message => console.log(colors.red(message)),
	warn: message => console.log(colors.yellow(message)),
};
