import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import { PreviewContext } from '../../context/PreviewContext';
import { getCSSRuleFromTheme } from '../../utils/Common';
import { View } from '../../constants/View';
import TopNav from '../TopNav';
import UtilityBox from '../UtilityBox/UtilityBox';
import DOMUtils from '../../utils/DOM';
import './Preview.scss';

const Preview = React.memo((props) => {
  const {className, themeBuilder, hideUtilityBox} = props;
  const deviceSizes = {
    [View.MOBILE]: {
      width: 445,
      height: 875
    },
    [View.TABLET]: {
      width: 862,
      height: 1222
    }
  }
  const iframeRef = useRef();
  const {appState} = useContext(AppContext)
  const {previewState, setView} = useContext(PreviewContext)
  const [fitToWindow, setFitToWindow] = useState(true);
  const [customPage, setCustomPage] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [iframeState, setIframeState] = useState({
      zoom: 100,
      view: {
        type: View.DESKTOP,
        isLandscape: false
      }
  });
  const themeGlobals = previewState.newTheme;
  const themeVariables = previewState.themeVariables;

  /*
  Triggers when a different component is selected in the list
  */
  useEffect(()=> {

    if (appState.component) {
      const type = appState.component.type
      if (type !== 'custom') {
        refreshIframe();
      } else {
        setView({
          type: View.DESKTOP,
          isLandscape: false
        });
      }

      setCustomPage(type === 'custom');
      if (appState.component || type) {
        setLoaded(true);
      }
    }
  }, [appState.component]);


  /*
  Triggers when knobs are changed for the component
  */
  useEffect(()=> {
    if (previewState.knobsets.length > 0) {
      refreshIframe(previewState.knobsets);
    }
  }, [previewState.knobsets]);


  /*
  Triggers when theme is changed from the dropdown
  */
  useEffect(()=> {
    DOMUtils.loadThemeCssFile(iframeRef, previewState.theme.src);
  }, [previewState.theme]);


  /*
  Triggers when iframe is ready
  */
  useEffect(() => {
    const body = DOMUtils.getIframeBody(iframeRef);
    body.style.opacity = 0;
    DOMUtils.loadDefaultFiles(iframeRef);
    if (!themeBuilder) {
      DOMUtils.loadThemeCssFile(iframeRef, previewState.theme.src);
    } else {
      DOMUtils.loadThemeCssFile(iframeRef, themeGlobals.getTheme().src, ()=>{
        updateThemeGlobalsIframe();
        updateThemeVarsInIframe();

        updateThemeGlobalsWithUserVars()

        //update preview context
        //setIframeLoaded(true);
      });
    }

    //Handler to stop the navigation inside the iframe
    iframeRef.current.contentDocument.addEventListener('click', (e)=>{
      //not used .closest('a:not([href$="#"])') to reduce the closest traverse
      const a = e.target.tagName !== 'A' ? e.target.closest('a') : e.target;
      if (a && a.href !== '') {
        e.preventDefault();
        console.log('Navigation stopped: '+a.href);
      }
    });


  }, [iframeRef])


  /*
  Triggers when iframe is ready
  */
  useEffect(() => {
    if (previewState.view.type !== iframeState.view.type || previewState.view.isLandscape !== iframeState.view.isLandscape) {
      setIframeState({
        view: previewState.view,
        zoom: iframeState.zoom
      });
      adjustIframeZoom();
    }
  }, [previewState.view])

  /*
  Triggers when iframe is ready
  */
  useEffect(() => {
    DOMUtils.toggleRTL(iframeRef, previewState.isRTL);
  }, [previewState.isRTL])


  /*
  Triggers when fitToWindow state is changed
  */
  useEffect(()=>{
    adjustIframeZoom();
  }, [fitToWindow])


  /**
   * Fetches the Theme variables (user changed variables)
   * and loads them on iFrame. This happens on the first load
   */
  const updateThemeVarsInIframe = () => {
    const userVars = themeVariables.getAllVariables();
    Object.keys(userVars).map((varKey)=>{
      const varsObj = userVars[varKey];
      const firstKey = Object.keys(varsObj.vars)[0];
      const cssRule = getCSSRuleFromTheme(varsObj.selector, firstKey);
      if (cssRule) {
        Object.keys(varsObj.vars).map((key)=>{
          cssRule.style.setProperty(key, varsObj.vars[key]);
        })
      }
    });
  }

  /**
   * Loads the themeGlobals (colors) on the iFrame.
   * This happens on the first load
   */
  const updateThemeGlobalsIframe = () => {
    const colorsData = themeGlobals.getColorsDropdownData();
    let cssRule = getCSSRuleFromTheme(':root', '--primary-color')
    colorsData.map((color)=> {
      if (cssRule) {
        cssRule.style.setProperty(color.key, color.value);
      }
    });
  }

  /**
   * Updates the themeGlobals colors based on the theme variables.
   * This is required to maintain the colors dropdown with the latest
   * changes.
   */
  const updateThemeGlobalsWithUserVars = () => {
    const userVars = themeVariables.getAllVariables();
    let colorVars = userVars['color-system'];
    colorVars = colorVars ? colorVars.vars : {}
    themeGlobals.updateColorsDropdownData(colorVars);
  }

  /**
   * Adjusts the iFrame zoom based on the available height
   */
  const adjustIframeZoom = () => {
    const ifrmParent = iframeRef.current.parentElement;
    const ifrmBody =  DOMUtils.getIframeBody(iframeRef);

    let zoomLevel = 1;

    if (fitToWindow && previewState.view.type !== View.DESKTOP) {

      const ifrmHeight = deviceSizes[previewState.view.type][previewState.view.isLandscape ? 'width' :'height'];
      const ifrmMainWrapheight = ifrmParent.parentElement.offsetHeight;
      zoomLevel = Math.min(ifrmMainWrapheight/ifrmHeight, 1);

      ifrmParent.style.transform = `scale(${zoomLevel})`;
      ifrmBody.style.zoom = 1;
      ifrmParent.style.zoom = 1;

    } else {
      ifrmParent.style.transform = 'none';
      ifrmParent.style.zoom = 'normal';
      ifrmBody.style.zoom = 'normal';
    }


    setIframeState({
      view: {
        type: previewState.view.type,
        isLandscape: previewState.view.isLandscape
      },
      zoom: Math.round(zoomLevel * 100).toFixed(0)
    });
  }

  /*
    To vertically center the iPad/mobile screens when fit to width
    is on. Interestingly, when transform:scale is applied, it will
    not impact the width and height. For ex: 200x200 will be 200x200
    even if you scale it down by 0.5. in this case, there will be a
    vertical scroll. We are already applying overflow:hidden, to get
    the view inside the viewport, following code is used.
  */
  useEffect(()=> {
    if (iframeState.type !== View.DESKTOP) {
      iframeRef.current.parentElement.scrollIntoView({block: "start", inline: "center"})
    }
  },[iframeState])

  /**
   * Gets the rendered HTML from the component object and
   * Renders the HTML into the iFrame
   * @param {[]} knobsets
   */
  const refreshIframe = (knobsets = null) => {
    const ifrmBody = DOMUtils.getIframeBody(iframeRef);
    let html;

    //had to put this in try/catch to avoid knobs error
    try {
      if (!knobsets) {
        html = appState.component.getDefaultHTML();
      } else {
        html = appState.component.getDecodedHTMLFromKnobSets(knobsets)
      }
      ifrmBody.innerHTML = html;
      //Reload the scripts if the HTML has js component
      if (html.indexOf('data-js-component') > -1 || html.indexOf('data-component') > -1) {
        console.log('reloaded scripts');
        loadComponentsJS();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Method to load/reload the components JS into this iFrame.
   * This is required after the HTML change, as the JS has to
   * initiated for the newly added elements.
   */
  const loadComponentsJS = () => {
    setTimeout(()=>{
      DOMUtils.reloadComponentsJSFile(iframeRef);
    }, 100)
  }

  /**
   * Theme name change will be applied on themeGlobals
   * @param {string} newThemeName
   */
  const handleOnThemeNameChange = (newThemeName) => {
    themeGlobals.setThemeName(newThemeName);
  }

  /**
   * Method to load the custom pages (Color System/Typography/Shadows/
   * spacings) in the preview area.
   * @returns component
   */
  const renderCustomPage = () => {
    const Component = appState.component && appState.component.page;
    if (Component) {
      return <Component />
    }
  }


  return (
    <div className={`stb-preview ${className ? className : ''} ${loaded?'show':''} ${appState.isFullscreen ? 'stb-fullscreen':''} ${themeBuilder ? 'stb-theme-builder':''}`}>
          <TopNav
            className={className ? 'stb-u-tr-radius' : ''}
            themesMenu={!themeBuilder}
            share={!themeBuilder && !appState.isPreview}
            themeName={themeBuilder ? themeGlobals.getTheme().name : ''}
            onThemeNameChange={handleOnThemeNameChange}
            hideFullscreen={appState.isPreview}
            hideRTL={!themeBuilder}
            hideViews={customPage}
          />
          <div className={`stb-iframe-wrap ${iframeState.view.type} ${iframeState.view.isLandscape ? 'landscape' : ''} ${iframeState.zoom < 100 ? 'no-scroll':''}`}>
            {iframeState.view.type !== View.DESKTOP && <div className="stb-iframe-fit-box-wrap">
              <label className="stb-iframe-fit-box">
                <span>Fit to Window</span>
                <span className="checkbox"><input type="checkbox" checked={fitToWindow} onChange={()=>setFitToWindow(!fitToWindow)}  /></span>
                <span className="zoom">Zoom: {iframeState.zoom}%</span>
                <span className="view">{`${iframeState.view.type}: ${iframeState.view.isLandscape ? 'Landscape' : 'Portrait'}`}</span>
              </label>
            </div>}
            <div className="stb-image-frame">
                {themeBuilder && loaded && customPage && renderCustomPage()}
                <iframe id="stb-iframe" ref={iframeRef} className={`${customPage ? 'hide': ''}`}></iframe>
                <img className={`${iframeState.view.type === View.TABLET ? 'show':'hide'} `} src="/public/images/global/ipad-frame.png" alt="Tablet" />
            </div>
          </div>
          {!customPage && !hideUtilityBox && <UtilityBox hideHTMLTab={themeBuilder} hideValidatorTab={true} onChange={()=>adjustIframeZoom()} />}
    </div>
  )
})

Preview.defaultProps = {
  themeBuilder: false
}

Preview.propTypes = {
  themeBuilder: PropTypes.bool
}

export default Preview;
