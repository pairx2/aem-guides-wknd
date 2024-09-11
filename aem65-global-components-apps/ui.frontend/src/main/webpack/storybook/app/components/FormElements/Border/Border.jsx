import React, { useState } from 'react';
import { getDefaultActiveView, getBorderValues } from '../../../utils/Common';
import Views from '../../Views';
import Color from '../Color';
import Dropdown from '../Dropdown';
import './Border.scss';

const Border = (props) => {
  const {config, onChange, changedVariables} = props;
  const borderStyles = [
    { key: 'none', value: 'None' },
    { key: 'hidden', value: 'Hidden' },
    { key: 'dotted', value: 'Dotted' },
    { key: 'dashed', value: 'Dashed' },
    { key: 'solid', value: 'Solid' },
    { key: 'double', value: 'Double' },
    { key: 'groove', value: 'Groove' },
    { key: 'ridge', value: 'Ridge' },
    { key: 'inset', value: 'Inset' },
    { key: 'outset', value: 'Outset' }
  ];

  const [border, setBorder] = useState({
    default: config.default ? getBorderValues(config.default, changedVariables) : '',
    mobile: config.mobile ? getBorderValues(config.mobile, changedVariables) : '',
    tablet: config.tablet ? getBorderValues(config.tablet, changedVariables) : ''
  });
  const [activeView, setActiveView] = useState(getDefaultActiveView(config));

  const handleTextChange = (e) => {
    const vals = Object.assign({}, border);
    vals[activeView].width = e.target.value;
    setBorder(vals);
    handleOnChange();
  }

  const handleColorChange = (key, val) => {
    const vals = Object.assign({}, border);
    vals[activeView].color = val;
    setBorder(vals);
    handleOnChange();
  }

  const handleStyleChange = (style) => {
    const vals = Object.assign({}, border);
    vals[activeView].style = style;
    setBorder(vals);
    handleOnChange();
  }

  const handleOnChange = () => {
    const vals = border[activeView];
    onChange && onChange(config[activeView].key, `${vals.width} ${vals.style} ${vals.color}`);
  }

  return (
    <div className="stb-border">
      {config.isResponsive && <Views
        onChange={(view)=>setActiveView(view)}
        defaultActiveView={activeView}
        disableDesktop={!config.default}
        disableMobile={!config.mobile}
        disableTablet={!config.tablet}
      />}
      <div className="stb-border__color-box"><Color config={{default:{key:'--abc', value:border[activeView].color}}} changedVariables={{}} onChange={handleColorChange} /></div>
      <div className="stb-border__input-box">
        <input
          className="stb-unit__input"
          value={border[activeView].width}
          onChange={(e)=>handleTextChange(e)}
        />
      </div>
      <div className="stb-border__style-box">
        <Dropdown options={borderStyles} selected={border[activeView].style} onChange={handleStyleChange} />
      </div>
    </div>
  )
}

export default Border;
