const defaultCSSFiles = ['clientlib-commons/commons.css','clientlib-site/site.css'];
const defaultJSFiles = ['commons.js', 'clientlib-site/commons.js', 'clientlib-site/site.js'];
const compJSFile = 'clientlib-sb-components/sb-components.js';
const compCSSFile = 'clientlib-sb-components/sb-components.css';
const compCSSFileRTL = 'clientlib-sb-components-rtl/sb-components-rtl.css';


/**
 * Returns Iframe head element
 * @param {iframeDomElement} iframeRef
 * @returns iframeHeadDomElement
 */
const getIframeHead = (iframeRef) => {
  return iframeRef.current.contentDocument.head;
}

/**
 * Returns Iframe body element
 * @param {iframeDomElement} iframeRef
 * @returns iframeBodyDomElement
 */
const getIframeBody = (iframeRef) => {
  return iframeRef.current.contentDocument.body;
}

/**
 * Utility method to create Link element
 * @param {string} src
 * @param {string} id
 * @returns LinkElement
 */
const createLinkTag = (src, id) => {
  let link = document.createElement('link');
  link.href = src;
  link.id = id;
  link.rel="stylesheet";
  return link;
}

/**
 * Utility method to create script element
 * @param {string} src
 * @param {string} id
 * @returns ScriptElement
 */
const createScriptTag = (src, id) => {
  let script = document.createElement('script');
  script.src = src;
  script.id = id;
  script.type="text/javascript";
  return script;
}


/**
 * Utility method to load the default CSS files into Iframe
 * @param {iframeReference} iframeRef
 */
const loadDefaultCSSfiles = (iframeRef) => {
  defaultCSSFiles.map((cssFile, idx)=>{
    const link = createLinkTag(cssFile,'def-css-'+idx);
    getIframeHead(iframeRef).appendChild(link);

  });

}
/**
 * Utility method to load the component css file into Iframe
 * @param {iframeReference} iframeRef
 * @param {string} compCssFile
 */
const loadCompCSSFile = (iframeRef, compCssFile) => {
  const compLink = createLinkTag(compCssFile,'comp-css');
  getIframeHead(iframeRef).appendChild(compLink);
}

/**
 * Utility method to load the default JS files into Iframe
 * @param {iframeReference} iframeRef
 */
const loadDefaultJSfiles = (iframeRef) => {
  defaultJSFiles.map((jsFile, idx)=>{
    const script = createScriptTag(jsFile,'def-js-'+idx);
    getIframeHead(iframeRef).appendChild(script);
  });
}


/**
 * Loads Default JS and CSS files into the Iframe
 * @param {iframeReference} iframeRef
 */
const loadDefaultFiles = (iframeRef) => {
  loadDefaultCSSfiles(iframeRef);
  loadDefaultJSfiles(iframeRef);
}


/**
 * Loads the provided theme file into Iframe
 * This method will replace the theme file
 * @param {iframeReference} iframeRef
 * @param {string} themeFileSrc
 */
const loadThemeCssFile = (iframeRef, themeFileSrc, callback) => {
  const ifrmHead = getIframeHead(iframeRef);
  const oldThemeLink = ifrmHead.querySelector('#theme-css');
  const link = createLinkTag(themeFileSrc, 'theme-css');
  const compCss = ifrmHead.querySelector('#comp-css');
  if (callback) {
    link.onload = callback;
  }

  ifrmHead.insertBefore(link, compCss);
  if (oldThemeLink) {
    setTimeout(()=>{
      ifrmHead.removeChild(oldThemeLink);
    }, 100);
  }
}

/**
 * Reloads the component JS file on iframe
 * @param {iframeRef} iframeRef
 */
const reloadComponentsJSFile = (iframeRef) => {
  const ifrmBody = getIframeBody(iframeRef);
  const compScript = ifrmBody.querySelector('#comp-js');
  if (compScript) {
    ifrmBody.removeChild(compScript);
  }
  const script = createScriptTag(compJSFile,'comp-js');
  ifrmBody.appendChild(script);
}

/**
 * Loads RTL/LTR component CSS file into the Iframe
 * @param {iframeRef} iframeRef
 * @param {bool} isRTL
 */
const toggleRTL = (iframeRef, isRTL) => {
  const ifrmHead = getIframeHead(iframeRef);
  const compStyles = ifrmHead.querySelector('#comp-css');
  loadCompCSSFile(iframeRef, isRTL ? compCSSFileRTL : compCSSFile);
  iframeRef.current.contentDocument.querySelector('html').setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  if (compStyles) {
    requestAnimationFrame(()=>{
      ifrmHead.removeChild(compStyles);
    })
  }
}

export default {
  getIframeBody,
  getIframeHead,
  loadDefaultFiles,
  loadThemeCssFile,
  reloadComponentsJSFile,
  toggleRTL
}
