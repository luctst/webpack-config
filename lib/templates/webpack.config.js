const path = require("path");

module.exports = {
	mode: process.env.NODE_ENV === "dev" ? "development" : "production",
	entry: path.resolve("src", "index.js"),
	output: {
		path: path.resolve("public/js/"),
		chunkFilename: 'js/[name].[chunkhash].chunk.js',
		filename: "js/[name].[hash].bundle.js"
	},
	optimization: {
		namedModules: true,
		mangleWasmImports: true,
		removeAvailableModules: true,
		runtimeChunk: 'single',
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				},
				main: {
					chunks: 'all',
					minChunks: 2,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	devServer: {
		contentBase: path.resolve("public"),
		hot: true,
		https: true,
		open: true,
		noInfo: true,
		overlay: true
	}
};

