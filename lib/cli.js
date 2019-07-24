#!/usr/bin/env node
const meow = require("meow");
const inquirer = require("inquirer");
const packageJsonConfig = require("./config/packageJson.config");
// const webpackConfig = require("./config/webpack.config");
const copyDir = require("copy-dir");
const fs = require("fs");

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

inquirer.prompt([
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
]).then(answers => {
	const copyDirOptions = {
		utimes: true,
		mode: true,
		cover: true,
	};

	console.log("\n");
	console.log("\x1b[35m%s\x1b[0m", "Creation of your configuration...\n");

	copyDir(`${__dirname}/templates/`, process.env.PWD, copyDirOptions, err => {
		if (err) throw err;

		const packageJson = packageJsonConfig(answers);
		let readme = fs.readFileSync(`${process.env.PWD}/README.md`, "utf-8");

		readme = readme.replace("{{name}}", answers.projectName);
		readme = readme.replace("{{description}}", answers.description);

		fs.writeFileSync(`${process.env.PWD}/README.md`, readme);
		fs.createWriteStream("package-lock.json").write(packageJson);

		console.log("\x1b[32m", "App structure Created");
	});
});

process.on("unhandledRejection", err => {
	console.error("Something wrong happen.. Please try again");
	throw err;
});
