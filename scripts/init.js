const readline = require('readline');
const fs = require("fs");
const package = fs.readFileSync("./package.json", "utf-8");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "-> "
});
const initProcess = {
	steps: 0,
	questions: [
		"What is the name of your project ? Don't add space in the name. \n",
		"Enter a description. \n",
		"Enter the version of NodeJs that your project must use"
	]
}
const replaceContent = fieldToReplace => {
	const newPackage = package.replace(`"${fieldToReplace}": ""`, `"${fieldToReplace}": "${input}"`);
	fs.writeFileSync("./package.json", newPackage);
	initProcess.steps++;
}

console.log("\x1b[33m%s\x1b[0m", "Before starting we need some informations to configurate your project. \n");
console.log("Press enter to start");

rl.on("line", input => {
	if (input === "" && initProcess.steps !== 0) {
		console.log("\x1b[35m%s\x1b[0m", "You should enter data !");
		rl.prompt();
	} else {
		console.log(`${initProcess.steps + 1} - ${initProcess.questions[initProcess.steps]}`);
		rl.prompt();

		switch (initProcess.steps) {
			case 0:
				initProcess.steps++;
			case 1:
				replaceContent("name");
				break;
			case 2:
				replaceContent("description");
				break;
			default:
				break;
		}
	}
}).on("close", () => {

});
