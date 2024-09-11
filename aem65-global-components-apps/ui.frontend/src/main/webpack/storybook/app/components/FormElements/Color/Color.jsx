import React, {Fragment, useContext, useEffect, useState, useRef} from 'react';
import { PreviewContext } from '../../../context/PreviewContext';
import { getDefaultActiveView, getFinalValue } from '../../../utils/Common';
import Views from '../../Views';
import './Color.scss';

const Color = (props) => {
  const {config, onChange, changedVariables} = props;
  const {previewState} = useContext(PreviewContext);
  const colorsData = previewState.newTheme.getColorsDropdownData();
  const ref = useRef();

  const [selectedColor, setSelectedColor] = useState({
    default: config.default ? getFinalValue(config.default, changedVariables) : '',
    mobile: config.mobile ? getFinalValue(config.mobile, changedVariables) : '',
    tablet: config.tablet ? getFinalValue(config.tablet, changedVariables) : ''
  });

  const [activeView, setActiveView] = useState(getDefaultActiveView(config));
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
        document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  useEffect(()=>{
    if (show && ref && ref.current) {
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
  }, [show]);


  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
    }
  }

  const handleColorSelect = (colorKey, color={}) => {
    const selectedVal = `var(${colorKey})`;
    setShow(false);
    setSelectedColor({...selectedColor, [activeView]: selectedVal});
    onChange && onChange(config[activeView].key, selectedVal, color);
  }

  const handleKeyEvent = (e) =>  {
    switch(e.key) {
      case 'Enter':
        setShow(!show);
        return;
      case 'Escape':
        setShow(false);
        return;
    }
  }

  const handleColorKey = (e, colorKey, color) => {
    switch(e.key) {
      case 'Enter':
        handleColorSelect(e, colorKey, color)
        return;
      case 'Escape':
        setShow(false);
        return;
    }
  }

  const getSelectedColor = () => {
    let foundColor = {
      label: '',
      group: '',
      value: ''
    };
    colorsData.some((color)=>{
      if (selectedColor[activeView].indexOf(color.key) > -1) {
        foundColor = color;
        return true;
      }
    })

    if (foundColor.label === '' ){
      colorsData.some((color)=>{
        if (selectedColor[activeView].indexOf(color.value.toLowerCase()) > -1) {
          foundColor = color;
          return true;
        }
      })

      // The color was found from direct value, hence force the component
      // to register the change with the matched CSS Variable
      if (foundColor.label !== '' && config[activeView].key!=='dummy') {
        setTimeout(()=>{
          handleColorSelect(foundColor.key);
        }, 100);
      }
    }

    return foundColor;
  }

  const renderSelected = () => {
    const selColor = getSelectedColor();
    return (
      <div className="stb-color__selected" onKeyUp={handleKeyEvent} onClick={()=>{setShow(!show)}} tabIndex="0">
        <span className="stb-color__selected-group">{selColor.group}</span>
        <span className="stb-color__selected-text">{selColor.label}</span>
        <div className="stb-color__selected-swatch" style={{backgroundColor: selColor.value}}></div>
      </div>
    )
  }

  const renderColorDropdown = () => {
    let group = '';
    return (
      <div className='stb-color__dropdown'>
      {
        colorsData.map((color) => {
          const createHeader = group !== color.group;
          group = color.group;
          return (<Fragment key={color.key}>
            {createHeader && <label className="stb-color__header">{color.group}</label>}
            <div tabIndex="0" className={`stb-color__li ${selectedColor[activeView].indexOf(color.key) > -1 ? 'active': ''}`} onKeyUp={(e)=>handleColorKey(e, color.key, color)} onClick={()=>handleColorSelect(color.key, color)}>
              <div className="stb-color__swatch" style={{backgroundColor: color.value}}></div>
              <span className="stb-color__text">{color.label}</span>
            </div>
          </Fragment>)

        })
      }
      </div>
    );
  }

  return (
    <div className={`stb-color ${show ? 'show':''}`} ref={ref}>
      {config.isResponsive && <Views
          onChange={(view)=>setActiveView(view)}
          defaultActiveView={activeView}
          disableDesktop={!config.default}
          disableMobile={!config.mobile}
          disableTablet={!config.tablet}
        />}
      {renderSelected()}
      {show && renderColorDropdown()}
    </div>
  )
}

export default Color;
