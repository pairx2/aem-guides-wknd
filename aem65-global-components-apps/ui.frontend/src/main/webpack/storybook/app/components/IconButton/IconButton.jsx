import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = (props) => {
  const {id, text, toggleText, icon, isSwitch, toggleIcon, onClick, active, className, small, noMargin, large, medium, disabled} = props;
  let rotateOnToggle = props.rotateOnToggle;

  const [isLandscape, setIsLandscape] = useState(false);
  const [isActive, setIsActive] = useState();

  rotateOnToggle = isSwitch ? false : rotateOnToggle;

  useEffect(()=>{
    if (!active) {
      setIsLandscape(false);
    }
    setIsActive(active);
  }, [active]);

  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    const highlighted = isSwitch ? !isActive : true;
    let rotated = false;
    if (isActive && rotateOnToggle) {
      setIsLandscape(!isLandscape);
      rotated = !isLandscape
    }
    setIsActive(isSwitch ? !isActive : true);
    onClick && onClick(id, rotated, highlighted, e);
  }

  const renderIcon = () => {
    return (
      <>
        <span className="icon-normal"><img src={icon} alt={text} /></span>
        {toggleIcon && <span className="icon-active"><img src={toggleIcon} alt={toggleText || text} /></span>}
      </>
    )
  }
  return (
    <button
      data-tooltip={isActive && toggleText ? toggleText : text}
      className={`stb-icon-button
          ${isActive ? 'active':''}
          ${isLandscape?'landscape':''}
          ${toggleIcon?'toggle':''}
          ${className ? className : ''}
          ${small ? 'stb-icon-button--small':''}
          ${large ? 'stb-icon-button--large':''}
          ${medium ? 'stb-icon-button--medium':''}
          ${noMargin ? 'stb-icon-button--no-margin':''}
          ${disabled ? 'stb-icon-button--disabled':''}
          `} onClick={handleClick}>
      {renderIcon()}
    </button>
  )
}

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  toggleText: PropTypes.string,
  icon: PropTypes.any.isRequired,
  rotateOnToggle: PropTypes.bool,
  isSwitch: PropTypes.bool,
  toggleIcon: PropTypes.any,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  noMargin: PropTypes.bool,
  disabled: PropTypes.bool
}

export default IconButton;
