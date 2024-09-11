const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const archiver = require('archiver');
const axios = require('axios');

const cssCompiler = require('css-json-converter');
const formidable = require('formidable');
const jsonConcat = require('./src/concat-json');
const utils = require('./utils');
const fonts = require('./fonts.config');

const PORT = process.env.PORT || 4545;
const {
    send,
    concatenatedJSON,
    copyRecursiveSync,
    constructColorSystem,
    constructTypography,
    constructSpacing,
    constructThemeFiles,
    constructFontFiles,
    uuid,
    replaceDefaultValues,
    shadowsJSON,
    constants
} = utils;

const getJSONList = (csskey, sourceObj, result) => {
    for (const key in sourceObj.attributes) {
        if (key.trim().indexOf('--') >= 0 && key.trim().indexOf('var(') < 0) {
            if (!result[csskey]) {
                result[csskey] = {};
            }
            result[csskey][key.trim()] = sourceObj.attributes[key] instanceof Array ? sourceObj.attributes[key][0] : sourceObj.attributes[key];
        }
    }
    for (const key in sourceObj.children) {
        getJSONList(key.trim(), sourceObj.children[key], result);
    }
}

const folder = 'dist';
const allowedHeaders = ['Authorization', 'Content-Type', 'x-api-key'];

http.createServer((req, resp) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname.indexOf('/api') < 0) {
        let request = req, response = resp;
        let fileName = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname;
        let filePath = fileName.indexOf('imported-css') >= 0 ? path.join(__dirname, fileName) : path.join(__dirname, '..', folder, fileName);
        if (fs.existsSync(filePath)) {
            var stat = fs.statSync(filePath);
            let contentType = 'application/json';
            let fExtension = fileName.substr(fileName.lastIndexOf('.'))
            switch (fExtension) {
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.icon':
                    contentType = 'image/x-icon';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.css.gz':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
                default:
                    break;
            }
            let responseHeaders = {
                'Content-Type': contentType,
                'Content-Length': stat.size
            };
            if (fileName.indexOf('.css.gz') >= 0) {
                responseHeaders['Content-Type'] = 'text/css';
                responseHeaders['Content-Encoding'] = 'gzip';
                responseHeaders['Content-Length'] = stat.size;
            }
            response.setHeader('Access-Control-Allow-Origin', request.headers.origin || '*');
            response.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(','));
            response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH, OPTIONS');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.writeHead(200, responseHeaders);
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(response);

        } else {
            let filePath = path.join(__dirname, '..', folder, 'index.html');
            if (fs.existsSync(filePath)) {
                let stat = fs.statSync(filePath);
                let contentType = 'text/html';
                response.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': stat.size
                });
                let readStream = fs.createReadStream(filePath);
                readStream.pipe(response);
            } else {
                response.end();
            }
        }
    } else {
        const { themeId } = parsedUrl.query;
        if (parsedUrl.pathname.indexOf('/api/getConvertedJSON') === 0) {
            if (!themeId) {
                send(req, resp, {
                    success: false,
                    message: 'themeId property is required.'
                });
                return;
            }
            const { component } = parsedUrl.query;
            const convertedThemeFilePath = path.resolve(__dirname, constants.convertedScssDirName, `converted-${themeId}-scss.json`);
            const importedCssFilePath = path.resolve(__dirname, constants.importedCssDirName, `${themeId}.json`);
            let scssFilePath = '';
            let checkImportFlag = false;
            if (fs.existsSync(importedCssFilePath)) {
                scssFilePath = importedCssFilePath;
                checkImportFlag = true;
            } else if (fs.existsSync(convertedThemeFilePath)) {
                scssFilePath = convertedThemeFilePath;
            } else {
                send(req, resp, {
                    success: false,
                    message: 'Invalid theme file requested.'
                });
                return;
            }
            if (component) {
                const scssDataStr = fs.readFileSync(scssFilePath, 'utf8');
                if (!scssDataStr) {
                    send(req, resp, {
                        success: false,
                        message: 'Invalid file found',
                        error: String(error)
                    });
                    return;
                }
                const scssData = scssDataStr ? JSON.parse(scssDataStr) : {};
                const componentsDirPath = path.resolve(__dirname, '..', 'config', 'components', `${component}.json`);
                if (fs.existsSync(componentsDirPath)) {
                    const jsonDataStr = fs.readFileSync(componentsDirPath, 'utf8');
                    const jsonData = jsonDataStr ? JSON.parse(jsonDataStr) : {};
                    if (jsonData[component]) {
                        const configData = checkImportFlag && jsonData[component]['selector'] && scssData[jsonData[component]['selector']] ? scssData[jsonData[component]['selector']] : (scssData[component] || scssData[':root']);
                        if (!configData) {
                            send(req, resp, {
                                success: false,
                                message: 'Invalid component requested!'
                            });
                            return;
                        }
                        jsonData[component] = replaceDefaultValues('key', jsonData[component], configData);
                        send(req, resp, {
                            success: true,
                            data: {
                                [component]: jsonData[component]
                            }
                        });
                        return;
                    }
                }
                send(req, resp, {
                    success: false,
                    message: 'Invalid file requested'
                });
                return;
            } else {
                if (checkImportFlag) {
                    const scssDataStr = fs.readFileSync(scssFilePath, 'utf8');
                    if (!scssDataStr) {
                        send(req, resp, {
                            success: false,
                            message: 'Invalid file found',
                            error: String(error)
                        });
                        return;
                    }
                    const scssData = scssDataStr ? JSON.parse(scssDataStr) : {};
                    const jsonResp = {};
                    constants.globalComponents.forEach(item => {
                        if (scssData[item]) {
                            jsonResp[item] = scssData[item];
                        }
                    });
                    if (Object.keys(jsonResp).length === 0) {
                        send(req, resp, {
                            success: false,
                            message: 'No Global Variables Found'
                        });
                        return;
                    }
                    send(req, resp, {
                        success: true,
                        data: jsonResp
                    });
                    return;
                } else {
                    const componentsDirPath = path.resolve(__dirname, '..', 'config', 'global');
                    const filePaths = concatenatedJSON(componentsDirPath, themeId);
                    jsonConcat({ src: filePaths }, (err, json) => {
                        if (!err && json && Object.keys(json).length) {
                            send(req, resp, {
                                success: true,
                                data: json
                            });
                            return;
                        } else {
                            send(req, resp, {
                                success: false,
                                message: 'Failed JSON Concatenation',
                                error: String(err)
                            });
                        }
                    });
                }
            }
        } else if (parsedUrl.pathname.indexOf('/api/importCssFile') === 0 && req.method.toLowerCase() === 'post') {
            // parse a file upload
            const form = formidable();
            form.parse(req, (err, fields, files) => {
                if (err) {
                    send(req, resp, {
                        success: false,
                        message: 'Cannot import the file. Invalid file found',
                        err: String(err)
                    });
                    return;
                }
                if (!(files && files['file'] && files['file']['filepath'])) {
                    send(req, resp, {
                        success: false,
                        message: 'Invalid file path found'
                    });
                    return;
                }
                fs.readFile(files['file']['filepath'], 'utf8', (err, data) => {
                    if (err) {
                        send(req, resp, {
                            success: false,
                            message: 'Invalid file found'
                        });
                        return;
                    }
                    // replace css comments
                    // data = data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
                    const importedCssDirPath = path.resolve(__dirname, constants.importedCssDirName);
                    const uid = uuid();
                    let result = {};
                    try {
                        let compiledJSON = cssCompiler.toJSON(data);
                        for (const key in compiledJSON.children) {
                            getJSONList(key.trim(), compiledJSON.children[key], result);
                        }
                        const inValidCssKeys = [...constants.primaryColorKeys, ...constants.grayscaleColorKeys, ...constants.statusColorKeys].filter(key => !result[':root'][key]);
                        if (inValidCssKeys.length === 0) {
                            const newColorKeys = [];
                            const rootResult = result[':root'];
                            const excludeColorVars = ['--date-picker-icon-selected-color'];
                            if (rootResult) {
                                for (const property in rootResult) {
                                    if (![...constants.primaryColorKeys, ...constants.grayscaleColorKeys, ...constants.statusColorKeys].includes(property) && property.match(/-color$/g) && !excludeColorVars.includes(property)) {
                                        let checkFlag = true;
                                        for (const conf in constants.tintsAndShadesConfig) {
                                            if (property.indexOf(conf) >= 0) {
                                                checkFlag = false;
                                                break;
                                            }
                                        }
                                        if (checkFlag && rootResult[property] && rootResult[property].trim().match(/^#/i)) {
                                            newColorKeys.push(property);
                                        }
                                    }
                                }
                            }
                            const typographyData = constructTypography();
                            const configObj = constructColorSystem([...constants.primaryColorKeys, ...constants.grayscaleColorKeys, ...constants.statusColorKeys, ...newColorKeys], result[':root']);
                            const spacingsData = constructSpacing();
                            const excludeTypes = ['color'];
                            result['_color-system'] = configObj;
                            result['_shadows'] = replaceDefaultValues('key', shadowsJSON['_shadows'], result[':root'], excludeTypes);
                            result['_typography'] = replaceDefaultValues('key', typographyData['_typography'], result[':root']);
                            result['_spacings'] = replaceDefaultValues('key', spacingsData['_spacings'], result[':root']);
                            fs.writeFileSync(importedCssDirPath + `/${uid}.json`, JSON.stringify(result));
                            fs.writeFileSync(importedCssDirPath + `/${uid}.css`, data);
                            const jsonResp = {};
                            constants.globalComponents.forEach(item => {
                                if (result[item]) {
                                    jsonResp[item] = result[item];
                                }
                            });
                            send(req, resp, {
                                success: true,
                                data: jsonResp,
                                fileName: uid
                            });
                            return;
                        } else {
                            send(req, resp, {
                                success: false,
                                message: 'Mandatory css variable keys not found.',
                                keysNotFound: inValidCssKeys
                            });
                            return;
                        }
                    } catch (e) {
                        send(req, resp, {
                            success: false,
                            message: 'compilation failed while converting scss variables to json',
                            error: String(e)
                        });
                    }
                });
            });
        } else if (parsedUrl.pathname.indexOf('/api/exportCssFile') === 0) {
            const { themeId, outputName } = parsedUrl.query;
            if (!(themeId && outputName)) {
                send(req, resp, {
                    success: false,
                    message: 'themeId and outputName is required to download css file'
                });
                return;
            }
            async function getResults() {
                const newDestFileName = outputName.toLowerCase().replace(/\s/g, '-');
                const convertedCssDirPath = path.resolve(__dirname, '..', 'dist', `clientlib-${themeId}`);
                const importedCssPath = path.resolve(__dirname, constants.importedCssDirName, `${themeId}.css`);
                let responseStr = '';
                try {
                    if (fs.existsSync(convertedCssDirPath)) {
                        responseStr = fs.readFileSync(`${convertedCssDirPath}/${themeId}.css`, 'utf-8');
                    } else if (fs.existsSync(importedCssPath)) {
                        responseStr = fs.readFileSync(importedCssPath, 'utf-8');
                    } else {
                        // this is fallback code
                        const url = req.headers.host.indexOf('localhost') >= 0 ? 'localhost:8080' : req.headers.host;
                        const { data } = await axios.get(`http://${url}/clientlib-${themeId}/${themeId}.css`);
                        if (data) {
                            responseStr = data;
                        }
                    }
                } catch (e) {
                    // swallow
                    send(req, resp, {
                        success: false,
                        message: 'Error downloading css file'
                    });
                }
                if (responseStr) {
                    let dataObj = '';
                    req.on('data', chunk => {
                        dataObj += chunk;
                    })
                    req.on('end', () => {
                        dataObj = dataObj ? JSON.parse(dataObj) : {};
                        try {
                            let notFoundRootKeys = {};
                            if (Object.keys(dataObj).length && responseStr) {
                                Object.keys(dataObj).forEach(objItem => {
                                    Object.keys(dataObj[objItem]).forEach(property => {
                                        const pattern = `(\\s?)a-zA-Z0-9.%,!\"\\-$*#'_ *`;
                                        const regex = new RegExp(property + ':(\s?)[' + pattern + ']+;');
                                        const regexValue = property + ': ' + dataObj[objItem][property] + ';';
                                        if (regexValue.match(regex) && responseStr.match(regex)) {
                                            responseStr = responseStr.replace(regex, regexValue);
                                        } else {
                                            notFoundRootKeys[property] = dataObj[objItem][property];
                                        }
                                    });
                                });
                            }
                            if (Object.keys(notFoundRootKeys).length) {
                                let rootStr = '';
                                let primaryStrMatch = responseStr.match(/--primary-color:(\s?)['a-zA-Z0-9#(\s?)']+;/);
                                Object.keys(notFoundRootKeys).forEach(key => {
                                    if (key.match(/-color$/g) && primaryStrMatch && primaryStrMatch.length) {
                                        responseStr = responseStr.replace(primaryStrMatch[0], `${primaryStrMatch[0]}\n  ${key}: ${notFoundRootKeys[key]};`);
                                    } else {
                                        rootStr += `  ${key}: ${notFoundRootKeys[key]};\n`;
                                    }
                                });
                                if (rootStr) {
                                    rootStr = ':root {\n' + rootStr + '}\n\n';
                                    responseStr = rootStr + responseStr;
                                }
                            }
                            send(req, resp, {
                                success: true,
                                data: {
                                    cssfileName: newDestFileName,
                                    responseStr: responseStr
                                }
                            });
                        } catch (e) {
                            // swallow
                            send(req, resp, {
                                success: false,
                                message: 'Error downloading css file'
                            });
                        }
                    })
                } else {
                    // swallow
                    send(req, resp, {
                        success: false,
                        message: 'Error downloading css file'
                    });
                }
            }
            getResults();
        } else if (parsedUrl.pathname.indexOf('/api/exportScssFiles') === 0) {
            let { themeId, outputName } = parsedUrl.query;

            if (!(themeId && outputName)) {
                send(req, resp, {
                    success: false,
                    message: 'themeId and outputName are required to download zip scss'
                });
                return;
            }
            const themeFiles = ['theme1', 'theme2', 'theme3'];
            if (!themeFiles.includes(themeId)) {
                themeId = 'theme1';
            }

            const coreThemeFolderPath = path.join(__dirname, 'core-themes');
            const exportCssFolderPath = path.join(__dirname, 'export-css');
            const aemThemeFolderPath = path.join(exportCssFolderPath, 'aem-theme');
            const themeZipFilePath = path.join(__dirname, 'theme-zip-files');
            const newDestFolderName = outputName.toLowerCase().replace(/\s/g, '-');
            if (!fs.existsSync(exportCssFolderPath)) {
                fs.mkdirSync(exportCssFolderPath);
            }
            if (!fs.existsSync(aemThemeFolderPath)) {
                fs.mkdirSync(aemThemeFolderPath);
            }
            let srcThemePath = path.join(coreThemeFolderPath, themeId);
            if (fs.existsSync(srcThemePath)) {
                const exportScssDirPath = path.join(aemThemeFolderPath, 'scss');
                if (!fs.existsSync(exportScssDirPath)) {
                    fs.mkdirSync(exportScssDirPath);
                }
                let destthemePath = path.join(exportScssDirPath, newDestFolderName);
                copyRecursiveSync(srcThemePath, destthemePath);
                constructThemeFiles(aemThemeFolderPath, newDestFolderName);
                let dataObj = '';
                req.on('data', chunk => {
                    dataObj += chunk;
                })
                req.on('end', async () => {
                    try {
                        let regexStr = '';
                        fonts.forEach((font, i) => {
                            regexStr += `(${font.label})${i < fonts.length - 1 ? '|' : ''}`;
                        });
                        let fontRegex = new RegExp(regexStr, 'gi');
                        let fontRegexList = dataObj.match(fontRegex);
                        if (fontRegexList && fontRegexList.length) {
                            fontRegexList = fontRegexList.filter((v, i, a) => a.indexOf(v) === i);
                            constructFontFiles(fontRegexList, destthemePath);
                            let baseScssStr = fs.readFileSync(destthemePath + '/base.scss', 'utf-8');
                            if (baseScssStr && baseScssStr.indexOf(`@import 'fonts'`) < 0) {
                                baseScssStr += `\n@import 'fonts';`;
                                fs.writeFileSync(destthemePath + '/base.scss', baseScssStr, 'utf-8');
                            }
                        }
                        dataObj = dataObj ? JSON.parse(dataObj) : {};

                        for (const cssFileName in dataObj) {
                            if (Object.hasOwnProperty.call(dataObj, cssFileName)) {
                                const updatedProps = dataObj[cssFileName];
                                let globalCssFilePath = path.join(destthemePath, 'global', cssFileName + '.scss');
                                if (cssFileName !== '_color-system') {
                                    if (fs.existsSync(globalCssFilePath)) {
                                        let fileContent = fs.readFileSync(globalCssFilePath);
                                        if (fileContent) {
                                            fileContent = fileContent.toString();
                                            for (const property in updatedProps) {
                                                const pattern = `(\\s?)a-zA-Z0-9.%,!\"\\-$*#'_{} *`;
                                                const regex = new RegExp(property + ':(\s?)[' + pattern + ']+;');
                                                const regexValue = property + ': ' + updatedProps[property] + ';';
                                                if (regexValue.match(regex)) {
                                                    fileContent = fileContent.replace(regex, regexValue);
                                                }
                                            }
                                            fs.writeFileSync(globalCssFilePath, fileContent);
                                        }
                                    }
                                } else {
                                    // this is maintained because new variables are added in COLOR SYSTEM only...
                                    if (fs.existsSync(globalCssFilePath)) {
                                        let rootStr = ':root {\n';
                                        for (const property in updatedProps) {
                                            rootStr += `    ${property}: ${updatedProps[property]};\n`;
                                        }
                                        rootStr += '}\n\n';
                                        fs.writeFileSync(globalCssFilePath, rootStr);
                                    }
                                }
                            }
                        }

                        if (!fs.existsSync(themeZipFilePath)) {
                            fs.mkdirSync(themeZipFilePath);
                        }

                        const output = fs.createWriteStream(path.join(themeZipFilePath, newDestFolderName + '.zip'));
                        // archive is asynchronous worker better to put execution completion checks here
                        const archive = archiver('zip', {
                            zlib: { level: 9 } // Sets the compression level.
                        });
                        archive.pipe(output);
                        archive.directory(aemThemeFolderPath, false);
                        output.on('close', function () {
                            console.log(archive.pointer() + ' total bytes');
                            console.log('archiver has been finalized and the output file descriptor has closed.');
                            // remove folder which is copied inside export-css
                            try {
                                fs.rmdirSync(aemThemeFolderPath, { recursive: true, force: true });
                            } catch(e) {
                                // swallow
                            }
                            send(req, resp, {
                                success: true,
                                data: {
                                    zipFileName: newDestFolderName,
                                    message: 'theme folder generated!',
                                    zipFilePath: '/api/download/zip/' + newDestFolderName + '.zip'
                                }
                            });
                        });
                        archive.finalize();
                    } catch (e) {
                        // swallow
                        send(req, resp, {
                            success: false,
                            message: 'Process failed'
                        });
                    }
                });
            } else {
                send(req, resp, {
                    success: false,
                    message: 'Run the schedular before generating folders'
                });
            }
        } else if (parsedUrl.pathname.indexOf('/api/download/zip') === 0) {
            let themeFileName = path.basename(parsedUrl.pathname);
            let filePath = path.join(__dirname, 'theme-zip-files', themeFileName);
            if (fs.existsSync(filePath)) {
                let stat = fs.statSync(filePath);
                let contentType = 'application/zip';
                resp.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': stat.size
                });
                let readStream = fs.createReadStream(filePath);
                fs.unlinkSync(filePath);
                readStream.pipe(resp);
            } else {
                send(req, resp, {
                    success: false,
                    message: themeFileName + ' file not found.'
                });
            }
        } else {
            send(req, resp, {
                success: false,
                message: 'Invalid endpoint'
            });
        }
    }
}).listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    const importedCssDirPath = path.resolve(__dirname, constants.importedCssDirName);
    if (!fs.existsSync(importedCssDirPath)) {
        fs.mkdirSync(importedCssDirPath);
    }
});
