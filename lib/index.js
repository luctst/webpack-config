(function() {
	const chalk = require("chalk");
	const inquirer = require("inquirer");
	const figlet = require("figlet");
	const yargs = require("yargs");

	console.log(chalk.blue(figlet.textSync("Webpack-config", {horizontalLayout: "full"})));
	console.log(yargs.argv);
}());
