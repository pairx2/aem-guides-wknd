/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const prettier = require("prettier");
const rimraf = require("rimraf");
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

var componentsWithSrcMap = {};
const compToSrcMapFilePath = path.join(__dirname, 'comps-map.json');
if (fs.existsSync(compToSrcMapFilePath)) {
    try {
        componentsWithSrcMap = JSON.parse(fs.readFileSync(compToSrcMapFilePath, { encoding: 'utf8' }));
    } catch(e) {
        //swallow
    }
}

const cwdPath = path.join(__dirname);
const configs = {
    compsPath: path.join(cwdPath, 'src', 'main', 'webpack', 'static'),
    compsToCompile: ['atoms', 'molecules', 'organisms'],
    tempJsDist: path.join(cwdPath, 'comps-js-temp'),
    limitPerCategory: 1,
    skipLimit: true,
    compsFolderPath: '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/components/content',
    rootClientLibsPath: '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs',
    exceptions: [{
        nameToCheck: 'organisms',
        actualNameExists: 'organism',
        exceptionType: 'CLIENTLIBSCOPY'
    }],
    skipCompSpecificCopy: false
};
var compClientlibsFolderPath = path.join(configs.rootClientLibsPath, 'clientlib-components');
var compRtlClientlibsFolderPath = path.join(configs.rootClientLibsPath, 'clientlib-components-rtl');
const contentXmlContent = fs.readFileSync(path.join(__dirname, 'scripts-lib', 'content-xml.txt'), { encoding: 'utf8'});
const contentXmlRtlContent = fs.readFileSync(path.join(__dirname, 'scripts-lib', 'content-xml-rtl.txt'), {
  encoding: 'utf-8'}
);

const reports = {
    compiledFiles: [],
    failedCompiledFiles: [],
    copiedFiles: []
};

const checkAndCreateFolder = (folderPath) => {
  const isFolderExists = fs.existsSync(folderPath);
  if (!isFolderExists) {
      fs.mkdirSync(folderPath);
  }
};


const formatJS = (file) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = prettier.format(data, {parser:'babel'});

    fs.writeFile(file, data, 'utf8', function (errw) {
      if (errw) {
       return console.log(err);
      }
   });
  });
};

const handleJsInClientLibs = (clientLibPath, fileToCopy, isRtl) => {
    const compLibPath = path.join(clientLibPath, fileToCopy.compName);
    checkAndCreateFolder(compLibPath);
    const jsFolderPath = path.join(compLibPath, 'js');
    checkAndCreateFolder(jsFolderPath);
    if (!fs.existsSync(path.join(compLibPath, 'js.txt'))) {
        fs.writeFileSync(path.join(compLibPath, 'js.txt'), `#base=js\n${fileToCopy.compName}.js`);
    }
    
    if (!fs.existsSync(path.join(compLibPath, '.content.xml'))) {
        var dependencies = [];
        try {
            const compDirPath = componentsWithSrcMap[fileToCopy.compName];
            metaJson = JSON.parse(fs.readFileSync(path.join(compDirPath, 'meta.json')));
            if(isRtl){
                dependencies = metaJson.dependencies.map((dependency)=>{
                    return `abbott-platform.components.rtl.${dependency}`;
                });
            } else {
                dependencies = metaJson.dependencies.map((dependency)=>{
                    return `abbott-platform.components.${dependency}`;
                });  
            }
        } catch(e) {
            // swallow
        }
        let xmlContent = isRtl ? contentXmlRtlContent : contentXmlContent;
        xmlContent = xmlContent.replace('{{compName}}', fileToCopy.compName);
        xmlContent = xmlContent.replace('{{dependencies}}', dependencies.join(','));
        fs.writeFileSync(path.join(compLibPath, '.content.xml'), xmlContent);
    }

    const jsFilePath = path.join(fileToCopy.compiledPath);
    if (fs.existsSync(jsFilePath)) {
      formatJS(jsFilePath);
      fs.copyFileSync(jsFilePath, path.join(jsFolderPath, `${fileToCopy.compName}.js`));
    }
};


const copyFilesToComponentClientlib = async() => {
    console.log('\n\t➜ Moving generated component files to clientlib-components');
    for (const fileToCopy of reports.compiledFiles) {
        handleJsInClientLibs(compClientlibsFolderPath, fileToCopy, false);
        handleJsInClientLibs(compRtlClientlibsFolderPath, fileToCopy, true);
    }
    console.log("\t  Completed moving component JS to clientlib-components\n");
};

const readProdClientLibs = () => {
  const files = glob.sync('./dist/clientlib-components/**/*.js', {});
  for (const file of files) {
    const fileName = path.basename(file);
    const compName = fileName.replace('.js', '');
    reports.compiledFiles.push({
      compName: compName,
      compiledPath: file
    });
  }
};


const startProcess = async() => {
  // console.log('\n\t➜ Compiling the components....');
  // console.log('\t------------------------------------');
    // for (const compCategory of configs.compsToCompile) {
    //     await compileCompType(compCategory);
    // }
    readProdClientLibs();
   // console.log(`\n\t Completed: Compilation process\n`);
    checkAndCreateFolder(compClientlibsFolderPath);
    checkAndCreateFolder(compRtlClientlibsFolderPath);
    await copyFilesToComponentClientlib();
    //console.log("\n ✅   DONE!!!\n");
};

console.log('\t  Component JS clientlib generation.......');

rimraf(configs.tempJsDist, () => {
    //console.log("\t Housekeeping");
    startProcess();

});
