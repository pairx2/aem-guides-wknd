const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const themeNames = require('./theme-names.json');
const webpackPath = path.join(__dirname, 'src', 'main', 'webpack');
const scssPath = path.join(webpackPath, 'scss');
const glob = require('glob');

const sourceThemeName = 'theme1';
var createThemeNameFolder = async (themeNamePath, themeName) => {
    fs.mkdirSync(themeNamePath);
};

const correctThemeName = async (themeNamePath, themeName) => {
    new Promise(resolve => {
        fs.readFile(path.join(themeNamePath, 'main.scss'), (err, fileContent) => {
            console.log("file content", fileContent.toString());
            if (err) {
                resolve();
            } else {
                let contentToReplace = fileContent.toString();
                let replacedContent = contentToReplace.replace(sourceThemeName, themeName);
                fs.writeFile(path.join(themeNamePath, 'main.scss'), replacedContent, (err, b) => {
                    resolve();
                });
            }
        });
    });
};

const copyFromSrcToDest = async(src, dest) => {
    return Promise.all(
        [
            new Promise(resolve => {
                glob(`${src}/*.*`, {}, async(err, files) => {
                    for(let fileToMove of files) {
                        fs.copyFileSync(fileToMove, path.join(dest, path.basename(fileToMove)));
                    }
                    resolve();
                });
            }),
            new Promise(resolve => {
                glob(`${src}/global/*.*`, {}, async(err, files) => {
                    await createThemeNameFolder(path.join(dest, 'global'));
                    for(let fileToMove of files) {
                        fs.copyFileSync(fileToMove, path.join(dest, 'global', path.basename(fileToMove)));
                    }
                    resolve();
                });
            })
        ]
    ).then(() => {
        console.log("Copy done");
    });
}

var generateThemeName = async (themeNamePath, themeName, folderType) => {
    await createThemeNameFolder(themeNamePath, themeName);

    if (folderType === 'root') {
        let srcThemePath = path.join(webpackPath, sourceThemeName);
        await copyFromSrcToDest(srcThemePath, themeNamePath);
        await correctThemeName(themeNamePath, themeName);
    } else {
        let srcThemePath = path.join(scssPath, sourceThemeName);
        await copyFromSrcToDest(srcThemePath, themeNamePath);
    }
};


const startProcess =  async () => {
    if (process.argv && process.argv.length > 2) {
        let themeName = process.argv[2];
        let themeNamePath = path.join(webpackPath, themeName);
        let themeExists = fs.existsSync(themeNamePath);
        if (themeExists) {
            console.error('Theme name already exists under webpack folder !!!');
        } else {
            console.log(`Creating theme : ${themeName}`);
            await generateThemeName(themeNamePath, themeName, 'root');
        }

        let themeScssPath = path.join(scssPath, themeName);
        let themeNameScssExists = fs.existsSync(themeScssPath);
        if (themeNameScssExists) {
            console.error('Theme name already exists under webpack/scss folder !!!');
        } else {
            console.log(`Creating theme : ${themeName}`);
            await generateThemeName(themeScssPath, themeName, 'scss');
        }
    }
}

startProcess();
