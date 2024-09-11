import React from 'react'
import PropTypes from 'prop-types';
import Button from '../Button';
import './ThemeCard.scss';

const ThemeCard = (props) => {
  const {name, id, primaryColor, secondaryColor, tertiaryColor, description, thumbnail, className, isEditTheme, onClick} = props;

  const handleOnClick = (e) => {
    onClick && onClick ({
      id,
      name,
      isEditTheme
    });
  }

  return (
    <div className={`stb-theme-card ${className ? className : ''} ${isEditTheme ? 'edit' : ''}`}>
      <img src={thumbnail} alt={name} />
      <div className="stb-theme-card__title">
        <h2>{name}</h2>
        <span className="stb-theme-card__swatch" data-tooltip={`Color: ${primaryColor}`} style={{backgroundColor: primaryColor}}></span>
        <span className="stb-theme-card__swatch" data-tooltip={`Color: ${secondaryColor}`} style={{backgroundColor: secondaryColor}}></span>
        <span className="stb-theme-card__swatch" data-tooltip={`Color: ${tertiaryColor}`} style={{backgroundColor: tertiaryColor}}></span>
      </div>
      <p className="stb-theme-card__description">{description}</p>
      <div className="stb-theme-card__action">
        <Button label={isEditTheme ? 'Continue Editing' : 'Select'} fullWidth={isEditTheme} onClick={handleOnClick} />
      </div>
    </div>
  )
}

ThemeCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  tertiaryColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  isEditTheme: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default ThemeCard;
