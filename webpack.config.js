var path = require('path');

module.exports = {
	entry: {
		main: path.resolve(__dirname, './src/', "index.js")
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'main.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: `./`,
		publicPath: `/`,
		watchContentBase: true,
		open: true,
		port: 3001
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				loaders: "babel-loader",
			},
		],
	},
}
