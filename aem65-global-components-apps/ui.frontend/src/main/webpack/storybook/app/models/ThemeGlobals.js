import LZString from "lz-string";
import { App } from "../constants/App";
import { getFinalValue, isLocalhost, objectValueFromPath } from "../utils/Common";

let themeGlobalsObj = {
  name: null,
  isImported: false,
  themeId: null,
  config: {
    typography: null,
    spacings: null,
    shadows: null,
    colors: null
  }
};

let colorsDropdownObj = [];

let shadowsDropdownObj = [];

let hasChanged = new Date();

const hasTheme = () => {
  return themeGlobalsObj && themeGlobalsObj.name !== null;
}

const setThemeName = (themeName) => {
  themeGlobalsObj.name = themeName;
  saveToLocalStorage();
}

const getTheme = () => {
  if (!hasTheme()) {
    return null
  }
  return {
    name: themeGlobalsObj.name,
    isImported: themeGlobalsObj.isImported,
    themeId: themeGlobalsObj.themeId,
    src: themeGlobalsObj.src,
    brandColors: getMainBrandColors()

  }
}

const addNewBrandColor = (newVariant) => {
  const colors = getColors();
  if (colors['_brand-colors']['variants']) {
    colors['_brand-colors']['variants'].push(newVariant);
  }
  saveToLocalStorage();
}

const updateNewBrandColor = (oldName, newName) => {
  const colors = getColors();
  const variants = colors['_brand-colors']['variants'];
  if (variants) {
    const idx = variants.findIndex((color)=>color.label===oldName);
    if (idx > -1) {
      const variant = variants[idx];
      variant.label = newName;
      variant.key = `--${newName}-color`;
      variant.options.map((option)=>{
        const shadeNum = option.isShade ? 100 + option.config : option.config
        option.key =  `--${newName}-${shadeNum}-color`;
        option.label = `${newName}-${shadeNum}`
      })
    }
  }
  updateColorsDropdownData();
  saveToLocalStorage();
}

const removeNewBrandColor = (colorLabel) => {
  const colors = getColors();
  const variants = colors['_brand-colors']['variants'];
  if (variants) {
    const idx = variants.findIndex((color)=>color.label===colorLabel);
    if (idx > -1) {
      variants.splice(idx, 1);
    }
  }
  updateColorsDropdownData();
  saveToLocalStorage();
}

const getMainBrandColors = () => {
  let colors = getColors();
  if (!colors) {
    return;
  }
  colors = colors['_brand-colors'].variants
  const topColors = {
  }

  colors.map((color)=>{
    topColors[color.key] = color.value;
  });

  return topColors;

}

const getColors = () => {
  return themeGlobalsObj.config.colors;
}

const getTypography = () => {
  return themeGlobalsObj.config.typography;
}

const getShadows = () => {
  return themeGlobalsObj.config.shadows;
}

const getSpacings = () => {
  return themeGlobalsObj.config.spacings;
}

const getColorsDropdownData = () => {
  return colorsDropdownObj;
}

const getShadowsDropdownData = () => {
  return shadowsDropdownObj;
}

const addTypographyVariant = (configKey, variant) => {
  const typography = getTypography()
  typography.variables.map((item)=>{
    if (item.config.configkey === configKey) {
      const variants = item.config.default.variants;
      if (!variants) {
        item.config.default.variants = []
      }
      item.config.default.variants.push(variant);
    }
  });

  saveToLocalStorage();
}

const updateTypographyVariant = (configKey, variantKey, color) => {
  const typography = getTypography()
  typography.variables.map((item)=>{
    if (item.config.configkey === configKey) {
      const variants = item.config.default.variants;
      if (variants) {
        const found = variants.find((variant)=>variant.key === variantKey);
        if (found) {
          found.value = color;
        }
      }
    }
  });

  saveToLocalStorage();
}

const removeTypographyVariant = (configKey, variantKey) => {
  const typography = getTypography()
  typography.variables.map((item)=>{
    if (item.config.configkey === configKey) {
      const variants = item.config.default.variants;
      if (variants) {
        variants.splice(variants.findIndex(a => a.key === variantKey), 1);
      }
    }
  });
  saveToLocalStorage();
}


const updateColorsDropdownData = (changedVariables={}) => {
  const colors = getColors();
  const globalColorObj = {
    'key': '--transparent-color',
    'label': 'transparent',
    'value': 'transparent',
    'group': 'global'
  };

  if (!colors) {
    return;
  }
  colorsDropdownObj.splice(0, colorsDropdownObj.length);
  colorsDropdownObj.push(globalColorObj);

  Object.keys(colors).map((key)=>{
    const colorType = colors[key];
    let groupName = 'Brand Colors';
    if(key.indexOf('gray')>-1) {
      groupName = 'Grayscale Color';
    } else if(key.indexOf('status') > -1) {
      groupName = 'Status Color';
    }

    const colorObj = colorType.variants instanceof Array ? colorType.variants : colorType.variants.options

    colorObj.map((variant)=>{

      colorsDropdownObj.push({
        key: variant.key,
        label: variant.label.toLowerCase(),
        value: getFinalValue(variant, changedVariables),
        group: groupName
      });

      if (variant.options) {
        variant.options.map((option)=>{
          colorsDropdownObj.push({
            key: option.key,
            label: option.label.toLowerCase(),
            value: getFinalValue(option, changedVariables),
            group: groupName
          });
        });
      }
    });
  });

}

