import React, { useContext } from 'react';
import { PreviewContext } from '../../context/PreviewContext';
import TypographyBlock from './TypographyBlock';
import './Typography.scss';

const Typography = () => {
  const {previewState} = useContext(PreviewContext);
  const typographyData = previewState.newTheme.getTypography();
  const changedVariables = previewState.themeVariables.getVariablesByComponent('typography')
  const colorData = previewState.newTheme.getColorsDropdownData();

  return (
    <div className="stb-custom-page">
      <h1 className="stb-page-title">Typography</h1>
      {
        typographyData.variables.map((typeData, idx)=>{
          return <TypographyBlock key={idx} data={typeData} colorData={colorData} changedVariables={changedVariables && changedVariables.vars} />
        })
      }
    </div>
  )
}

export default Typography;
