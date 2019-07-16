const packageJson = {
	name: "",
	version: "1.0.0",
	description: "",
	scripts: {
		start: "webpack-dev-server --mode=development",
		build: "webpack --mode=production"
	},
	devDependencies: {
		"@babel/core": "",
		"@babel/preset-env": "",
		"babel-loader": "",
		"css-loader": "",
		"file-loader": "",
		"friendly-errors-webpack-plugin": "",
		"html-webpack-plugin": "",
		"script-ext-html-webpack-plugin": "",
		"style-loader": "",
		"webpack": "",
		"webpack-cli": "",
		"webpack-dev-server": ""
	}
};

/**
 * Create and configure your application structure
 * @param {Object} config An object who contains the user answer, Need this to configurate.
 */
module.exports = config => {
	const goodPackageJson = {...packageJson};

	goodPackageJson.name = config.projectName;
	goodPackageJson.description = config.description;

	if (config.useReact) {
		const addDependencies = ["react", "@babel/preset-react", "react-dom", "react-router-dom"];

		if (config.useStyledComponent) {
			addDependencies.push("styled-components");
		} else if (config.useSass) {
			addDependencies.push();
		}

		addDependencies.forEach(el => {
			goodPackageJson.devDependencies[el] = "";
		})
	} else {
		if (config.useSass) goodDevDependencies.push();
	}

	console.log(goodPackageJson);
}

// module.exports = env => {
// 	return {
// 		mode: env.NODE_ENV === "dev" ? "development" : "production",
// 		entry: path.resolve("src", "index.js"),
// 		output: {
// 			path: path.resolve("public/js/"),
// 			chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
// 			filename: "static/js/[name].[hash].bundle.js"
// 		},
// 		devtool: env.NODE_ENV === "dev" ? 'cheap-module-eval-source-map' : "",
// 		optimization: {
// 			namedModules: true,
// 			mangleWasmImports: true,
// 			removeAvailableModules: true,
// 			runtimeChunk: true,
// 			splitChunks: {
// 				chunks: "all",
// 				cacheGroups: {
// 					commons: {
// 						test: /[\\/]node_modules[\\/]/,
// 						name: 'vendor',
// 						chunks: 'all'
// 					},
// 					main: {
// 						chunks: 'all',
// 						minChunks: 2,
// 						reuseExistingChunk: true,
// 						enforce: true
// 					}
// 				}
// 			}
// 		},
// 		devServer: {
// 			contentBase: path.resolve("public"),
// 			hot: true,
// 			https: true,
// 			open: true,
// 			noInfo: true,
// 			overlay: true,
// 			quiet: true
// 		},
// 		module: {
// 			rules: [
// 				{
// 					test: /.js$/,
// 					exclude: /(node_modules|bower_components)/,
// 					use: {
// 						loader: "babel-loader",
// 						options: {
// 							presets: ["@babel/preset-env"],
// 							plugins: [],
// 							cacheDirectory: true
// 						}
// 					}
// 				},
// 				{
// 					test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
// 					use: [{
// 						loader: "file-loader",
// 						options: {
// 							name: "[hash].[ext]",
// 							outputPath: "static/img/"
// 						}
// 					}]
// 				},
// 				{
// 					test: /.css$/i,
// 					use: ["style-loader" ,"css-loader"],
// 				}
// 			]
// 		},
// 		plugins: [
// 			new htmlWebpackPlugin({
// 				template: './public/index.html',
// 				minify: {
// 					removeComments: true,
// 					collapseWhitespace: true,
// 					removeRedundantAttributes: true,
// 					useShortDoctype: true,
// 					removeEmptyAttributes: true,
// 					removeStyleLinkTypeAttributes: true,
// 					keepClosingSlash: true,
// 					minifyJS: true,
// 					minifyCSS: true,
// 					minifyURLs: true
// 				}
// 			}),
// 			new scriptExtHtmlWebpackPlugin({
// 				defaultAttribute: "async"
// 			}),
// 			new friendlyErrorsMessagePlugin({
// 				compilationSuccessInfo: {
// 					messages: ['You application is running here http://localhost:8080'],
// 					notes: ['Some additional notes to be displayed upon successful compilation']
// 				}
// 			})
// 		]
// 	}
// };

