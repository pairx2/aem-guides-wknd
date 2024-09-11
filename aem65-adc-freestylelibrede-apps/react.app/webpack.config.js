const path = require('path');
const exec = require('child_process').exec;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
	entry: './src',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
    		maxInitialRequests: Infinity,
    		minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					enforce: true
				}
		  	}
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator', './babel-plugin-if-then-else']
                        }
                    }
                ],
				enforce: 'post'
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: {
							paths: [path.resolve(__dirname, 'node_modules')],
						},
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, 
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						paths: [path.resolve(__dirname, 'node_modules')],
					},
				}]
			}
		]
	},resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
					exec('clientlib', (err, stdout, stderr) => {
						if (stdout) process.stdout.write(stdout);
						if (stderr) process.stderr.write(stderr);
					});
				});
			}
		},
		new MiniCssExtractPlugin({
			filename: '[name].css',
			path: path.resolve(__dirname, 'dist')
		}),
		new HtmlWebpackPlugin({
			title: 'Output Management',
		})
	]
};
module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		config.optimization.minimize = true,
    	config.optimization.minimizer = [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				exclude: 'main.js'
			})
		]
	}
	if(argv.mode === 'development') {
		config.devtool = 'inline-source-map'    
	}
	return config;
}