import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import ThemesDropdown from '../ThemesDropdown';
import { convertSVGImages } from '../../utils/Common';
import Toolbar from '../Toolbar';
import IconButton from '../IconButton/IconButton';
import Icons from '../../models/Icons';
import './TopNav.scss';
import ThemeName from '../ThemeName/ThemeName';
import ShareModal from '../Modals/ShareModal';

const TopNav = (props) => {
  const {className, themesMenu, themeName, share, onThemeNameChange, hideFullscreen, hideRTL, hideViews} = props;
  const isThemeNameEdit = (themeName !== '');
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(()=>{
    convertSVGImages('img');
  },[hideFullscreen, hideRTL, hideViews]);

  const handleShareClick = (id) => {
    setShowShareModal(true)
  }
  return (
    <>
      <div className={`stb-top-nav ${className ? className : ''}`}>
        {isThemeNameEdit && <ThemeName className="stb-top-nav__theme-name" name={themeName} onChange={onThemeNameChange} />}
        <div className={`${isThemeNameEdit ? 'stb-top-nav-full':''}`}>
          <Toolbar hideFullscreen={hideFullscreen} hideRTL={hideRTL} hideViews={hideViews}  />
        </div>
        {themesMenu && <ThemesDropdown />}
        {share && <div className="stb-top-nav__share">
          <IconButton id="share" text="share" onClick={handleShareClick} className="stb-flex-end" icon={Icons.Share} />
        </div>}
      </div>
      <ShareModal show={showShareModal} onClose={()=>setShowShareModal(false)} />
    </>
  )
};

TopNav.defaultProps = {
  themesMenu: true,
  share: true,
  hideFullscreen: false,
  hideRTL: false,
  hideViews: false
}

TopNav.propTypes = {
  className: PropTypes.string,
  themesMenu: PropTypes.bool,
  themeName: PropTypes.string,
  share: PropTypes.bool,
  onThemeNameChange: PropTypes.func,
  hideFullscreen: PropTypes.bool,
  hideRTL: PropTypes.bool,
  hideViews: PropTypes.bool
}



export default TopNav;
