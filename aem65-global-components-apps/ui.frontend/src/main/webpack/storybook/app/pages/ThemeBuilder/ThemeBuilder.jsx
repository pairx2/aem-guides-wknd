import React, { useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page';
import ColorSystem from '../../components/ColorSystem'
import Shadows from '../../components/Shadows'
import Typography from '../../components/Typography'
import Spacing from '../../components/Spacing'
import Preview from '../../components/Preview';
import RightRail from '../../components/RightRail/RightRail';
import { AppContext } from '../../context/AppContext';
import { PreviewContext } from '../../context/PreviewContext';
import { App } from '../../constants/App';

const ThemeBuilder = () => {

  /*
    passing the component name and theme id to the right rail as props to reduce the
    re-renders. Rightrail uses memo function to reduce the re-renders
  */
  const { appState } = useContext(AppContext);
  const { previewState, forceUpdate } = useContext(PreviewContext);
  const [reload, setReload] = useState();

  const theme = previewState.newTheme.getTheme();
  const componentName = appState.component ? appState.component.componentName : '';
  const customPageType = appState.component && appState.component.type === 'custom';
  let customPageData;
  let showRightRail = !App.NO_RIGHT_RAIL.includes(componentName);

  const regroupTypographyConfig = () => {
    const data = Object.assign({}, previewState.newTheme.getTypography());
    data.groups = {};
    data.variables.map((item)=>{
      item.type='typography';
      if (item.isBaseStyle) {
        item.config.isBaseStyle = item.isBaseStyle;
      }
      data.groups[item.label.toLowerCase().replace(' ','-')] = {
        'default-state': [item]
      }
    });
    delete data.variables;
    return data;
  }


  if (customPageType) {
    showRightRail = appState.component.showRightRail;
    switch(componentName) {
      case 'Shadows':
        customPageData = previewState.newTheme.getShadows();
        break;
      case 'Typography':
        customPageData = regroupTypographyConfig();
        break;
      case 'Spacing':
        customPageData = previewState.newTheme.getSpacings();
        break;
    }
  }


  const customPages = [
    {
      page: ColorSystem,
      title: 'Color System',
      showRightRail: false
    },
    {
      page: Shadows,
      title: 'Shadows',
      showRightRail: true
    },
    {
      page: Typography,
      title: 'Typography',
      showRightRail: true
    },
    {
      page: Spacing,
      title: 'Spacing',
      showRightRail: true
    }
  ];


  return (
    <Page className="has-right-rail" customPages={customPages} showFooter={true}>
      <Preview
        pageName="Themebuilder"
        hideUtilityBox={!showRightRail}
        className={`stb-u-br-radius stb-u-tr-radius ${customPageType?'custom':''} ${componentName && showRightRail ? '':'no-right-rail'}`}
        themeBuilder={true}
      />


      {componentName && showRightRail && <RightRail
          customPageType={customPageType}
          componentName={componentName.toLowerCase()}
          themeId={theme.themeId}
          themeVariables={previewState.themeVariables}
          large={componentName && componentName === 'Typography'}
          customPageData={customPageData}
          forceContextUpdate={()=>forceUpdate()}
          reload={reload}
        />}
    </Page>
  )
}

export default ThemeBuilder;
