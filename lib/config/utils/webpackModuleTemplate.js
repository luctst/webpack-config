/**
 * Define the webpack module config for `.js` files.
 * @param {Boolean} needReact If true use babel/preset-react else use babel/preset-env.
 */
exports.jsConfig = needReact => ({
	test: /.js$/,
	exclude: /(node_modules|bower_components)/,
	use: {
		loader: "babel-loader",
		options: {
			presets: needReact ? ["@babel/preset-react"] : ["@babel/preset-env"],
			plugins: [],
			cacheDirectory: true
		}
	}
});

exports.sassConfig = {
	test: /\.scss$/,
	use: [
		"style-loader",
		"css-loader",
		{
			loader: "sass-loader",
			options: {
				sourceMap: true
			}
		}]
};

exports.cssModuleConfig = {
	test: /.css$/i,
	use: ["style-loader", "css-loader"]
}
