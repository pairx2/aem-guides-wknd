import React, { useContext, useEffect, useState } from 'react';
import { PreviewContext } from '../../../context/PreviewContext';
import { getHEXFromColor, getRGBAFromColor, normalizeColorValue } from '../../../utils/Color-util';
import { getFinalValue } from '../../../utils/Common';
import Color from '../Color';
import Unit from '../Unit';
import './ShadowComposer.scss';

const ShadowComposer = React.memo((props) => {
  const {config, onChange, changedVariables} = props;
  const {previewState} = useContext(PreviewContext);
  const shadowProps = ['x', 'y', 'blur', 'spread'];
  const [shadowVals, setShadowVals] = useState(null)
  const themeGlobals = previewState.newTheme;

  useEffect(()=>{
    const vals = updateComputedValue();
    vals.initial = true;
    setShadowVals(vals);
  },[])

  useEffect(()=>{
    if (shadowVals && !shadowVals.initial) {
      handleChange();
    }
  },[shadowVals])

  const getShadowValues = (value) => {
    const hasInset = value.indexOf('inset') > -1
    value = value.replace(/(inset )/, '');
    value = normalizeColorValue(value);
    const shadowValues = value.split(' ');
    const hasCSSVarColor = value.indexOf('--') > -1;
    const hasBlur = shadowValues.length > 3;
    const hasSpread = shadowValues.length > 4;

    let color, colorKey, rgba, opacity = 1, hex;
    color = shadowValues[shadowValues.length - 1];
    if (!hasCSSVarColor) {
      rgba = getRGBAFromColor(color)
      opacity = rgba.opacity;
      hex = getHEXFromColor(rgba);
      colorKey = hex;
    } else {
      colorKey = shadowValues[shadowValues.length - 1];
      color = themeGlobals.getColorByKey(colorKey);
      rgba = getRGBAFromColor(color);
    }


    return {
      hasInset,
      x: shadowValues[0],
      y: shadowValues[1],
      blur: hasBlur ? shadowValues[2] : 0,
      spread: hasSpread ? shadowValues[3] : 0,
      colorData: rgba,
      colorKey,
      opacity
    }
  }

  const updateComputedValue = () => {
    const value = getFinalValue(config.default, changedVariables);
    const vals = getShadowValues(value);
    return vals;
  }


  const handleColorChange = (key, val, color) => {
    const rgba = getRGBAFromColor(color.value)
    setShadowVals({...shadowVals, colorData:rgba, colorKey: val, initial: false});
  }

  const handleUnitChange = (item, key, val) => {
    setShadowVals({...shadowVals, [item]:val, initial: false});
  }

  const handleChange = () => {
    const sv = shadowVals;
    let clr = '';
    let finalVal;
    const cd = sv.colorData;
    clr = `rgba(${cd.red || 0},${cd.green || 0},${cd.blue || 0},${sv.opacity||1})`
    finalVal = `${sv.hasInset ? 'inset ':''}${sv.x} ${sv.y} ${sv.blur} ${sv.spread} ${clr}`;
    onChange && onChange(config.default.key, finalVal);
  }


  return (
    shadowVals && <div className="stb-shadow-composer">
      <div className="stb-shadow-composer__ele">
        <Color config={{default:{
          key:'dummy',
          value: shadowVals.colorKey
        }}} changedVariables={{}} onChange={handleColorChange}  />
      </div>
      {shadowProps.map((item, idx)=>{
        return <div key={idx} className="stb-shadow-composer__ele">
          <Unit config={{
            default: {
              key:`--${item}`,
              value: shadowVals[item]
            }
          }}  changedVariables={{}} onChange={(key, val)=>handleUnitChange(item, key, val)}  />
          <p>{item}</p>
        </div>
      })}
      <div className="stb-shadow-composer__ele">
          <Unit config={{
            default: {
              key:"--opacity",
              value: shadowVals.opacity
            }
          }} number={true}  changedVariables={{}} onChange={(key, val)=>handleUnitChange('opacity', key, val)}  />
          <p>Opacity</p>
        </div>
    </div>
  )


});

export default ShadowComposer
