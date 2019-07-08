(function () {
	const meow = require("meow");
	const scriptStart = require("./scripts/start");

	const cli = meow(`
		Usage
		  $ foo <input>

		Options
		  --help, Display the commands available
		  --version, Show the version

		Examples
		  $ foo unicorns --rainbow
		  🌈 unicorns 🌈
	`, {
		booleanDefault: undefined,
		flags: {
			name: {
				type: "boolean",
				alias: "n"
			}
		}
	});

	console.log(cli.input, cli.flags);
})();
