/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
  'add'
);
let timestamp = Date.now().toString();

const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:none'],
  jsProcessor: ['default:none', 'min:none']
};

// Config for `aem-clientlib-generator`

const libs = [
  {
    name: "customerportal/clientlibs/clientlib-customerportal-react",
    allowProxy: true,
    categories: ["abbott-customerportal-react"],
    embed: ["abbott-customerportal-react-app.responsivegrid"],
    jsProcessor: ["min:gcc"],
    serializationFormat: "xml",
    assets: {
      // Copy entrypoint scripts and stylesheets into the respective ClientLib
      // directories
      js: {
        cwd: 'clientlib-customerportal-react',
        files: ['**/*.js'],
        flatten: false
      },
      css: {
        cwd: 'clientlib-customerportal-react',
        files: ['**/*.css'],
        flatten: false
      },
    }
  },
  {
    ...libsBaseConfig,
    name: 'customerportal/clientlibs/clientlib-customerportal',
    categories: ['abbott.customerportal'],
    embed: ['abbott-platform.thirdpartylibs.jquery-3.5.1','abbott-platform.thirdpartylibs.popper-2.4.4','abbott-platform.thirdpartylibs.bootstrap-4.5.2','abbott-platform.components.all','abbott.session','abbott-customerportal-react'],
    assets: {
      // Copy entrypoint scripts and stylesheets into the respective ClientLib
      // directories
      js: {
        cwd: 'clientlib-customerportal',
        files: ['**/*.js'],
        flatten: false
      },
      css: {
        cwd: 'clientlib-customerportal',
        files: ['**/*.css'],
        flatten: false
      },

      // Copy all other files into the `resources` ClientLib directory
      resources: {
        cwd: 'customerportal',
        files: ['**/*.*'],
        flatten: false,
        ignore: ['**/*.js', '**/*.css']
      }
    }
  },
  {
    ...libsBaseConfig,
    name: 'customerportal/clientlibs/clientlib-customerportal-preload',
    categories: ['abbott.customerportal-preload'],
    assets: {
      // Copy entrypoint scripts and stylesheets into the respective ClientLib
      // directories
      js: {
        cwd: 'clientlib-customerportal-preload',
        files: ['**/*.js'],
        flatten: false
      },
      css: {
        cwd: 'clientlib-customerportal-preload',
        files: ['**/*.css'],
        flatten: false
      }
    }
  },
];


themes.forEach(theme => {
  libs.push({
    ...libsBaseConfig,
    "themeName": theme.themeName,
    "name": theme.name,
    "categories": theme.categories,
    "jcr:title": theme['jcr:title'],
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
