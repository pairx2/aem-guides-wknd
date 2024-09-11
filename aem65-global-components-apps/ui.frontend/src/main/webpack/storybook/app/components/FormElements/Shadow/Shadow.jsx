import React, { useContext, useState, useRef, useEffect } from 'react';
import { PreviewContext } from '../../../context/PreviewContext';
import { getDefaultActiveView, getFinalValue } from '../../../utils/Common';
import './Shadow.scss';

const Shadow = (props) => {
  const {config, onChange, changedVariables} = props;
  const {previewState} = useContext(PreviewContext);
  const shadowsData = previewState.newTheme.getShadowsDropdownData();
  const ref = useRef();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedShadow, setSelectedShadow] = useState({
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

      if (rects.top + rects.height + 200 > rightRailRect.top + rightRailRect.height) {
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

  const handleShadowChange = (shadow) => {
    const selectedVal = `var(${shadow.key})`;
    setSelectedShadow({...selectedShadow, [activeView]: selectedVal});
    onChange && onChange(config[activeView].key, selectedVal);
    setShowDropdown(false);
  }
  let group = '';

  const getSelectedShadow = ()=>{
    const selShadow = selectedShadow[activeView];
    const found = shadowsData.find((shadow) => selShadow.indexOf(shadow.key) > -1);
    if (!found) {
      return {
        label: '',
        key: ''
      }
    }
    return found;
  }

  const selectedShadowObj = getSelectedShadow();

  return (
    <div className={`stb-shadow ${showDropdown ? 'show':''}`} ref={ref} tabIndex="0">
      <div className="stb-shadow__selected" onClick={()=>setShowDropdown(!showDropdown)}>
        <span className="stb-shadow__text">{selectedShadowObj.label}</span>
        <i className="mdi mdi-chevron-down" aria-hidden="true"></i>
      </div>
      {showDropdown && <div className="stb-shadow__dropdown">
        {shadowsData.map((shadow, idx)=>{
          const createHeader = group !== shadow.group;
          group = shadow.group;
          return (
            <>
              {createHeader && <label className="stb-shadow__header">{shadow.group}</label>}
              <div
                key={idx}
                className={`stb-shadow__dropdown-item ${selectedShadowObj.key.indexOf(shadow.key)> -1 ? 'active': ''}`}
                onClick={()=>handleShadowChange(shadow)}
              >
                {shadow.label}
              </div>
            </>
          )
        })}
      </div>}
    </div>
  )
}

export default Shadow;
