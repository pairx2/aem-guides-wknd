'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


const SOURCE_ROOT = __dirname + '/src/main/webpack';

const themes = require('./themes.config.js').themes;

const entries = {
    'customerportal-react': SOURCE_ROOT + "/customerportal-react/main.ts",
    'customerportal': SOURCE_ROOT + "/customerportal/main.ts",
    'customerportal-preload': SOURCE_ROOT + "/customerportal-preload/main.ts"
};

if (themes) {
    themes.forEach(theme => {
        entries[theme.themeName] = SOURCE_ROOT + '/' + theme.themeName + '/theme.ts';
    });
}

const resolve = {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })]
};

module.exports = {
    resolve: resolve,
    entry: entries,
    output: {
        filename: (chunkData) => {
            return `clientlib-${chunkData.chunk.name}/[name].js`;
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/,/packages/],
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: [/\.ts$/,/\.js$/, /\.jsx$/, /\.tsx$/],
                include: [/packages/],
                exclude: [/aem65-platform-apps/],
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve,
                            exclude: ['/dist/']
                        }
                    }
                ]
            },
            {
                test: [/\.ts$/,/\.js$/, /\.jsx$/],
                exclude: [/node_modules/,/packages/,/aem65-platform-apps/],
                loader: 'babel-loader'
            },
            {
                test: [/\.ts$/,/\.js$/, /\.jsx$/],
                exclude: [/node_modules/],
                include: [/aem65-platform-apps/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'ts', 'tsx', 'jsx'],
            exclude: ['./src/packages/add-platform/bin/','./src/packages/abbott-custom-search/bin/']
        }),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, SOURCE_ROOT + '/customerportal/resources'), to: './customerportal/' }
            ]
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};


