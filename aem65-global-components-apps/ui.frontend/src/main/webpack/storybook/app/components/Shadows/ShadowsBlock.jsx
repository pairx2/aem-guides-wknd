import React from 'react'
import { getFinalValue } from '../../utils/Common';

const ShadowsBlock = (props) => {
  const {title, data, changedVariables} = props;
  return (
    <div className="stb-shadows__block">
      <h2 className="stb-page-sub-title">{title}</h2>
      <div className="stb-shadows__block-wrap">
        {Object.keys(data).map((key)=>{
          const config = data[key][0].config.default;
          return <div key={key} className="stb-shadows__block-tile">
            <p>{key.replaceAll('-', ' ')}</p>
            <div className="stb-shadows__block-shadow" style={{boxShadow: getFinalValue(config, changedVariables)}}></div>
          </div>
        })}
      </div>
    </div>
  )
}

export default ShadowsBlock;
