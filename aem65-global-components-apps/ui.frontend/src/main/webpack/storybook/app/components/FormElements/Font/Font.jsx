import React, { useContext, useState, useRef, useEffect } from 'react';
import { PreviewContext } from '../../../context/PreviewContext';
import { getDefaultActiveView, getFinalValue } from '../../../utils/Common';
import './Font.scss';

const Font = (props) => {
  const {config, onChange, changedVariables} = props;
  const {previewState} = useContext(PreviewContext);
  const fonts = previewState.fonts;
  const ref = useRef();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFont, setSelectedFont] = useState({
    default: config.default ? getFinalValue(config.default, changedVariables) : '',
    mobile: config.mobile ? getFinalValue(config.mobile, changedVariables) : '',
    tablet: config.tablet ? getFinalValue(config.tablet, changedVariables) : ''
  });
  const [activeView, setActiveView] = useState(getDefaultActiveView(config));

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
        document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  useEffect(()=>{
    if (showDropdown && ref && ref.current) {
      const rects = ref.current.getClientRects()[0];
      const active = ref.current.querySelector('.active');
      const rightRail = ref.current.closest('.stb-right-rail');
      const rightRailRect = rightRail.getClientRects()[0];

      if (active) {
        const top = active.offsetTop;
        active.parentElement.scroll(0, top - 76);
      }

      if (rects.top + rects.height + 160 > rightRailRect.top + rightRailRect.height) {
        ref.current.classList.add('top')
      } else {
        ref.current.classList.remove('top')
      }
      ref.current.scrollIntoView({behavior: "smooth",'block':'nearest'});

    }
  }, [showDropdown]);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
    }
  }

  const handleFontChange = (font) => {
    setSelectedFont({...selectedFont, [activeView]: font.value});
    onChange && onChange(config[activeView].key, font.value);
    setShowDropdown(false);
  }


  const sanitizeFont = (font) => {
    font = font && font.split(',');
    if (font) {
      return font[0].toLowerCase().replace('"','');
    }
    return '';
  }

  const getSelectedFont = () => {
    const value = sanitizeFont(selectedFont[activeView]);

    const foundFont = fonts.find((font) => sanitizeFont(font.value) === value)
    if (!foundFont) {
      return fonts[0];
    }
    return foundFont;
  }

  const selFontObj = getSelectedFont();

  return (
    <div className={`stb-font ${showDropdown ? 'show':''}`} ref={ref} tabIndex="0">
      <div className="stb-font__selected" onClick={()=>setShowDropdown(!showDropdown)}>
        <span className="stb-font__text" style={{fontFamily:selFontObj.value}}>{selFontObj.label}</span>
        <i className="mdi mdi-chevron-down" aria-hidden="true"></i>
      </div>
      {showDropdown && <div className="stb-font__dropdown">
        {fonts.map((font, idx)=>{
          return (
            <div
              key={idx}
              className={`stb-font__dropdown-item ${font.value.indexOf(selFontObj.value)> -1 ? 'active': ''}`}
              style={{fontFamily: font.value}}
              onClick={()=>handleFontChange(font)}
            >
              {font.label}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default Font;
