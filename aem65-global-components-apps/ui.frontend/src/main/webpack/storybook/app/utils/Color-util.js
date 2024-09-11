const colorType = {
  RGBA: 'rgba',
  RGB: 'rgb',
  HEX: '#',
  HSB: 'hsb'
}

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

/**
 * Returns the matched color value from the string rgba, hex, rgb
 * @param {string} value
 * @returns
 */
function getColorFromString(value) {
  return value.match(/(rgba\(.*\)|#[^\s]+|rgb\(.*\))/g);
}

/**
 * Removes spaces from the color values rgba(), rgb()
 * @param {string} value
 * @returns
 */
function normalizeColorValue (value) {
  const color = getColorFromString(value);

  if (color && color.length) {
    return value.replace(color[0], color[0].replace(/\s/g,''));
  }
  return value;
}

function getRGBAFromColor(color) {
  const type = getColorType(color);

  if(!type) {
    return {};
  }

  if (type ===  colorType.HEX) {
     const rgb = hexToRGB(color.replace('#', ''));
     rgb.opacity = 1;
     return rgb;
  } else {
    const regex = /^rgba?\((?<red>\d+),(?<green>\d+),(?<blue>\d+)(?:,(?<opacity>[0-9\.]+))?\)/gi.exec(color);
    return regex.groups;
  }
}

function getHEXFromColor(color) {
  const type = getColorType(color);
  if (type ===  colorType.HEX) {
    return color;
  } else {
    return '#' + rgbToHex(color);
  }
}

function getColorType(color) {
  const match = color && typeof color ==='string' && color.match(/(rgba|rgb|#)/g);
  if (!match || !match.length) {
    return;
  }

  switch (match[0]) {
    case colorType.RGBA:
      return colorType.RGBA;
    case colorType.RGB:
      return colorType.RGB;
    case colorType.HEX:
      return colorType.HEX;
    default:
      return undefined;
  }
}


function getShadeTintColorPercent(orgColor, newColor, isTint) {
  if (orgColor === newColor) {
    return 100;
  }

  orgColor = orgColor ? orgColor.replace('#', '') : orgColor;
  newColor = newColor ? newColor.replace('#', '') : newColor;

  const oldRGB = hexToRGB(orgColor);
  const newRGB = hexToRGB(newColor);
  let diffClrKey;

  if (oldRGB.red !== newRGB.red) {
    diffClrKey ='red'
  } else if(oldRGB.green !== newRGB.green) {
    diffClrKey ='green'
  } else {
    diffClrKey = 'blue'
  }

  const newClr = newRGB[diffClrKey];
  const oldClr = oldRGB[diffClrKey];

  if (isTint) {
    return calculateTintDiff(oldClr, newClr);
  } else {
    return calculateShadeDiff(oldClr, newClr);
  }
}

function calculateTintDiff(oClr, nClr) {
  const val = ((nClr - oClr)/(255 - oClr));
  return (100 - Math.round(val * 10) * 10) || 0;
}

function calculateShadeDiff(oClr, nClr) {
  return Math.round(((1 - Number((nClr / oClr).toFixed(3))) * 100 - 1)/10) * 10;
}

/**
 * returns shades and tints for 0 - 100 percentange with the interval 5
 * 0,5,10,15....100
 * @param {*} hexWithoutHash
 */
function getFullTintsOrShades(color) {
  let i = 0;
  const final = {
    tints: [],
    shades: []
  }
  while (i<=100) {
    final.tints.push(calculateTints(color, i));
    final.shades.push(calculateShades(color, 100 + i));
    i+=5;
  }
  return final;
}

const generateShadesTints = (color, label, shadeTintConfig) => {
  const shadeTints = [];
  const shadeTintsObj = {}
  shadeTintConfig.forEach((obj) =>{
    const shadeFn = obj.isShade ? calculateShades : calculateTints;
    const baseCounter = obj.isShade ? 100 : 0;
    const labelLower = label.toLowerCase();
    obj.options.forEach((percent)=>{
      const val = shadeFn(color.replace('#', ''), baseCounter + percent);
      const key = `${labelLower}-${baseCounter + percent}`;
      const varKey = `--${key}-color`;
      shadeTints.push({
        value: val,
        label: key,
        config: percent,
        key: varKey,
        isShade: obj.isShade
      });
      shadeTintsObj[varKey] = val;
    });
  });

  return {
    shadeTints,
    shadeTintsVars: shadeTintsObj
  };
}


export {
  calculateShades,
  calculateTints,
  normalizeColorValue,
  getColorFromString,
  getColorType,
  getRGBAFromColor,
  getHEXFromColor,
  getShadeTintColorPercent,
  getFullTintsOrShades,
  generateShadesTints
};
