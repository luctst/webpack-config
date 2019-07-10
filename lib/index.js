(function () {
	const meow = require("meow");
	const scriptStart = require("./scripts/start");
	const cli = meow(`
		Usage
		  $ foo <input> <options>

		Input
		 start, Start the webpack-config process

		Options
		  --help, Display the commands available
		  --version, Show the version

		Examples
	`);

	if (cli.input.length !== 0) {
		process.stdin.write("Test process");
		const resultScriptStart = scriptStart(cli.input);
	} else {
		console.log(`
		Error

		You must enter an input, if you need help try the --help option`);
		process.exit(2);
	}
})();
