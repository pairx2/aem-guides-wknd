import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/IconButton';
import Icons from '../../models/Icons';
import { PreviewContext } from '../../context/PreviewContext';
import { View } from '../../constants/View';
import { AppContext } from '../../context/AppContext';
import './Toolbar.scss';


const Toolbar = (props) => {
  const {hideFullscreen, hideRTL, hideViews} = props;
  const {previewState, setView, setRTL} = useContext(PreviewContext);
  const {appState, setFullscreen} = useContext(AppContext);
  const [activeId, setActiveId] = useState('desktop');

  useEffect(()=>{
    setActiveId(previewState.view.type)
  },[hideFullscreen, hideRTL, hideViews])



  const handleFullscreenIconClick = () => {
    setFullscreen(!appState.isFullscreen);
  }

  const handleViewIconClick = (id, isLandscape, isActive) => {
    setActiveId(id);
    setView({
      type: id,
      isLandscape
    });
  }

  const handleRTLIconClick = (id, isLandscape, isRTL) => {
    setRTL(isRTL);
  }


  return (
    <div className="stb-toolbar">
      {!hideFullscreen && <IconButton
        id="fullscreen"
        text="Fullscreen Enter"
        toggleText="Fullscreen Exit"
        icon={Icons.FullscreenEnter}
        toggleIcon={Icons.FullscreenExit}
        active={appState.isFullscreen}
        onClick={handleFullscreenIconClick}
      />}
      {!hideRTL && !hideViews && <IconButton
        id="rtl"
        text="show Right-to-Left"
        toggleText="show Left-to-Right"
        icon={Icons.RTL}
        active={previewState.isRTL}
        onClick={handleRTLIconClick}
        isSwitch={true}
      />}
      {!hideViews && <><IconButton
        id="desktop"
        text="Desktop"
        icon={Icons.Desktop}
        active={activeId === View.DESKTOP}
        onClick={handleViewIconClick}
       />
      <IconButton
        id="tablet"
        text="Tablet"
        icon={Icons.Tablet}
        rotateOnToggle={true}
        active={activeId === View.TABLET}
        onClick={handleViewIconClick}
      />
      <IconButton
        id="mobile"
        text="Mobile"
        icon={Icons.Mobile}
        rotateOnToggle={true}
        active={activeId === View.MOBILE}
        onClick={handleViewIconClick}
      />
      </>}
    </div>
  )
}

Toolbar.defaultProps = {
  hideFullscreen: false,
  hideRTL: false,
  hideViews: false
};

Toolbar.propTypes = {
  hideFullscreen: PropTypes.bool,
  hideRTL: PropTypes.bool,
  hideViews: PropTypes.bool
}

export default Toolbar;
