/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const webpack = require('webpack');
const prettier = require("prettier");
const glob = require('glob');
const path = require('path');
const autoprefixer = require('autoprefixer');
var rimraf = require("rimraf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const contentXmlContent = fs.readFileSync(path.join(__dirname, 'scripts-lib', 'content-xml.txt'),
   { encoding: 'utf8'}
);
const contentXmlRtlContent = fs.readFileSync(path.join(__dirname, 'scripts-lib', 'content-xml-rtl.txt'),{
  encoding: 'utf-8'}
);

const metaConfigFile = "meta.json";

const themes = require('./themes.config').themes;
const themesInfo = [];

themes.forEach((theme)=>{
  themesInfo.push({
    name: theme.themeName,
    path: path.join('./dist/',`clientlib-${theme.themeName}`,`${theme.themeName}.css`)
  });
});

//const compsToCompile = ['atoms' ,'molecules', 'organisms'];
const compsToCompile = ['atoms' ,'molecules', 'organisms'];

const outPutDir = path.join(__dirname, 'comps-dist');


var configs = {
    compsFolderPath: '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/components/content',
    rootClientLibsPath: '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs',
    limitPerCategory: 4,
    skipLimit: true,
    exceptions: [{
        nameToCheck: 'organisms',
        actualNameExists: 'organism',
        exceptionType: 'CLIENTLIBSCOPY'
    }],
    skipCompSpecificCopy: true
};
var compClientlibsFolderPath = path.join(configs.rootClientLibsPath, 'clientlib-components');
var compRtlClientlibsFolderPath = path.join(configs.rootClientLibsPath, 'clientlib-components-rtl');
var reports = {
    compiledFiles: [],
    copiedFiles: [],
    failures: []
};
const checkAndCreateFolder = (folderPath) => {
    const isFolderExists = fs.existsSync(folderPath);
    if (!isFolderExists) {
        fs.mkdirSync(folderPath);
    }
};
const compileFileAsync = async(config) => {
    return new Promise(resolve => {
        // console.log(`Webpack Started `, config.entry);
        webpack(config, (err, stats) => {
            if (err) {
                console.error("Error: ", err);
            }
            if (stats.compilation.errors && stats.compilation.errors.length > 0) {
                console.error(stats.compilation.errors[0]);
            }
            // console.log(`Webpack Completed`, config.entry);
            resolve();
        });
    });
};

// theme change will not have any impact on the component CSS generation
// feel free to use any valid theme name
var themeName = 'theme1';
if (process.argv && process.argv.length > 2) {
    themeName = process.argv[2];
}
const compileCompType = async(compCategory) => {
    return new Promise(resolve => {
        glob(`./src/main/webpack/static/${compCategory}/**/*.scss`, {}, async(err, files) => {
            let filteredFiles = files;
            if (!configs.skipLimit) {
                filteredFiles = files.splice(0, configs.limitPerCategory);
            }
            for (const item of filteredFiles) {
                const runCompCompile = true;
                if (runCompCompile) {
                    const isRTL = item.indexOf('.rtl') > -1;
                    const compName = path.basename(item).replace('.scss', '').replace('.rtl', '');
                    console.log(`\t    ${compName.trim()} ${isRTL?'[RTL]':''}`);
                    let allResourcesList = [
                        `/${themeName}/_core-base.scss`,
                        `/${themeName}/global/_${compName}.scss`
                    ].map(itemRes => {
                        return path.join(__dirname, '/src/main/webpack/scss/', itemRes);
                    });
                    let resourcesList = [];
                    for (const fileToCheck of allResourcesList) {
                        let isFileExists = fs.existsSync(fileToCheck);
                        if (isFileExists) {
                            resourcesList.push(fileToCheck);
                        }
                    }
                    const config = {
                        entry: {
                            [path.basename(item).replace('.scss', '')]: item
                        },
                        output: {
                            filename: '[name].js',
                            path: path.join(outPutDir, compCategory, compName)
                        },
                        module: {
                            rules: [{
                                test: /\.scss$/,
                                use: [
                                    // Extract and save the final CSS.
                                    MiniCssExtractPlugin.loader,
                                    // Load the CSS, set url = false to prevent following urls to fonts and images.
                                    { loader: "css-loader", options: { url: false, importLoaders: 1 } },
                                    // Add browser prefixes and minify CSS.

                                    { loader: 'postcss-loader',
                                        options: {
                                            plugins: [
                                                autoprefixer()
                                            ],
                                            minimize: false
                                        }
                                    },
                                    // Load the SCSS/SASS
                                    { loader: 'sass-loader' },
                                    {
                                        loader: "sass-resources-loader",
                                        options: {
                                            resources: resourcesList
                                        },
                                    }
                                ],
                            }, ],
                        },

                        plugins: [
                            // Define the filename pattern for CSS.
                            new MiniCssExtractPlugin({
                                filename: '[name].css'
                            })
                        ],
                        stats: {
                            logging: 'verbose'
                        }
                    };
                    await compileFileAsync(config);
                    reports.compiledFiles.push({
                        compCategoryName: compCategory,
                        componentName: compName,
                        compiledPath: path.join(outPutDir, compCategory, compName),
                        compActualPath: item
                    });
                }
            }
            resolve();
        });
    });
};