const updateShadowsDropdownData = () => {
  let shadows = getShadows();
  const shadowsGlobalObj =  {
    'key': '--shadow-none',
    'label': 'None',
    'group': 'Global',
    'value': 'none'
  };

  if (!shadows) {
    return;
  }

  shadowsDropdownObj.splice(0, shadowsDropdownObj.length);
  shadowsDropdownObj.push(shadowsGlobalObj);

  shadows = shadows['groups'];

  ['shadows', 'inner-shadows','glows'].map((item)=>{
    const shadowItem = shadows[item];
    Object.keys(shadowItem).map((shadowItemKey)=>{
      const shadowData = shadowItem[shadowItemKey][0].config.default;
      shadowsDropdownObj.push({
        value: shadowData.value,
        key: shadowData.key,
        label: shadowItemKey,
        group: item
      });
    })
  });


}

const updateDropdownsData = () => {
  updateColorsDropdownData();
  updateShadowsDropdownData();
}

const loadThemeFromLocalStorage = () => {
  const data = localStorage.getItem(App.THEME_GLOBALS_KEY);
  if (data) {
    try {
      themeGlobalsObj = JSON.parse(LZString.decompress(data));
      updateDropdownsData();
    } catch(e) {
      console.log(e);
    }
  }
}

const saveToLocalStorage = () => {
   //storing the compressed data to save space
   try {
    const themeDataString = JSON.stringify(themeGlobalsObj);
    localStorage.setItem(App.THEME_GLOBALS_KEY, LZString.compress(themeDataString));
  } catch(e) {
    console.log(e);
  }
}

const setup = (themeData) => {

  const mandatoryFields = [
    'name',
    'themeId',
    'config.typography',
    'config.colors',
    'config.shadows',
    'config.spacings',
  ];

  /*
  Assign values from themedata to local object
  for object verification
  */

  const pathPrefix = isLocalhost() ? App.LOCALHOST_API_URL : '';
  const themeObj = {
    name: themeData.name,
    isImported: themeData.isImported,
    themeId: themeData.themeId,
    src: themeData.isImported ? `/imported-css/${themeData.themeId}.css` : `/clientlib-${themeData.themeId}/${themeData.themeId}.css`,
    config: {
      typography: themeData.data['_typography'],
      colors: themeData.data['_color-system'],
      shadows: themeData.data['_shadows'],
      spacings: themeData.data['_spacings'],
    }
  };

  /*
  Checking if any mandatory fields are missing from
  final themeObj
  */
  const missingData = mandatoryFields.some((path)=>{
    const data = objectValueFromPath(themeObj, path)
    if (!data) {
      return;
    }
  })

  /*
  if mandatory fields are available, create the copy
  of the object, save the compressed version of the object
  in local storage
  */
  if (!missingData) {
    // creating a deep copy of the object
    const themeDataString = JSON.stringify(themeObj);
    themeGlobalsObj = JSON.parse(themeDataString);
    saveToLocalStorage();
    updateDropdownsData();
  }

}

const clear = ()=>{
  localStorage.removeItem(App.THEME_GLOBALS_KEY);
  themeGlobalsObj = {
    name: null,
    isImported: false,
    themeId: null,
    config: {
      typography: null,
      spacings: null,
      shadows: null,
      colors: null
    }
  };
}


const getColorByKey = (key) => {
  if (typeof key !== 'string') {
    return;
  }
  const colorsData = getColorsDropdownData();
  if (colorsData) {
    return colorsData.find((color)=>{return key.indexOf(color.key.toLowerCase())})
  }
}

const getColorByValue = (value) => {
  if (typeof key !== 'string') {
    return;
  }
  const colorsData = getColorsDropdownData();
  if (colorsData) {
    return colorsData.find((color)=>{return value.indexOf(color.value)})
  }

}


//Load the theme from localstorage on init
loadThemeFromLocalStorage();

export default {
  hasTheme,
  getTheme,
  setThemeName,
  setup,
  hasChanged,
  getColors,
  getShadows,
  getTypography,
  getSpacings,
  getMainBrandColors,
  getColorsDropdownData,
  getShadowsDropdownData,
  addTypographyVariant,
  removeTypographyVariant,
  updateTypographyVariant,
  getColorByKey,
  getColorByValue,
  clear,
  updateColorsDropdownData,
  updateNewBrandColor,
  addNewBrandColor,
  removeNewBrandColor
}


