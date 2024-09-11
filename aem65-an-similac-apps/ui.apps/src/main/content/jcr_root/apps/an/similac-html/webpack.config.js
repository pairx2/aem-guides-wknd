const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');

const pathToYML = 'data.yml';
const pathToReactPages = './src/react/pages/*.js';
const pathToHbsPages = './src/pages/*.hbs';
const pathToVenderScss = './src/sass/**/vendor.scss';
const pathToVenderBootStrapScss = './src/sass/**/vendor_bootstrap.scss';
const pathToGlobalScss = './src/sass/**/global.scss';
const pathToComponentsScss = './src/sass/components/*.scss';
const pathToStyleScss = './src/sass/style.scss';


module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';

    const reactPagesList = glob.sync(pathToReactPages);
    const entryReactObject = reactPagesList.reduce(function (obj, el) {
        obj[path.parse(el).name] = el;
        return obj
    }, {});
    const vendorCSS = glob.sync(pathToVenderScss)
    const vendorbootstrapCSS = glob.sync(pathToVenderBootStrapScss)
    const globalCss = glob.sync(pathToGlobalScss);
    const styleCss = pathToStyleScss;

    const entryObjectGroup = Object.assign({}, entryReactObject, {
        'similac-base/css/vendor': vendorCSS
    }, {
        'similac-base/css/vendor-bootstrap': vendorbootstrapCSS
    },
        {
            'similac-common/css/global': globalCss
        }, {
        'css/style': styleCss
    });

    const entryObject = glob.sync(pathToComponentsScss).reduce(function (obj, el) {
        obj['similac-component/css/' + path.parse(el).name] = el;
        return obj
    }, entryObjectGroup)


    const reactHtmlPageNames = reactPagesList.map(function (el) {
        return path.parse(el).name;
    });

    const templateParameters = (compilation, assets, assetTags, options) => {
        const jsonData = yaml.load(fs.readFileSync(pathToYML));
        return Object.assign({}, {
                compilation: compilation,
                webpackConfig: compilation.options,
                htmlWebpackPlugin: {
                    tags: assetTags,
                    files: assets,
                    options: options
                }
        }, jsonData)
    }

    const reactHtmlPages = reactHtmlPageNames.map(function (name) {
        return (new HtmlWebPackPlugin({
                filename: name + ".html",
                chunks: ['vendor', name],
                minify: false,
                template: './src/pages/' + name + '.hbs',
                templateParameters
        }))
    });

    const hbsPagesList = glob.sync(pathToHbsPages);
    const hbsHtmlPageNames = hbsPagesList.map(function (el) {
        return path.parse(el).name;
    }).filter(function (name) {
        return !reactHtmlPageNames.includes(name);
    });
    const hbsHtmlPages = hbsHtmlPageNames.map(function (name) {
        return (new HtmlWebPackPlugin({
                filename: name + ".html",
                chunks: [],
                template: './src/pages/' + name + '.hbs',
                templateParameters
        }))
    });

    const plugins = [

        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtraWatchWebpackPlugin({
            files: ['data.yml']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            context: "src/fonts/",
            from: '*',
            to: 'resources/fonts/'
        }, {
            context: "src/img/",
            from: '**/*',
            to: 'resources/img/'
        }, {
            context: "src/js/",
            from: '*.js',
            to: 'similac-common/js'
        }, {
            context: "src/js/lib/",
            from: '*.js',
            to: 'similac-base/js/'
        }, {
            context: "./src/js/component/",
            from: '**',
            to: 'similac-component/js'
        }, {
            context: "./src/json/",
            from: '**',
            to: 'mock/json'
        },]),
        new SVGSpritemapPlugin('src/icons/*.svg', {

            output: {
                filename: "resources/img/svg-icons.svg"
            },
            sprite: {
                prefix: 'icon-',
                generate: {
                    title: false
                }
            }
        }),
    ]
        .concat(hbsHtmlPages)
        .concat(reactHtmlPages)
        .concat([{
            apply(compiler) {
                compiler.hooks.shouldEmit.tap('Remove unwanted js files in css', (compilation) => {
                    for (let key in compilation.assets) {
                        if (/(similac-component|similac-common|similac-base)[\/\\]css[\/\\].+\.js/.test(key)) {
                            delete compilation.assets[key];
                        }
                    }
                    delete compilation.assets['similac-component/js/styles/styles.react.js'];
                    delete compilation.assets['similac-component/js/css/style/css/style.react.js'];
                    return true;
                })
            }
        }]);

    return {
        entry: entryObject,
        stats: {
            children: false,
        },
        module: {
            rules: [{
                test: /src[\/\\]react[\/\\].+\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: path.resolve(__dirname, 'src/helpers'),
                    partialDirs: path.resolve(__dirname, 'src/partials'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                }
            },
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                generator : {
                    filename: 'clientlib-similac-commons/resources/fonts/[name][ext][query]'
                }
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            
            ]
        },
        resolve: {
            extensions: ['.*', '.js', '.jsx', '.css', '.scss']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'similac-component/js/[name]/[name].react.js',
            assetModuleFilename: "assets/[name][ext]"
        },
        plugins,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
                new CssMinimizerPlugin()],

            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /node_modules/,
                        name: 'vendor-common',
                        chunks: 'all',
                        minChunks: 2,
                        filename: 'similac-base/js/[name].react.js'
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                }
            }
        },
        devServer: {
            contentBase: path.join(__dirname, "dist/"),
            open: true
        },
        externals: {
            jquery: 'jQuery'
        }
    }
};