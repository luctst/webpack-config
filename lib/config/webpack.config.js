const htmlWebpackPlugin = require("html-webpack-plugin");
const scriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const friendlyErrorsMessagePlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");
const {jsConfig, sassConfig, cssModuleConfig} = require("./utils/webpackModuleTemplate");

/**
 * Create the webpack.config.js file.
 * @param {Object} data An Object with user answer to configurate webpack.config.js file.
 */
module.exports = data => {
	const addModules = [];
	const webpackTemplate = {
		entry: `/src/index.js`,
		output: {
			path: `/build/`,
			chunkFilename: "static/js/[name].[chunkhash].chunk.js",
			filename: "static/js/[name].[hash].bundle.js"
		},
		optimization: {
			namedModules: true,
			mangleWasmImports: true,
			removeAvailableModules: true,
			runtimeChunk: true,
			splitChunks: {
				chunks: "all",
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "all"
					},
					main: {
						chunks: "all",
						minChunks: 2,
						reuseExistingChunk: true,
						enforce: true
					}
				}
			}
		},
		devServer: {
			contentBase: "./public/",
			hot: true,
			https: true,
			open: true,
			noInfo: true,
			overlay: true,
			quiet: true
		},
		module: {
			rules: [
				{
					test: /.(jpe?g|png|webp|gif|svg|ico)$/i,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[hash].[ext]",
								outputPath: "static/img/"
							}
						}
					]
				}
			]
		},
		plugins: [
			new htmlWebpackPlugin({
				template: './public/index.html',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				}
			}),
			new scriptExtHtmlWebpackPlugin({
				defaultAttribute: "async"
			}),
			new friendlyErrorsMessagePlugin({
				compilationSuccessInfo: {
					messages: ["You application is running here http: //localhost:8080]"],
					notes: ["Some additional notes to be displayed upon successful compilation"]
				}
			})
		]
	};

	if (data.useSass) {
		addModules.push(jsConfig(data.useReact), sassConfig);
	} else if (data.useStyledComponent) {
		addModules.push(jsConfig(data.useReact));
	} else {
		addModules.push(jsConfig(data.useReact), cssModuleConfig);
	}

	addModules.map(el => webpackTemplate.module.rules.push(el));
	return webpack(webpackTemplate);
}
