import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import './UtilityBox.scss'
import { AppContext } from '../../context/AppContext';
import { getAvailableTabs, getTabPanel } from './Tabs/Tabs';


const UtilityBox = (props) => {

  const {onChange} = props;
  const defShow = localStorage.getItem('utilityBoxShow') === 'false' ? false : true;
  const availableTabs = getAvailableTabs(props);
  const {appState} = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Knobs');
  const [showUtilityBox, setShowUtilityBox] = useState(defShow);

  useEffect(()=>{
    onChange && onChange();
  }, [])

  const handleTabClick = (tab) => {

    if (tab === activeTab) {
      setShowUtilityBox(!showUtilityBox)
    } else {
      setShowUtilityBox(true);
    }

    setActiveTab(tab);
  }

  useEffect(()=>{
    if (!showUtilityBox) {
      localStorage.setItem('utilityBoxShow', showUtilityBox);
    }
  },[showUtilityBox])

  useEffect(()=>{
    if (appState.isFullscreen || appState.isPreview) {
      setShowUtilityBox(false);
    }
  },[appState.isFullscreen, appState.isPreview])



  return (
    <>
      {appState.component && <div onTransitionEnd={()=>{onChange && onChange()}} className={`stb-utility-box ${ !showUtilityBox ? 'min' : '' }`}>
        <span className="stb-restore-btn" title="Minimize/maximize utility box" onClick={()=>setShowUtilityBox(!showUtilityBox)}>
          <i className={`mdi ${!showUtilityBox?'mdi-chevron-up':'mdi-chevron-down'}`}></i>
        </span>
        <ul className="stb-tabs">
          {
            availableTabs.map((tab, idx) => {
              return <li className={`stb-tabs__tab ${tab === activeTab ? 'active': ''}`} key={idx} onClick={()=>handleTabClick(tab)}>{tab}</li>
            })
          }
        </ul>
        {showUtilityBox && <div className="stb-tabs-panel">
            { getTabPanel(activeTab) }
        </div>}
      </div>}
    </>
  )
}

UtilityBox.propTypes = {
  hideHTMLTab: PropTypes.bool,
  hideKnobsTab: PropTypes.bool,
  hideValidatorTab: PropTypes.bool
}

export default UtilityBox;
