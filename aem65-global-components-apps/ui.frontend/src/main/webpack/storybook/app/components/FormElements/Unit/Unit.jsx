import React, { useState } from 'react';
import { getDefaultActiveView, getFinalValue } from '../../../utils/Common';
import Views from '../../Views';
import './Unit.scss';

const Unit = (props) => {
  const {config, onChange, changedVariables, number} = props;
  const [text, setText] = useState({
    default: config.default ? getFinalValue(config.default, changedVariables) : '',
    mobile: config.mobile ? getFinalValue(config.mobile, changedVariables) : '',
    tablet: config.tablet ? getFinalValue(config.tablet, changedVariables) : ''
  });

  const [activeView, setActiveView] = useState(getDefaultActiveView(config));

  const handleTextChange = (e) => {
    setText({...text, [activeView]:e.target.value});
    onChange && onChange(config[activeView].key, e.target.value);
  }

  return (
    <div className="stb-unit">
        {config.isResponsive && <Views
          onChange={(view)=>setActiveView(view)}
          defaultActiveView={activeView}
          disableDesktop={!config.default}
          disableMobile={!config.mobile}
          disableTablet={!config.tablet}
        />}
        <input
          className="stb-unit__input"
          type={number? 'number' : 'text'}
          value={text[activeView]}
          onChange={(e)=>handleTextChange(e)}
        />
    </div>
  )
}

export default Unit;
