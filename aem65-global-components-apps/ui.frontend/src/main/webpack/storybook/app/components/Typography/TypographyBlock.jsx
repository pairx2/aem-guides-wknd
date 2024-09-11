import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ToggleSwitch from '../FormElements/ToggleSwitch';
import Dropdown from '../FormElements/Dropdown';
import { getFinalValue } from '../../utils/Common';

const TypographyBlock = (props) => {
  const {data, colorData, changedVariables} = props;
  const configData = data.config;
  const Tag = configData.tag;
  const styleData = configData.default;
  const [darkMode, setDarkMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState();

  const styles = {};

  const getColorValueByKey = (key) => {
    const found = colorData.find((color)=>key.indexOf(color.key) > -1);
    if (found) {
      return found.value;
    }
    return '#f00';
  }

  Object.keys(styleData).map((key)=>{
    styles[key] = getFinalValue(styleData[key], changedVariables);
    if (key === 'color' && styles[key].indexOf('--') > -1) {
      styles[key] = getColorValueByKey(styles[key]);
    }
  })

  if (selectedVariant) {
    const variant  = configData.default.variants.find(variant => variant.colorName === selectedVariant);
    if (variant) {
      styles.color =  getColorValueByKey(variant.value);
    }
  }

  return (
    <div className="stb-typography__block">
      <div className="stb-typography__block-head">
        <h2 className="stb-page-sub-title">{data.label}</h2>
        {!data.isBaseStyle && <div className="stb-typography__block-switch">
          {configData.default.variants && configData.default.variants.length > 0 && <Dropdown onChange={(value)=>setSelectedVariant(value)} selected={selectedVariant} labelKey='colorName' valueKey='colorName' options={[{key:'default', colorName:'Default', value: configData.default.color.value}, ...configData.default.variants]} />}
          <ToggleSwitch onChange={(checked)=>setDarkMode(checked)} />
        </div>}
      </div>
      {data.isBaseStyle && <h4 className="stb-page-child-title">Base Style</h4>}
      <Tag contentEditable={true} suppressContentEditableWarning={true} className={`stb-typography__block-content ${darkMode?'dark':''}`} style={{...styles}}>
        {!data.isBaseStyle && 'Lorem Ipsum Dolor Sit Ame'}
        {data.isBaseStyle && 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis tempor diam. Vivamus semper fermentum tempus. Proin sollicitudin ligula eu velit vestibulum, et egestas augue molestie. Nulla finibus condimentum volutpat. Maecenas suscipit molestie mi, in blandit lectus ornare sit amet. Donec nisl mi, bibendum eget ornare et, tristique sit amet arcu. Donec tortor augue, facilisis vitae aliquam id, euismod ac erat. In hac habitasse platea dictumst.'}
      </Tag>
    </div>
  )
}

TypographyBlock.propTypes = {
  data: PropTypes.object
}


export default TypographyBlock
