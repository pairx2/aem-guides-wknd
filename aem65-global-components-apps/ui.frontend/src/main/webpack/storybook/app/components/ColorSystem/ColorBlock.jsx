import React, {  useState } from 'react'
import ColorBox from '../ColorBox'
import {generateShadesTints, getFullTintsOrShades} from '../../utils/Color-util';
import { App } from '../../constants/App';
import { getFinalValue } from '../../utils/Common';

const ColorBlock = (props) => {
  const {colorObject, onChange, changedVariables, onRemove, onEdit} = props
  const defConfig = [
    {
      isShade: false,
      title: 'Tints',
      options: props.tintOptions ? props.tintOptions : App.TINT_OPTIONS
    },
    {
      isShade: true,
      title: 'Shades',
      options: props.shadeOptions ? props.shadeOptions : App.SHADE_OPTIONS
    }
  ];
  let {shadeTintConfig} = props;
  shadeTintConfig = shadeTintConfig || defConfig;

  const finalColor = getFinalValue(colorObject, changedVariables);

  const [color, setColor] = useState(finalColor)
  const [selectedOptions, setSelectedOptions] = useState(()=>{
    if (finalColor !== colorObject.value) {
      return generateShadesTints(color, colorObject.label, shadeTintConfig).shadeTints
    } else {
      return colorObject.options
    }
  });
  const [multiShadeTints, setMultiShadeTints] = useState(getFullTintsOrShades(color))


  const handleMainColorChange = (key, selColor) => {
    const shadeTintsData = generateShadesTints(selColor, colorObject.label, shadeTintConfig);
    setColor(selColor);
    setSelectedOptions(shadeTintsData.shadeTints);
    setMultiShadeTints(getFullTintsOrShades(selColor));
    onChange && onChange({...shadeTintsData.shadeTintsVars, [colorObject.key]:selColor})
  }


  const handleMainReset = () => {
    setColor(colorObject.value);
    setSelectedOptions(colorObject.options);
    setMultiShadeTints(getFullTintsOrShades(colorObject.value));
    const vars = getVarsFromDefaultOptions(colorObject.options);
    onChange && onChange(vars)
  }

  const getVarsFromDefaultOptions = (options) => {
    const varsObj = {}
    options.map((option)=>{
      varsObj[option.key] = option.value;
    })
    varsObj[colorObject.key] = colorObject.value;

    return varsObj;
  }

  const handleTintShadeChange = (key, val) => {
    onChange && onChange({[key]: val});
  }

  const handleTintShadeReset = (key, val) => {
    onChange && onChange({[key]: val});
  }


  return (
    <div className="color-system-block">
      <ColorBox
        varKey={colorObject.key}
        originalColor={colorObject.value}
        color={color}
        label={colorObject.label}
        isMainColor={true}
        isNew={colorObject.isNew || colorObject.isCustom || colorObject.isNotBaseColor}
        onReset={handleMainReset}
        onChange={handleMainColorChange}
        onRemove={onRemove}
        onEdit={onEdit}
      />
      <div className="color-shades">
        <div className="color-shades__wrap">
          {selectedOptions && selectedOptions.map((option, idx)=>{
            return <div className="color-shades__ele" key={option.label}>
              <p className="color-shades__title">{option.isShade ? 'Shades' : 'Tints'}</p>
              <ColorBox
                onChange={handleTintShadeChange}
                onReset={handleTintShadeReset}
                changedVariables={changedVariables}
                shadeTintPickerData={multiShadeTints}
                isShade={option.isShade}
                varKey={option.key}
                originalColor={option.value}
                color={getFinalValue(option, changedVariables)}
                label={option.label}
              />
            </div>
          })}
        </div>
      </div>


    </div>
  )
}

export default ColorBlock
