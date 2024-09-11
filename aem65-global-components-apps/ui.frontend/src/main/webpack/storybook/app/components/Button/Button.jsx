import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const {size, fullWidth, secondary, disabled, label, loading, onClick} = props;

  const handleOnClick = (e) => {
    if (loading) {
      return;
    }
    onClick && onClick(e);
  }

  return (
   <button className={`stb-button ${loading ? 'loading' :''}`} disabled={disabled} data-full-width={fullWidth} data-size={size} data-secondary={secondary} onClick={handleOnClick}>{label}</button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}


export default Button;
