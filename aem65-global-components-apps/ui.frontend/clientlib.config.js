/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const themes = require('./themes.config.js').themes;
const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
  __dirname,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'abbott-platform',
  'clientlibs'
);

let commonsFilePath = path.join(BUILD_DIR, 'libs.js');
if (fs.existsSync(commonsFilePath)) {
    fs.writeFileSync(path.join(BUILD_DIR, 'clientlib-site', 'libs.js'), fs.readFileSync(commonsFilePath));
}

const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:yui'],
  jsProcessor: ['default:none', 'min:gcc']
};

const libs = [{
  ...libsBaseConfig,
  name: 'clientlib-site',
  categories: ['abbott.site'],
  dependencies: ['abbott-platform.base'],
  assets: {
    // Copy entrypoint scripts and stylesheets into the respective ClientLib
    // directories
    js: {
      cwd: 'clientlib-site',
      files: ['**/*.js'],
      flatten: false
    },
    css: {
      cwd: 'clientlib-site',
      files: ['**/*.css'],
      flatten: false
    },

    // Copy all other files into the `resources` ClientLib directory
    resources: {
      cwd: 'clientlib-site',
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css']
    }
  }
},
{
  ...libsBaseConfig,
  name: 'clientlib-site-common',
  categories: ['abbott.site-common'],
  assets: {
    // Copy entrypoint scripts and stylesheets into the respective ClientLib
    // directories
    js: {
      cwd: 'clientlib-site-common',
      files: ['**/*.js'],
      flatten: false
    },

    // Copy all other files into the `resources` ClientLib directory
    resources: {
      cwd: 'clientlib-site-common',
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css']
    }
  }
},
{
  ...libsBaseConfig,
  name: 'clientlib-commerce',
  categories: ['abbott.commerce'],
  assets: {
    // Copy entrypoint scripts and stylesheets into the respective ClientLib
    // directories
    js: {
      cwd: 'clientlib-commerce',
      files: ['**/*.js'],
      flatten: false
    },

    // Copy all other files into the `resources` ClientLib directory
    resources: {
      cwd: 'clientlib-commerce',
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css']
    }
  }
},
{
  ...libsBaseConfig,
  name: 'clientlib-session',
  categories: ['abbott.session'],
  assets: {
    // Copy entrypoint scripts and stylesheets into the respective ClientLib
    // directories
    js: {
      cwd: 'clientlib-session',
      files: ['**/*.js'],
      flatten: false
    },

    // Copy all other files into the `resources` ClientLib directory
    resources: {
      cwd: 'clientlib-session',
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css']
    }
  }
},
{
  ...libsBaseConfig,
  name: 'clientlib-iconpicker',
  categories: ['cq.authoring.dialog'],
  dependencies: ['abbott-platform.thirdpartylibs.jquery.fonticonpicker'],
  assets: {
    // Copy entrypoint scripts and stylesheets into the respective ClientLib
    // directories
    js: {
      cwd: 'clientlib-iconpicker',
      files: ['**/*.min.js'],
      flatten: false,
      ignore: ['**/*.map']
    },
    css: {
      cwd: 'clientlib-iconpicker',
      files: ['**/*.css'],
      flatten: false,
      ignore: ['**/*.min.css', '**/*.map']
    },
    resources: {
      cwd: 'clientlib-iconpicker',
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css', '**/*.map']
    }
  }
}
];

themes.forEach(theme => {
  libs.push({
    ...libsBaseConfig,
    "themeName": theme.themeName,
    "name": theme.name,
    "categories": theme.categories,
    "jcr:title": theme.themeTitle,
    "dependencies": theme.dependencies,
    "assets": {
      // Copy entrypoint scripts and stylesheets into the respective ClientLib
      // directories
      "css": {
        "cwd": 'clientlib-' + theme.themeName,
        "files": ['**/*.css'],
        "flatten": false
      }
    }
  });
});


// Config for `aem-clientlib-generator`
module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: libs
};
