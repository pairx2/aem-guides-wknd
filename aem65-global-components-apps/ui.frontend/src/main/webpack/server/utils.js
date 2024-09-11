const fs = require('fs');
const path = require('path');
const fonts = require('./fonts.config');

const send = (req, resp, obj) => {
    resp.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,OPTIONS');
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(obj));
};

const concatenatedJSON = (dir, themeType, results) => {
    var results = results || [];
    const list = fs.readdirSync(dir);
    list.forEach(item => {
        let file = path.resolve(dir, item);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (dir.indexOf('/config/global') < 0 || item === themeType) {
                concatenatedJSON(file, themeType, results);
            }
        } else {
            results.push(file);
        }
    });
    return results;
};

const copyRecursiveSync = (src, dest) => {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

const constructColorSystem = (variableKeys, dataObj) => {
    if (!(variableKeys && variableKeys.length > 0 && dataObj)) {
        return null;
    }
    const configObj = {
        '_brand-colors': {
            title: 'Brand Colors',
            variants: []
        },
        '_grayscale-colors': {
            title: 'Grayscale',
            variants: {
                options: []
            }
        },
        '_status-colors': {
            title: 'Status Colors',
            variants: []
        }
    };
    variableKeys.forEach(key => {
        const variableName = key.match(/(?<=--)(.*)(?=-color)/g) ? key.match(/(?<=--)(.*)(?=-color)/g)[0] : key.split('--').join('').split('-color').join('');
        const options = [];
        const colorValue = dataObj[key];
        const variant = {
            label: variableName,
            value: colorValue,
            key: key,
            options: options
        }
        if (constants.grayscaleColorKeys.indexOf(key) < 0 && constants.statusColorKeys.indexOf(key) < 0) {
            variant.original = colorValue;
            constants.brandColorTintsShadesConfig.tints.forEach(config => {
                const keyName = `--${variableName}-${config}-color`;
                const tint = dataObj.hasOwnProperty(keyName) ? dataObj[keyName] : calculateTints(colorValue, config);
                if (!dataObj.hasOwnProperty(keyName)) {
                    dataObj[keyName] = tint;
                }
                options.push({
                    label: `${variableName}-${config}`,
                    value: tint,
                    key: keyName,
                    config: config
                });
            });
            constants.brandColorTintsShadesConfig.shades.forEach(config => {
                const keyName = `--${variableName}-${config}-color`;
                const shade = dataObj.hasOwnProperty(keyName) ? dataObj[keyName] : calculateShades(colorValue, config);
                if (!dataObj.hasOwnProperty(keyName)) {
                    dataObj[keyName] = shade;
                }
                options.push({
                    label: `${variableName}-${config}`,
                    value: shade,
                    key: keyName,
                    config: config,
                    isShade: true
                });
            });
            variant.options = options;
            if (constants.primaryColorKeys.indexOf(key) < 0) {
                variant.isNotBaseColor = true;
            }
            configObj['_brand-colors']['variants'].push(variant);
        } else if (constants.grayscaleColorKeys.indexOf(key) >= 0) {
            delete variant.options;
            configObj['_grayscale-colors']['variants']['options'].push(variant);
        } else if (constants.statusColorKeys.indexOf(key) >= 0) {
            constants.statusColorTintsShadesConfig.tint.forEach(config => {
                const keyName = `--${variableName}-${config}-color`;
                const tint = dataObj.hasOwnProperty(keyName) ? dataObj[keyName] : calculateTints(colorValue, config);
                if (!dataObj.hasOwnProperty(keyName)) {
                    dataObj[keyName] = tint;
                }
                options.push({
                    label: `${variableName}-${config}`,
                    value: tint,
                    key: keyName,
                    config: config,
                });
            });
            constants.statusColorTintsShadesConfig.shade.forEach(config => {
                const keyName = `--${variableName}-${config}-color`;
                const shade = dataObj.hasOwnProperty(keyName) ? dataObj[keyName] : calculateShades(colorValue, config);
                if (!dataObj.hasOwnProperty(keyName)) {
                    dataObj[keyName] = shade;
                }
                options.push({
                    label: `${variableName}-${config}`,
                    value: shade,
                    key: keyName,
                    config: config,
                    isShade: true
                });
            });
            variant.options = options;
            configObj['_status-colors']['variants'].push(variant);
        }
    });

    const variantsArr = [...configObj['_brand-colors']['variants'], ...configObj['_status-colors']['variants']];
    const optionsArr = [];
    variantsArr.forEach(it => {
        it.options.forEach(opIt => optionsArr.push(opIt));
    });
    for (let conf in configObj) {
        if ((conf === '_brand-colors' || conf === 'status-colors')) {
            for (let i = 0; i < configObj[conf].variants.length; i++) {
                const variant = configObj[conf].variants[i];
                for (let j = 0; j < optionsArr.length; j++) {
                    const option = optionsArr[j];
                    if (variant.key === option.key) {
                        delete configObj[conf].variants[i];
                        break;
                    }
                }
            }
            configObj[conf].variants = configObj[conf].variants.filter(it => it !== null);
        }
    }
    return configObj;
};

const constructSpacing = () => {
  return {
    "_spacings": {
        "selector": ":root",
        "title": "Spacing",
        "variables": [
          {
            "label":"Margin",
            "type": "TRBL",
            "config": {
              "isMultiVariable": true,
              "default": {
                "top": {
                  "key": "--global-spacing-top",
                  "value": ""
                },
                "bottom":{
                  "key":"--global-spacing-bottom",
                  "value": ""
                }
              }
            }
          }
        ]

    }
  };
}

const constructTypography = () => {
    const configs = ["Body", "Body Large", "Body Small", "Paragraph", "Heading 1", "Heading 1 Hero", "Heading 2", "Heading 2 Hero", "Heading 3", "Heading 4", "Heading 5", "Heading 6", "Link", "Button Large", "Button Medium", "Button Small", "Caption", "Label"];
    const headingTags = {
        "heading-1": "h1",
        "heading-1-hero": "h1",
        "heading-2": "h2",
        "heading-2-hero": "h2",
        "heading-3": "h3",
        "heading-4": "h4",
        "heading-5": "h5",
        "heading-6": "h6"
    };
    const configTemplate = (label) => {
        let key = label.toLowerCase();
        key = key.replace(/\s/g, '-');
        const isBase = (key === 'body');
        label = isBase ? `${label} Styles` : label;
        const template = `{
            "label": "${label}",
            "config": {
                "configkey": "${key}",
                "default": {
                    "fontFamily": {
                        "type": "font",
                        "key": "--${key}-font-family",
                        "value": ""
                    },
                    "fontWeight": {
                        "type": "weight",
                        "key": "--${key}-font-weight",
                        "value": ""
                    },
                    "fontSize": {
                        "type": "unit",
                        "key": "--${key}-font-size",
                        "value": ""
                    },
                    "letterSpacing": {
                        "type": "unit",
                        "key": "--${key}-letter-spacing",
                        "value": ""
                    },
                    "lineHeight": {
                        "type": "unit",
                        "key": "--${key}-line-height",
                        "value": ""
                    },
                    "color": {
                        "type": "color",
                        "key": "--${key}-font-color",
                        "value": ""
                    }
                },
                "tag": "p"
            }
        }`;
        const parseTemplate = JSON.parse(template);
        if (key==='body') {
            parseTemplate['isBaseStyle'] = true;
        } else if (key.indexOf('heading') >= 0) {
            parseTemplate.config['tag'] = headingTags[key] || 'h1';
        } else if (key.indexOf('link') >= 0) {
            parseTemplate.config['tag'] = 'a';
        } else if (key.indexOf('button') >= 0) {
            parseTemplate.config['buttonType'] = key;
        } else if (key.indexOf('label') >= 0) {
            parseTemplate.config['tag'] = 'label';
        }
        return parseTemplate;
    }
    const finalConfig = configs.map((config) => {
        return configTemplate(config);
    });
    return {
        "_typography": {
            "selector": ":root",
            "title": "Typography",
            "variables": finalConfig
        }
    };
};

const constructThemeFiles = (filePath, themeName) => {
    if (fs.existsSync(filePath)) {
        const themePath = path.join(filePath, themeName);
        if (!fs.existsSync(themePath)) {
            fs.mkdirSync(themePath);
        }
        fs.writeFileSync(`${themePath}/theme.scss`, `@import "../scss/${themeName}/base";`, 'utf-8');
        fs.writeFileSync(`${themePath}/theme.ts`, `import "./theme.scss";`, 'utf-8');
        const rtlThemePath = path.join(filePath, `${themeName}-rtl`);
        if (!fs.existsSync(rtlThemePath)) {
            fs.mkdirSync(rtlThemePath);
        }
        fs.writeFileSync(`${rtlThemePath}/theme.scss`, `@import "../scss/${themeName}/base";`, 'utf-8');
        fs.writeFileSync(`${rtlThemePath}/theme.ts`, `import "./theme.scss";`, 'utf-8');
    }
};

const constructFontFiles = (fileArr, filePath) => {
    if (fileArr.length) {
        fileArr = fileArr.map(it => it.toLowerCase());
        let fontTemplate = '';
        fonts.forEach(font => {
            const { config } = font;
            if (config && config.fontProps && fileArr.indexOf(font.label.toLowerCase()) >= 0) {
                config.fontProps.forEach(fontProp => {
                    fontTemplate += '@font-face {\n' +
                    `   font-family: '${config.name}';\n` +
                    `   src: url('${config.refPath}${fontProp.path}.woff2') format('woff2'),\n` +
                    `       url('${config.refPath}${fontProp.path}.woff') format('woff');\n` +
                    `   font-weight: ${fontProp.weight};\n` +
                    `   font-style: ${fontProp.style};\n` +
                    `}\n\n`;
                });
            }
        });
        if (fontTemplate) {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            fs.writeFileSync(filePath + '/_fonts.scss', fontTemplate, 'utf-8');
            return true;
        }
    }
    return false;
};

const replaceDefaultValues = (key, dataObj, configObj, excludeTypes) => {
    var result = null;
    if (dataObj instanceof Array) {
        for (var i = 0; i < dataObj.length; i++) {
            result = replaceDefaultValues(key, dataObj[i], configObj, excludeTypes);
        }
    }
    else {
        for (var prop in dataObj) {
            if (excludeTypes instanceof Array && excludeTypes.indexOf(dataObj[prop]) >= 0) {
                break;
            }
            if (prop == key) {
                if (configObj.hasOwnProperty(dataObj[prop])) {
                    dataObj['value'] = configObj[dataObj[prop]];
                    break;
                }
            }
            if (dataObj[prop] instanceof Object || dataObj[prop] instanceof Array)
                result = replaceDefaultValues(key, dataObj[prop], configObj, excludeTypes);
        }
    }
    return dataObj;
}

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
function hexToRGB(colorValue) {
    if (colorValue.length === 3) {
        const values  = colorValue.split('');
        colorValue = [values[0],values[0],values[1],values[1],values[2],values[2]].join('');
    }
    return {
        red: parseInt(colorValue.substr(0, 2), 16),
        green: parseInt(colorValue.substr(2, 2), 16),
        blue: parseInt(colorValue.substr(4, 2), 16)
    }
}
function intToHex(rgbint) {
    return pad(Math.min(Math.max(Math.round(rgbint), 0), 255).toString(16), 2);
}
function rgbToHex(rgb) {
    return intToHex(rgb.red) + intToHex(rgb.green) + intToHex(rgb.blue);
}
function rgbShade(rgb, i) {
    return {
        red: rgb.red * (1 - i),
        green: rgb.green * (1 - i),
        blue: rgb.blue * (1 - i)
    }
}
function rgbTint(rgb, i) {
    return {
        red: rgb.red + (255 - rgb.red) * i,
        green: rgb.green + (255 - rgb.green) * i,
        blue: rgb.blue + (255 - rgb.blue) * i
    }
}
function calculate(colorValue, shadeOrTint, percent) {
    var color = hexToRGB(colorValue);
    return rgbToHex(shadeOrTint(color, percent / 100));
}
function calculateShades(colorValue, percent) {
    colorValue = colorValue ? colorValue.replace('#', '') : colorValue;
    return `#${calculate(colorValue, rgbShade, percent - 100)}`;
}

function calculateTints(colorValue, percent) {
    colorValue = colorValue ? colorValue.replace('#', '') : colorValue;
    return `#${calculate(colorValue, rgbTint, 100 - percent)}`;
}

const constants = {
    globalComponents: [ '_color-system', '_typography', '_shadows', '_spacings'],
    // globalComponents: fs.readdirSync(path.resolve(__dirname, '..', 'config', 'global')), - these are global components and shouldn't be changed
    convertedScssDirName: 'converted-scss',
    importedCssDirName: 'imported-css',
    primaryColorKeys: ["--primary-color", "--secondary-color", "--tertiary-color"],
    grayscaleColorKeys: ['--white-color', '--gray-lightest-color', '--gray-lighter-color', '--gray-light-color', '--gray-color', '--gray-dark-color', '--gray-darker-color', '--gray-darkest-color', '--black-color'],
    brandColorTintsShadesConfig: {
        tints: [25, 50, 75],
        shades: [110]
    },
    statusColorKeys: ["--info-color", "--success-color", "--warning-color", "--danger-color"],
    statusColorTintsShadesConfig: {
        tint: [10],
        shade: [110]
    },
    tintsAndShadesConfig: [25, 50, 75, 110]
};

const shadowsJSON = {"_shadows":{"selector":":root","title":"Shadows","groups":{"inner-shadows":{"small":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-inner-small"}}}],"medium":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-inner-medium"}}}],"large":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-inner-large"}}}],"extra-large":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-inner-extra-large"}}}]},"shadows":{"small":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-small"}}}],"medium":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-medium"}}}],"large":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-large"}}}],"extra-large":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-extra-large"}}}]},"glows":{"small":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-glow-small"}}}],"medium":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-glow-medium"}}}],"large":[{"type":"shadow","config":{"default":{"value":"","key":"--shadow-glow-large"}}}]}}}};

module.exports = {
    send,
    concatenatedJSON,
    copyRecursiveSync,
    constructColorSystem,
    constructTypography,
    constructSpacing,
    constructThemeFiles,
    constructFontFiles,
    uuid,
    calculateShades,
    calculateTints,
    replaceDefaultValues,
    shadowsJSON,
    constants: constants
};
