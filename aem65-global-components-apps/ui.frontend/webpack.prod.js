/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const SOURCE_ROOT = __dirname + '/src/main/webpack';
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const themes = require('./themes.config').themes;

//creating component entry points
const components = glob.sync('./src/main/webpack/static/**/**/*.comp.ts', {});
const compEntries = {};
const compToSrcMap = {};
for (const component of components) {
  const fileName = path.basename(component);
  const compName = fileName.replace('.comp.ts', '');
  compEntries[compName] = component;
  compToSrcMap[compName] = path.dirname(component);
}
fs.writeFileSync(path.join(__dirname, 'comps-map.json'), JSON.stringify(compToSrcMap));

common.entry = Object.assign({}, common.entry, compEntries);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html'),
          chunks: ['storybook','site','commons']
      })
  ],
  output: {
    filename: (chunkData) => {
      const filePath = common.entry[chunkData.chunk.name];
      let output = `clientlib-${chunkData.chunk.name}/[name].js`;
      if (filePath.indexOf('.comp.ts') > -1) {
        output = `clientlib-components/${chunkData.chunk.name}/[name].js`;
      }
      return output;

    },
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'libs',
          filename: 'clientlib-site/libs.js',
          chunks: (chunk) => {
            return chunk.name !== 'styleguide';
          },
          minChunks: 2,
        },
        commons: {
          test: /[\\/](pagination|common|form-container|search-bar)[\\/]/,
          name: 'site-commons',
          filename: 'clientlib-site-common/site-commons.js',
          minChunks: 2,
        }
      }
    }
  },
  devtool: 'none',
  performance: {
    hints: false
  }
});
