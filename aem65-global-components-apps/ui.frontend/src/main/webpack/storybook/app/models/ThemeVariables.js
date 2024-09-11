import { App } from "../constants/App";
/**
 * This model will maintain the modified component theme variables
 */

/**
 * example themeVariables object:
 *  {
 *     <componentName>:{
 *          "selector": ".a-badges",
 *           "vars": {
 *              "--badge-bg-color": "var(--secondary-color)"
 *           }
 *     }
 *  }
 */
let themeVariables = {}


const setThemeVariable = (componentName, selector, varKey, value) => {
  if (!themeVariables[componentName]) {
    themeVariables[componentName] = {
      selector,
      vars: {
        [varKey] : value
      }
    }
  } else {
    themeVariables[componentName].vars[varKey] = value;
  }
  saveToLocalStorage();
}


const setThemeVariables = (componentName, selector, varsObj) => {
  if (!themeVariables[componentName]) {
    themeVariables[componentName] = {
      selector,
      vars: varsObj
    }
  } else {
    const vars = themeVariables[componentName].vars;
    themeVariables[componentName].vars = {...vars, ...varsObj}
  }
  saveToLocalStorage();
}

const getVariablesByComponent = (component) => {
  return themeVariables[component];
}

const getVariablesByVarKey = (component, varKey) => {
  if(themeVariables[component]) {
    return themeVariables[component].vars[varKey]
  }
}

const deleteComponentVariables = (component, keysArr) => {

  if (keysArr) {
    let comp = getVariablesByComponent(component)
    comp = comp && comp.vars
    if (comp) {
      keysArr.map((key)=>{
        delete comp[key];
      })
    }
  }

  saveToLocalStorage();

}


const renameVariables = (oldName, newName) => {
  let comp = themeVariables;
  if (comp) {
    let compStr = JSON.stringify(comp);
    compStr = compStr.replaceAll(`--${oldName}`, `--${newName}`)
    themeVariables = JSON.parse(compStr);
  }
  saveToLocalStorage();
  return getMatchedVariablesWithNewName(`--${newName}`)

}

const getMatchedVariablesWithNewName = (newName) => {
  const final = {};
  Object.keys(themeVariables).map((compName)=>{
    const component = themeVariables[compName];
    const componentVars = component.vars;
    if (componentVars) {
      Object.keys(componentVars).map((varName)=>{
        const compVar = componentVars[varName];
          if (compVar.indexOf(newName) > -1) {
            if (!final[compName]) {
              final[compName] = {
                selector: component.selector,
                vars: {}
              }
            }
            final[compName].vars[varName] = compVar;
          }
      })
    }
  })
  return final;
}


const getAllVariables = () => {
  return themeVariables;
}

const saveToLocalStorage = () => {
  try{
    localStorage.setItem(App.THEME_VARIABLES_KEY, JSON.stringify(themeVariables));
  } catch(e) {

  }
}

const loadFromLocalStorage = () => {
  const dataStr = localStorage.getItem(App.THEME_VARIABLES_KEY);
  if (dataStr) {
    try {
      themeVariables = JSON.parse(dataStr);
    } catch(e) {
      //do nothing
    }
  }
}

const getExportData = () => {
  const final = {};
  Object.keys(themeVariables).map((themeVarKey)=>{
    final[`_${themeVarKey}`] = themeVariables[themeVarKey].vars
  })
  return final;
}

const clear = ()=>{
  localStorage.removeItem(App.THEME_VARIABLES_KEY);
  themeVariables = {};
}

loadFromLocalStorage();

export default {
  setThemeVariable,
  setThemeVariables,
  getVariablesByComponent,
  getVariablesByVarKey,
  getAllVariables,
  clear,
  deleteComponentVariables,
  renameVariables,
  getExportData
}
