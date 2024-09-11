/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');

const SOURCE_ROOT = __dirname + '/src/main/webpack';
const IS_PROD = process.env.npm_lifecycle_event === 'webpack-prod';

const themes = require('./themes.config.js').themes;


const entries = {
  'sb-components': SOURCE_ROOT + '/site/sb-components.ts',
  'sb-components-rtl': SOURCE_ROOT + '/site/sb-components-rtl.ts',
  'site': SOURCE_ROOT + '/site/main.ts',
  'commerce': SOURCE_ROOT + "/components",
  'session': SOURCE_ROOT + "/components/App/session/SessionApp.jsx",
  'storybook': SOURCE_ROOT + "/storybook"
};
if (IS_PROD) {
  entries['iconpicker'] = SOURCE_ROOT + '/iconpicker/iconpicker.ts';
}

if (themes) {
  themes.forEach(theme => {
    entries[theme.themeName] = SOURCE_ROOT + '/' + theme.themeName + '/theme.ts';
  });
}
const config = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx'],
    plugins: [new TSConfigPathsPlugin({
      configFile: './tsconfig.json'
    })]
  },
  entry: entries,
  optimization: {
    splitChunks: {
        cacheGroups: {
          libs: {
            name: 'libs',
            chunks: (chunk) => {
              return chunk.name !== 'styleguide';
            },
            minChunks: 2,
          },
          commons: {
            name: 'site-commons',
            chunks: (chunk) => {
              return chunk.name !== 'styleguide';
            },
            minChunks: 2,
          },
        },
    },
  },
  output: {
    filename: (chunkData) => {
      return `clientlib-${chunkData.chunk.name}/[name].js`;
    },
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'webpack-import-glob-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: [/\.js$/, /\.jsx$/],
        include: path.resolve(__dirname, 'src/main/webpack/components/'),
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          "cache-loader",
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
            loader: 'sass-loader',
            options: {
              importer: globImporter()
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              fallback: 'file-loader',
              outputPath: './public/images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: [/\.ts$/,/\.js$/, /\.jsx$/],
        include: path.resolve(__dirname, 'src/main/webpack/storybook/'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'clientlib-[name]/[name].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, SOURCE_ROOT + '/static/**/**/*.html'), to: './'
      },
      {
        from: path.resolve(__dirname, SOURCE_ROOT + '/storybook/app/resources/images'), to: './public/images'
      },
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Promise: 'es6-promise-promise'
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
    warnings: false
  }
};

if (IS_PROD) {
  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site'
  }]));
  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './public/resources'
  }]));
  //Fonticon picker plug-in is needed only in authoring.
  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, SOURCE_ROOT + '/resources/icons'), to: './clientlib-iconpicker/icons'
  }]));
} else {
  config.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './public/resources'
  }]));
}
module.exports = config;
