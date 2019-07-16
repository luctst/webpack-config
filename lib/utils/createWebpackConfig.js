const packageJson = require("../templates/package.json");
const webpackConfigJson = require("../templates/webpack.config.json");
const copyDir = require("copy-dir");
const path = require("path");
const fs = require("fs");
const {sassConfig, jsConfig, cssModuleConfig} = require("./moduleWebpackConfig");

/**
 * Create and configure your application structure.
 *
 * First, configure your `package.json` file.
 *
 * Then `webpack.config.js`.
 *
 * Finally create your app structure.
 *
 * @param {String} from The path to copy the structure.
 * @param {String} to The path to create the configuration.
 * @param {Object} answer An object who contains the user answer, Need this to configurate.
 */
module.exports = (from, to, answer) => {
	const goodPackageJson = { ...packageJson };
	const goodWebpackJson = { ...webpackConfigJson };

	// Define the name and the description with the `answer` object.
	goodPackageJson.name = answer.projectName;
	goodPackageJson.description = answer.description;

	if (answer.useReact) { // If user choose React
		const addDependencies = ["react", "@babel/preset-react", "react-dom", "react-router-dom"];
		goodWebpackJson.module.rules.push(jsConfig(true));

		if (answer.useStyledComponent) { // Does he wants Styled-components ?
			addDependencies.push("styled-components");
		} else if (answer.useSass) { // Or using Sass.
			goodWebpackJson.module.rules.push({...sassConfig});
			addDependencies.push("node-sass", "sass-loader");
		} else { // If not use just css modules.
			goodWebpackJson.module.rules.push({...cssModuleConfig});
			addDependencies.push("css-loader", "style-loader");
		}

		// Finally add all new devDependencies in `goodPackageJson`.
		addDependencies.forEach(el => {
			goodPackageJson.devDependencies[el] = "";
		})
	} else if (answer.useSass) { // If don't want React but Sass.
		const addDevDependencies = ['@babel/preset-env', "node-sass", "sass-loader"];
		goodWebpackJson.module.rules.push({...sassConfig});
		goodWebpackJson.module.rules.push(jsConfig(false));

		addDevDependencies.forEach(el => {
			goodPackageJson.devDependencies[el] = "";
		});
	} else { // Else don't want React or sass, so use just css modules.
		const addDevDependencies = ["@babel/preset-env", "css-loader", "style-loader"];
		goodWebpackJson.module.rules.push({...cssModuleConfig});

		addDevDependencies.forEach(el => {
			goodPackageJson.devDependencies[el] = "";
		})
	}

	const webpackConfigStream = fs.createWriteStream("webpack.config.js");
	webpackConfigStream.write("Test");
	console.log(webpackConfigStream);

	copyDir(from, to, {
		utimes: true,
		mode: true,
		cover: true,
		filter: (stat, filepath, filename) => {
			if (stat === "file" && path.extname(filepath) === ".json") {
				return false;
			} else {
				return true;
			}
		}
	}, (err) => {
		if (err) throw err;

		fs.readFile(`${from}README.md`, (err, data) => {
			if (err) throw err;

			let newReadme = data.toString();
			newReadme = newReadme.replace("{{name}}", answer.projectName);
			newReadme = newReadme.replace("{{description}}", answer.description);

			fs.writeFileSync(`${to}/README.md`, newReadme);

			console.log("Your project was correctly configurated !! \n");
			console.log("We now need to install your dependencies, it should take a few seconds.");
		});
	});
}
