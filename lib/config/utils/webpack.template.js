const path = require("path");

exports.webpackTemplate = {
	entry: path.resolve('src', 'index.js'),
	output: {
		path: path.resolve('public/js/'),
		chunkFilename: "static/js/[name].[chunkhash].chunk.js",
		filename: "static/js/[name].[hash].bundle.js",
		devtool: env.NODE_ENV === 'dev' ? 'cheap-module-eval-source-map' : ''
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
		contentBase: path.resolve('public'),
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
}
