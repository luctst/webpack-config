#!/usr/bin/env node
(function() {
	const chalk = require("chalk");
	const inquirer = require("inquirer");
	const figlet = require("figlet");
	const program = require("commander");
	const fs = require("fs");
	const package = JSON.parse(fs.readFileSync("../package.json").toString());

	console.log(chalk.blue(figlet.textSync("Webpack-config", {horizontalLayout: "full"})));

	program
		.version(package.version)
		.command("init", "Init the webpack config")
		.description("Welcome, you'l need to answer a few questions to create your webpack.config.js file")
		.action(() => {
			console.log("Launched init command");
		})
		.parse(process.argv);

	program.on("command:*", () => {
		console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
		process.exit(1);
	});
}());
