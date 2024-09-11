const merge             = require('webpack-merge');
const common            = require('./webpack.common.js');

const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SOURCE_ROOT = __dirname + '/src/main/webpack';
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const themes = require('./themes.config').themes;


const smp = new SpeedMeasurePlugin();


module.exports = smp.wrap(merge(common, {
    mode: 'development',
    devtool: 'cheap-source-map',
    performance: { hints: 'warning' },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html'),
            chunks: ['storybook','site','commons']
        })
    ],
    devServer: {
        historyApiFallback: true,
        host: "localhost",
        inline: true,
        clientLogLevel: 'silent',
        hot: true,
        disableHostCheck: true,
        proxy: [
          {
            context: ['/content', '/etc.clientlibs'],
            target: 'http://localhost:4502',
          },
          {
            context: ['/api','/imported-css'],
            target: 'http://localhost:4545'
          }
        ]

     }
}));
