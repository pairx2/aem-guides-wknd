const fs = require('fs');
const path = require('path');
const scssToJson = require('./src/scss-to-json');
const utils = require('./utils');
const { constants, shadowsJSON, copyRecursiveSync, constructColorSystem, constructTypography, constructSpacing, replaceDefaultValues } = utils;

const excludeFileList = ['base', '_core-base', '_global', '_variables', '_fonts', '.DS_Store'];
const respObj = {};
function getResults(dirPath, fName) {
    let flag = true;
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log('Invalid File Directory Found');
            return;
        }
        files.forEach(file => {
            const filePath = path.resolve(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                const innerPath = path.resolve(dirPath, file);
                getResults(innerPath, fName);
                flag = false;
            } else {
                const fileName = file.split('.')[0] || file;
                if (excludeFileList.indexOf(fileName) < 0) {
                    console.log('\x1b[33m%s\x1b[0m',`reading ${file} of ${fName}`);
                    respObj[fileName] = scssToJson(filePath, {
                        dependencies: [
                            { path: path.resolve(__dirname, '..', 'scss', fName, '_variables.scss') },
                            { path: path.resolve(__dirname, '..', 'scss', fName, '_typography.scss') },
                            { path: path.resolve(__dirname, '..', 'scss', fName, '_global.scss') }
                        ]
                    });
                    delete respObj[fileName][''];
                    if (Object.keys(respObj[fileName]).length === 0) {
                        delete respObj[fileName];
                    }
                }
            }
        });
        if (flag) {
            let newConfigFolderPath = '';
            let typographyFilePath = '';
            // const excludeTypes = ['color'];
            if (respObj['_color-system'] || respObj['_shadows'] || respObj['_typography']) {
                newConfigFolderPath = path.resolve(__dirname, '..', 'config', 'global', fName);
                if (!fs.existsSync(newConfigFolderPath)) {
                    fs.mkdirSync(newConfigFolderPath);
                } else {
                    typographyFilePath = path.resolve(__dirname, '..', 'config', 'global', fName, '_typography.json');
                }
            }
            if (respObj['_color-system'] && newConfigFolderPath) {
                const configObj = constructColorSystem(Object.keys(respObj['_color-system']), respObj['_color-system']);
                fs.writeFileSync(`${newConfigFolderPath}/_color-system.json`, JSON.stringify({
                    '_color-system': configObj
                }), 'utf-8');
            }
            if (respObj['_shadows'] && newConfigFolderPath) {
                let result = replaceDefaultValues('key', shadowsJSON, respObj['_shadows']);
                fs.writeFileSync(`${newConfigFolderPath}/_shadows.json`, JSON.stringify(result), 'utf-8');
            }
            if (respObj['_typography'] && newConfigFolderPath && fs.existsSync(typographyFilePath)) {
                const typographyData = constructTypography();
                let result = replaceDefaultValues('key', typographyData, respObj['_typography']);
                fs.writeFileSync(typographyFilePath, JSON.stringify(result), 'utf-8');
            }
            if (respObj['_spacings'] && newConfigFolderPath) {
                const spacingData = constructSpacing();
                let result = replaceDefaultValues('key', spacingData, respObj['_spacings']);
                fs.writeFileSync(`${newConfigFolderPath}/_spacings.json`, JSON.stringify(result), 'utf-8');
            }
            const writePath = path.resolve(__dirname, constants.convertedScssDirName, `converted-${fName}-scss.json`);
            fs.writeFileSync(writePath, JSON.stringify(respObj), 'utf-8');
        }
    });
}

const themeFiles = ['theme1', 'theme2', 'theme3'];
const scssDirPath = path.resolve(__dirname, '..', 'scss');
const coreThemeFolderPath = path.join(__dirname, 'core-themes');
if (!fs.existsSync(coreThemeFolderPath)) {
    fs.mkdirSync(coreThemeFolderPath);
}
const convertedScssDirName = path.resolve(__dirname, constants.convertedScssDirName);
if (!fs.existsSync(convertedScssDirName)) {
    fs.mkdirSync(convertedScssDirName);
}
fs.readdir(scssDirPath, (err, files) => {
    if (err) {
        console.log('Invalid File Directory Found');
        return;
    }
    console.log('\x1b[33m%s\x1b[0m','converting scss variables to JSON. this step might take a while......\n');
    files.forEach(file => {
        const filePath = path.resolve(scssDirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory() && themeFiles.includes(file)) {
            const innerPath = path.resolve(scssDirPath, file);
            getResults(innerPath, file);
            let themenName = path.basename(filePath);
            copyRecursiveSync(filePath, path.join(coreThemeFolderPath, themenName));
        }
    });
});
