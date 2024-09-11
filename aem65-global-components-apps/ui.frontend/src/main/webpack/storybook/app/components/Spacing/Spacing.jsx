import React, { useContext } from 'react'
import {PreviewContext} from '../../context/PreviewContext';
import SpacingsBlock from './SpacingsBlock';
import './Spacing.scss';
import { getFinalValue } from '../../utils/Common';

const Spacing = () => {

  const  { previewState } = useContext(PreviewContext);
  const spacings = previewState.newTheme.getSpacings();
  let changedVariables = previewState.themeVariables.getVariablesByComponent('spacing');
  changedVariables = changedVariables ? changedVariables.vars : {};
  const spacingsData = spacings.variables[0].config.default;
  const top = spacingsData ? getFinalValue(spacingsData.top, changedVariables) : 0;
  const bottom = spacingsData ? getFinalValue(spacingsData.bottom, changedVariables) : 0;

  return (
    <div className="stb-custom-page spacings">
			<h1 className="stb-page-title">Spacing</h1>
      <hr size="1" />
			<div className="container-fluid">
        <div className="spacing-wrapper">
          <p>Move your mouse on the content blocks below for more explanation on the spacing</p>
          <SpacingsBlock top={top} bottom={bottom} />
          <SpacingsBlock top={top} bottom={bottom} />
          <SpacingsBlock top={top} bottom={bottom} />
        </div>
			</div>
		</div>
  )
}

export default Spacing;