const printReport = async() => {
    console.log("\t  Completed moving component CSS to clientlib-components\n");
};

function replaceCSSVars(data) {
  if (data.indexOf('{--') > -1) {
    data = data.replace(/^.*?\}/gi, '');
  }
  return data;
}

function removeCSSVarsandFormat (file, removeVarsTwice = true){

  let data = fs.readFileSync(file,{encoding: 'utf-8'});

  //remove variables only when variables are generated in the file.
  data = replaceCSSVars(data);
  if(removeVarsTwice) {
    // some files have CSS variables twice due to bootstrap vars
    // running it again to tackle that case
    data = replaceCSSVars(data);
  }

  data = prettier.format(data, {parser: 'css'});

  fs.writeFileSync(file, data);
}



const copyToCompClientlib = async() => {
    for (const fileToCopy of reports.compiledFiles) {
        const compName = path.basename(fileToCopy.compiledPath);
        const metaFile = path.join(path.dirname(fileToCopy.compActualPath), metaConfigFile);
        const isRtl = fileToCopy.compActualPath.indexOf('rtl') >= 0;
        const dependencies = [];
        let compLibPath = "";
        if (isRtl) {
            compLibPath = path.join(compRtlClientlibsFolderPath, compName);
        } else {
            compLibPath = path.join(compClientlibsFolderPath, compName);
        }

        if (fs.existsSync(metaFile)) {
          let data = fs.readFileSync(metaFile,{encoding: 'utf-8'});
          data = JSON.parse(data);
          if(isRtl){
              data.dependencies.forEach((dependency)=>{
                dependencies.push(`abbott-platform.components.rtl.${dependency}`);
              });
          } else {
              data.dependencies.forEach((dependency)=>{
                dependencies.push(`abbott-platform.components.${dependency}`);
              });
          }
          

        }
        const isCompLibPathExists = fs.existsSync(compLibPath);
        if (!isCompLibPathExists) {
            fs.mkdirSync(compLibPath);
        }
        const cssFolderPath = path.join(compLibPath, 'css');
        checkAndCreateFolder(cssFolderPath);
        if (!fs.existsSync(path.join(compLibPath, 'css.txt'))) {
            fs.writeFileSync(path.join(compLibPath, 'css.txt'), `#base=css\n${compName}.css`);
        }
        if (!fs.existsSync(path.join(compLibPath, '.content.xml'))) {
            let xmlContent = isRtl ? contentXmlRtlContent : contentXmlContent;
            xmlContent = xmlContent.replace('{{compName}}', compName);
            xmlContent = xmlContent.replace('{{dependencies}}', dependencies.join(','));
            fs.writeFileSync(path.join(compLibPath, '.content.xml'), xmlContent);
        }

        let cssFilePath;
        if (isRtl) {
          cssFilePath = path.join(fileToCopy.compiledPath, compName + '.rtl.css');
        } else {
          cssFilePath = path.join(fileToCopy.compiledPath, compName + '.css');
        }

        if (fs.existsSync(cssFilePath)) {
          removeCSSVarsandFormat(cssFilePath);
          fs.copyFileSync(cssFilePath, path.join(cssFolderPath, `${compName}.css`));
        }

    }
    printReport();
};

const formatThemes = () => {
  console.log('\n\t➜ Prettifying Themes CSS....');
  themesInfo.forEach((theme)=>{
    removeCSSVarsandFormat(theme.path, false);
  });
};

const startProcess = async() => {
    console.log('\n\t➜ Compiling the components....');
    console.log('\t------------------------------------');
    for (const compCategory of compsToCompile) {
        await compileCompType(compCategory);
    }
    console.log('\n\tCompilation complete\n');

    console.log('\n\t➜ Moving generated component files to clientlib-components\n');

    const compClientlibsExists = fs.existsSync(compClientlibsFolderPath);
    if (!compClientlibsExists) {
        fs.mkdirSync(compClientlibsFolderPath);
    }
    const compRtlClientlibsExists = fs.existsSync(compRtlClientlibsFolderPath);
    if (!compRtlClientlibsExists) {
        fs.mkdirSync(compRtlClientlibsFolderPath);
    }
    await copyToCompClientlib();

    formatThemes();
};

//console.log('===============================================');
console.log('\t  Component clientlib generation.......');
//console.log('===============================================\n');

rimraf(outPutDir, async() => {
    await startProcess();
    //console.log("\n ✅   DONE!!!\n");
});
