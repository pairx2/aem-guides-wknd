import React, { useState } from 'react';
import { getDefaultActiveView, getTRBLValues } from '../../../utils/Common';
import Views from '../../Views';
import './TRBL.scss';

const TRBL = (props) => {
  const {config, onChange, changedVariables} = props;

  const isMultiVariable = config.isMultiVariable;
  const isXY = config.isXY;
  const isBorderRadius = config.isBorderRadius;

  const [activeView, setActiveView] = useState(getDefaultActiveView(config));
  const [trblValues, setTrblValues] = useState({
    default: config.default && getTRBLValues(config.default, isMultiVariable || isXY, changedVariables),
    mobile: config.mobile && getTRBLValues(config.mobile, isMultiVariable || isXY, changedVariables),
    tablet: config.tablet && getTRBLValues(config.tablet, isMultiVariable || isXY, changedVariables)
  });

  const defLabels = {
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left'
  }

  const xyLabels = {
    top: 'Top & Bottom',
    bottom: 'Top & Bottom',
    left: 'Left & Right',
    right: 'Left & Right'
  };

  const borderRadiusLabels = {
    top: 'Top\nLeft',
    right: 'Top\nRight',
    bottom: 'Bottom\nRight',
    left: 'Bottom\nLeft'
  }

  let labels = defLabels;

  if (isXY) {
    labels = xyLabels
  } else if(isBorderRadius) {
    labels = borderRadiusLabels;
  }


  const handleInputChange = (e, position, key) => {
    const obj = Object.assign({}, trblValues);
    obj[activeView][position] = e.target.value;
    setTrblValues(obj);

    if (isXY || isMultiVariable) {
      onChange && onChange(key, e.target.value);
    } else {
      const data = obj[activeView];
      const vals = `${data.top} ${data.right} ${data.bottom} ${data.left}`;
      onChange && onChange(key, vals);
    }

  }


  const renderElements = () => {
    let placements = ['top','right','bottom','left'];
    const data = trblValues[activeView];

    if (isXY) {
      placements = ['top', 'right'];
    } else if(isBorderRadius) {
      placements = ['top', 'right','left','bottom'];
    } else if (isMultiVariable) {
      if (data.left && data.right && !data.top && !data.bottom) {
        placements = ['left','right']
      }
    }

    return <>
      {placements.map((position,idx)=>{
        const val = data[position];
        const confData = config[activeView];
        const show = isMultiVariable || isXY ? confData.hasOwnProperty(position) : true;
        if (show) {
          const key = isMultiVariable || isXY ? confData[position].key : confData.key;
          return getInputElement(position, val, key, idx);
        }
      })}
    </>
  }

  const getInputElement = (position, value, key, idx) => {
    return(
      <div className="box" key={`${key}-${idx}`}>
        <label>
          <span>{labels[position]}</span>
          <input
            className="ab-input"
            onChange={e => handleInputChange(e, position, key)}
            value={value}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="stb-trbl">
      {config.isResponsive && <Views
        onChange={(view)=>setActiveView(view)}
        defaultActiveView={activeView}
        disableDesktop={!config.default}
        disableMobile={!config.mobile}
        disableTablet={!config.tablet}
      />}
      {renderElements()}
    </div>
  )
}

export default TRBL;
