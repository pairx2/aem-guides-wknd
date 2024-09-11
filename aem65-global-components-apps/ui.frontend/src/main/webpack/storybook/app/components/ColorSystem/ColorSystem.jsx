import React, { useContext, useState } from 'react';
import { deepObjectCopy, getCSSRuleFromTheme, getFinalValue } from '../../utils/Common';
import { generateShadesTints } from '../../utils/Color-util';
import { PreviewContext } from '../../context/PreviewContext';
import ColorBox from '../ColorBox';
import Button from '../Button';
import ColorBlock from './ColorBlock';
import AddBrandColorModal from '../Modals/AddBrandColorModal';
import RenameBrandColorModal from '../Modals/RenameBrandColorModal';
import './ColorSystem.scss';

const ColorSystem = () => {

  const { previewState } = useContext(PreviewContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [editColorName, setEditColorName] = useState('');
  const [dummyState, setDummyState] = useState('');
  const sysColors = previewState.newTheme.getColors();
  const brandColors = sysColors['_brand-colors'].variants;
  const grayscaleColors = sysColors['_grayscale-colors'].variants.options;
  const statusColors = sysColors['_status-colors'].variants;
  const themeVariables = previewState.themeVariables;
  const themeGlobals = previewState.newTheme;
  const shadeTintConfigStatusColors = [
    {
      isShade: false,
      title: 'Tints',
      options: [10]
    },
    {
      isShade: true,
      title: 'Shades',
      options: [10]
    }
  ]


  const shadeTintConfigNewColors = [
    {
      isShade: false,
      title: 'Tints',
      options: [25,50,75]
    },
    {
      isShade: true,
      title: 'Shades',
      options: [10]
    }
  ]
  const getChangedVariables = () => {
    let cvars =  themeVariables.getVariablesByComponent('color-system');
    return cvars ? cvars.vars : {};
  }

  const cssRule = getCSSRuleFromTheme(':root','--primary-color');
  const changedVariables = getChangedVariables();


  const handleOnColorChange = (changedColorObj) => {
    Object.keys(changedColorObj).map((key)=>{
      if (cssRule) {
        const val = changedColorObj[key];
        cssRule.style.setProperty(key, val);
      }
    })
    themeVariables.setThemeVariables('color-system', ':root', changedColorObj)
    themeGlobals.updateColorsDropdownData(getChangedVariables());
  }

  const handleBrandColorAdd = (newColorObj) => {

    setShowAddModal(false);

    const newColorKey = `--${newColorObj.label}-color`;
    const shadeTintsObj = generateShadesTints(
      newColorObj.color,
      newColorObj.label,
      shadeTintConfigNewColors
    );

    themeGlobals.addNewBrandColor({
      label: newColorObj.label,
      value: newColorObj.color,
      key: newColorKey,
      options: shadeTintsObj.shadeTints,
      isNotBaseColor: true
    });

    const vars = shadeTintsObj.shadeTintsVars;
    vars[newColorKey] = newColorObj.color;

    if (cssRule) {
      Object.keys(vars).map((varKey)=>{
        cssRule.style.setProperty(varKey, vars[varKey])
      });
    }
    themeGlobals.updateColorsDropdownData(vars);
    themeVariables.setThemeVariables('color-system', ':root', vars)

  }

  const getColorVariableKeys  = (label) => {
    let keys = [`--${label}-color`];
    shadeTintConfigNewColors.map((item)=>{
      item.options.map((option)=>{
        keys.push(`--${label}-${item.isShade ? 100+option : option}-color`);
      })
    })
    return keys;
  }

  const handleColorRemove = (label) => {
    themeGlobals.removeNewBrandColor(label);

    //Delete the color variables for theme variables
    themeVariables.deleteComponentVariables('color-system', getColorVariableKeys(label));

    //update the dummy state to refresh the state
    setDummyState(new Date());
  }

  const handleBrandColorRename = (oldLabel, newLabel) => {
    setShowRenameModal(false);
    themeGlobals.updateNewBrandColor(oldLabel, newLabel);
    const updatedVars = themeVariables.renameVariables(oldLabel, newLabel);
    const oldKeys = getColorVariableKeys(oldLabel);
    const newKeys = getColorVariableKeys(newLabel);

    if (cssRule) {
      oldKeys.map((oldKey, idx)=>{
        cssRule.style.setProperty(newKeys[idx], cssRule.style.getPropertyValue(oldKey))
      });
      // Update the component variable changes to the css
      // ex: .a-button{--button-bg-color: var(<oldKey>)}
      // the old key has to be updated to new key on the css
      Object.keys(updatedVars).map((compKey)=>{
        const comp = updatedVars[compKey];
        const compVar = comp.vars;
        let tempCssRule;
        if (comp.selector === ':root') {
          const firstKey = Object.keys(compVar)[0];
          tempCssRule = getCSSRuleFromTheme(':root', firstKey)
        } else {
          tempCssRule = getCSSRuleFromTheme(comp.selector);
        }
        if (tempCssRule) {
          Object.keys(compVar).map((varKey)=>{
            tempCssRule.style.setProperty(varKey, compVar[varKey]);
          })
        }
      })
    }
    themeGlobals.updateColorsDropdownData(getChangedVariables());
    setDummyState(new Date());
  }


  const handleEditClick = (label) => {
    setEditColorName(label);
    setTimeout(()=>{
      setShowRenameModal(true);
    }, 100)
  }

  const renderBrandColors = (colors) => {
    return (
      <>
        <h2 className="stb-page-sub-title">Brand Colors</h2>
        {colors.map((color,idx)=>{
          return (
            <ColorBlock onEdit={handleEditClick} onRemove={handleColorRemove} onChange={handleOnColorChange} key={color.label+idx} colorObject={deepObjectCopy(color)} changedVariables={changedVariables} />
          );
        })}
        <div className="stb-button-wrapper">
          <Button label='Add Brand Color' onClick={()=>setShowAddModal(true)} secondary={true} size="small" />
        </div>
      </>
    );
  }

  const renderGrayscaleColors = (colors) => {
    return(
      <>
        <h2 className="stb-page-sub-title">Grayscale Colors</h2>
        <div className="gray-color-boxes">
          {colors.map((color,idx)=>{
            return (
                <ColorBox
                  onChange={(key, val)=>handleOnColorChange({[key]:val})}
                  onReset={(key, val)=>handleOnColorChange({[key]:val})}
                  readonly={idx===0 || idx===colors.length-1}
                  key={'cb'+color.label+idx}
                  varKey={color.key}
                  originalColor={color.value}
                  color={getFinalValue(color, changedVariables)}
                  label={color.label}
                />
            );
          })}
        </div>
      </>
    );
  }



  const renderStatusColors = (colors) => {
    return(
      <>
        <h2 className="stb-page-sub-title">Status Colors</h2>
        <div className="gray-color-boxes">
          {colors.map((color, idx)=>{
              return <ColorBlock onChange={handleOnColorChange} key={color.label+idx}  colorObject={deepObjectCopy(color)} shadeTintConfig={shadeTintConfigStatusColors} changedVariables={changedVariables} />
            })
          }
        </div>
      </>
    );
  }



  return (
    <>
      <div className="stb-custom-page color-system">
        <h1 className="stb-page-title ">Color System</h1>
        <hr size="1" />
        {renderBrandColors(brandColors)}
        <hr size="1" />
        {renderGrayscaleColors(grayscaleColors)}
        <hr size="1" />
        {renderStatusColors(statusColors)}
        {showAddModal && <AddBrandColorModal
          show={showAddModal}
          onAdd={handleBrandColorAdd}
          onCancel={()=>setShowAddModal(false)}
          onClose={()=>setShowAddModal(false)}
          colorsData={themeGlobals.getColorsDropdownData()}
        />}

      {showRenameModal && <RenameBrandColorModal
        show={showRenameModal}
        colorName={editColorName}
        onChange={handleBrandColorRename}
        onCancel={()=>setShowRenameModal(false)}
        onClose={()=>setShowRenameModal(false)}
        colorsData={themeGlobals.getColorsDropdownData()}
      />}

      </div>
    </>
  )
}

export default ColorSystem;
