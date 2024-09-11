
  export const deepObjectCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  export const isLocalhost = () => {
    return window.location.hostname === 'localhost';
  }

  export const objectsEqual = (o1, o2) => {
    Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => o1[p] === o2[p]);
  }

  export const convertSVGImages = (query, callback) => {
    const images = document.querySelectorAll(query);

    images.forEach(image => {
        fetch(image.src)
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
                if (svg) {
                  const title = svg.querySelector('title');

                  if (title && image.alt) {
                    title.innerHTML = image.alt
                  }
                  if (image.id) svg.id = image.id;
                  if (image.className) svg.classList = image.classList;
                  if (image.parentNode) image.parentNode.replaceChild(svg, image);
                }

            })
            .then(callback)
            .catch(error => console.error(error))
    });
};

export const sentenceCase = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

export const objectValueFromPath = (object, path) => {
  if (!path || typeof path !== 'string') {
    return;
  }
  const pathVals = path.split('.')
  const len = pathVals.length;
  let idx = 0;
  while(idx < len) {
    object = object[pathVals[idx]]
    if (!object) {
      return;
    }
    idx++
  }
  return object;
}

export const getDefaultActiveView = (config) => {
  return config.default && 'default' ||  config.tablet && 'tablet' || config.mobile && 'mobile';
}


const getTRBLValuesMultiVar = (data, changedVariables) => {
  const final = {};
  ['top','right','bottom','left'].map((pos)=>{
     if (data[pos]) {
       final[pos] = getFinalValue(data[pos], changedVariables);
     }
  })
  return final;
}

export const getTRBLValues = (data, isMultiVar, changedVariables) => {
  const computedValues = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  if (!data) {
    return computedValues;
  }

  if (isMultiVar) {
    return getTRBLValuesMultiVar(data, changedVariables);
  }

  const trbl = getFinalValue(data, changedVariables).trim().split(' ');

  switch(trbl.length) {
    case 1:
        computedValues.top = trbl[0];
        computedValues.right = trbl[0];
        computedValues.bottom = trbl[0];
        computedValues.left = trbl[0];
        break;
      case 2:
        computedValues.top = trbl[0];
        computedValues.bottom = trbl[0];
        computedValues.right = trbl[1];
        computedValues.left = trbl[1];
        break;
      case 3:
        computedValues.top = trbl[0];
        computedValues.right = trbl[1];
        computedValues.bottom = trbl[2];
        computedValues.left = trbl[1];
        break;
      case 4:
        computedValues.top = trbl[0];
        computedValues.right = trbl[1];
        computedValues.bottom = trbl[2];
        computedValues.left = trbl[3];
        break;
  }

  return computedValues;

}



export const getCSSRuleFromTheme = (selector, firstCSSVarKey='') => {
  let cssRule;
  const iframeRef = document.querySelector('#stb-iframe');

  if (iframeRef) {
    const head = iframeRef.contentDocument.head;
    const styles = head.querySelector('#theme-css');

    try {
      if (styles && styles.sheet && styles.sheet.cssRules) {
        Array.from(styles.sheet.cssRules).some((rule)=> {
          if(rule.selectorText === selector) {
            if (selector === ':root') {
              if (rule.cssText.indexOf(firstCSSVarKey) > -1) {
                cssRule = rule;
                return true;
              }
            } else {
              cssRule = rule;
              return true;
            }
          }
        })
      }
    } catch(e) {
      //do nothing;
    }
  }

  return cssRule;

}

export const getBorderValues = (obj, changedVariables) => {
  const border = getFinalValue(obj, changedVariables);

  if (border && typeof border === 'string') {
    const borderVals = border.split(' ');

    if (borderVals.length < 3) {
      const found = border.match(/(#+\w{6}|#+\w{3}|--[^\)|$]+)/g);
      if (found && found.length > 0) {
        return {
          width: '1px',
          style: 'solid',
          color: found[0]
        }
      }
    }

    return {
      width: borderVals[0] || '',
      style: borderVals[1] || '',
      color: borderVals[2] || ''
    }
  }

  return {
    width: '',
    style: '',
    color: ''
  };

}


export const getFinalValue = (obj, changedVariables) => {
  if(changedVariables && changedVariables[obj.key]) {
    return changedVariables[obj.key];
  }
  return obj.value;
}


