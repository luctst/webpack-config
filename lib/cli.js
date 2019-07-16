#!/usr/bin/env node

(async function () {
	const meow = require("meow");
	const inquirer = require("inquirer");
	const createWebpackConfig = require("./utils/createWebpackConfig");

	const cli = meow(`
		Usage
		$ foo <options>

		Options
		--help, Display the commands available
		--version, Show the version

		Examples
		  webpack-config
	`);

	console.log("\x1b[35m%s\x1b[0m", "Welcome ! We need to ask you few questions for configurate your project :) \n");
	process.stdout.write("\n");

	const result = await inquirer.prompt([
		{
			type: "input",
			name: "projectName",
			message: "What is the name of your project ?",
			validate: input => {
				if (RegExp("^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$").test(input)) return true;
			}
		},
		{
			type: "input",
			name: "description",
			message: "Enter a description, (optional)"
		},
		{
			type: "list",
			name: "projectType",
			message: "What kind of project you're working on ?",
			choices: ["SPA", "Multi-files"]
		},
		{
			type: "confirm",
			name: "useReact",
			message: "Are you gonna used ReactJs ?"
		},
		{
			type: "confirm",
			name: "useStyledComponent",
			message: "Do you wanna use styled-components ?",
			when: answer => answer.useReact ? true : false
		},
		{
			type: "confirm",
			name: "useSass",
			message: "Do you wanna use SASS ?",
			when: answer => !answer.useStyledComponent ? true : false
		}
	]);

	console.log("\n");
	console.log("\x1b[35m%s\x1b[0m", "Creation of your configuration...\n");

	createWebpackConfig(result);
	// copyDir(`${__dirname}/templates`, process.env.PWD, {
	// 	utimes: true,
	// 	mode: true,
	// 	cover: true
	// });

	process.on("SIGINT", () => {
		if (typeof result !== "object") {
			console.log("Something wrong.. You abort the process too earlier");
		}
	});
})();
