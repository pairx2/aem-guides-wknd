
const path = require('path');

/**
 * Global Entry Point
 **/

// Abbott Path
const abbottBase = './src/main/content/jcr_root/apps/abbott/clientlibs/clientlib-abbottstore';
const abbottReact = `${abbottBase}/react`;

// Similac Path
const similacBase = './src/main/content/jcr_root/apps/abbott/clientlibs/clientlib-similac';
const similacReact = `${similacBase}/react`;

//
const isWatching = process.env.NODE_ENV === 'development';

const similacReactConfig = {
    name: 'similacReactComponents',
    entry: `${similacReact}`,
    output: {
        path: path.resolve(__dirname, `${similacBase}/js`),
        filename: 'react.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: isWatching,
    watchOptions: {
        ignored: /node_modules/
    }
}

const abbottReactConfig = {
    name: 'abbottReactComponents',
    entry: `${abbottReact}`,
    output: {
        path: path.resolve(__dirname, `${abbottBase}/js`),
        filename: 'react.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: isWatching,
    watchOptions: {
        ignored: /node_modules/
    }
}

module.exports = [abbottReactConfig, similacReactConfig];
