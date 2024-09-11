import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import Icons from '../../models/Icons';
import { View } from '../../constants/View';
import { convertSVGImages } from '../../utils/Common';
import './Views.scss';

const Views = (props) => {
  const {defaultActiveView, disableDesktop, disableTablet, disableMobile, onChange} = props;
  const [activeId, setActiveId] = useState(defaultActiveView === 'default' ? View.DESKTOP : defaultActiveView);
  const handleViewIconClick = (id) => {
    const view  = id === View.DESKTOP ? 'default' : id;
    setActiveId(id);
    onChange && onChange(view);
  }

  useEffect(()=>{
    convertSVGImages('img');
  }, [])

  return (
    <div className="stb-views">
      <IconButton
        id={View.DESKTOP}
        icon={Icons.Desktop}
        text="Desktop"
        active={activeId === View.DESKTOP}
        onClick={handleViewIconClick}
        disabled={disableDesktop}
        medium={true}
      />
      <IconButton
        id={View.TABLET}
        icon={Icons.Tablet}
        text="Tablet"
        active={activeId === View.TABLET}
        onClick={handleViewIconClick}
        disabled={disableTablet}
        medium={true}
      />
      <IconButton
        id={View.MOBILE}
        icon={Icons.Mobile}
        text="Mobile"
        active={activeId === View.MOBILE}
        onClick={handleViewIconClick}
        disabled={disableMobile}
        medium={true}
      />
    </div>
  )
}

Views.defaultProps = {
  disableDesktop: false,
  disableMobile: false,
  disableTablet: false,
  defaultActiveView: 'desktop'
}

Views.propTypes = {
  defaultActiveView: PropTypes.string,
  disableDesktop: PropTypes.bool,
  disableMobile: PropTypes.bool,
  disableTablet: PropTypes.bool,
  onChange: PropTypes.func
}

export default Views;
