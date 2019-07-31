/**
 * Create the package.json file
 * @param {Object} data Object who contains user answer to configurate the package.json file
 * @returns {JSON} Return an JSON object.
 */
module.exports = data => {
	const packageTemplate = {
		name: "",
		version: "1.0.0",
		description: "",
		scripts: {
			start: "webpack-dev-server --mode=development",
			build: "webpack --mode=production"
		},
		devDependencies: {
			"@babel/core": "",
			"babel-loader": "",
			"file-loader": "",
			"friendly-errors-webpack-plugin": "",
			"html-webpack-plugin": "",
			"script-ext-html-webpack-plugin": "",
			"webpack": "",
			"webpack-dev-server": ""
		}
	}
	const packageJsonToReturn = {...packageTemplate};
	const devDependenciesToAdd = [];

	packageJsonToReturn.name = data.projectName;
	packageJsonToReturn.description = data.description;

	if (data.useReact) { // If user choose React
		devDependenciesToAdd.push("react", "@babel/preset-react", "react-dom", "react-router-dom");

		if (data.useStyledComponent) { // Does he wants Styled-components ?
			devDependenciesToAdd.push("styled-components");
		} else if (data.useSass) { // Or using Sass.
			devDependenciesToAdd.push("node-sass", "sass-loader");
		} else { // If not use just css modules.
			devDependenciesToAdd.push("css-loader", "style-loader");
		}

		devDependenciesToAdd.map(el => packageJsonToReturn.devDependencies[el] = "");
	}
	else if (data.useSass) { // If don't want React but Sass.
		devDependenciesToAdd.push('@babel/preset-env', "node-sass", "sass-loader");

		devDependenciesToAdd.map(el => packageJsonToReturn.devDependencies[el] = "");
	}
	else { // Else don't want React or sass, so use just css modules.
		devDependenciesToAdd.push("@babel/preset-env", "css-loader", "style-loader");

		devDependenciesToAdd.map(el => packageJsonToReturn.devDependencies[el] = "");
	}

	return JSON.stringify(packageJsonToReturn, null, 2);
}
