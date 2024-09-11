import React, { useContext } from 'react'
import { PreviewContext } from '../../context/PreviewContext';
import './Shadows.scss';
import ShadowsBlock from './ShadowsBlock';
const Shadows = () => {
  const {previewState} = useContext(PreviewContext);
  const shadowsData = previewState.newTheme.getShadows();
  let changedVariables = previewState.themeVariables.getVariablesByComponent('shadows');
  changedVariables = changedVariables ? changedVariables.vars : {}

  return (
    <div className="stb-custom-page">
      <h1 className="stb-page-title">Shadows</h1>
      {
        ['inner-shadows', 'shadows', 'glows'].map((item)=>{
          return <ShadowsBlock key={item} title={item.replace('-', ' ')} data={shadowsData.groups[item]} changedVariables={changedVariables} />
        })
      }
    </div>
  )
}

export default Shadows;
