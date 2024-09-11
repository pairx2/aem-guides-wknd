import React from "react";
import PropTypes from "prop-types";

// modeled after Button atom. Styles are found in instruments & card scss files

export const IconButton = (props) => {
  const {
    text,
    iconClass,
    iconPosition,
    buttonStyle,
    buttonSize,
    buttonClasses,
    anchorLink,
    onClick,
    className,
    ...rest
  } = props;
  return (
    <div
      className={`${className} a-button button`}
    >
      {anchorLink && (
        <a className={`btn ${buttonClasses}`} href={anchorLink} {...rest}>
          {iconClass && <i className={`abt-icon abt-icon-${iconClass}`} />}
          <span>{text}</span>
        </a>
      )}
      {!anchorLink && (
        // btn
        <button
          className={`btn instrument-card-pin ${buttonClasses}`}
          type="button"
          onClick={onClick}
          {...rest}
        >
          {iconClass && <i className={`abt-icon abt-icon-${iconClass}`} />}
          <span>{text}</span>
        </button>
      )}
    </div>
  );
};

IconButton.defaultProps = {
  iconClass: null,
  iconPosition: null,
  buttonStyle: "primary",
  buttonSize: "md",
  buttonClasses: "",
  anchorLink: null,
  onClick: null,
};

IconButton.propTypes = {
  text: PropTypes.string,
  iconClass: PropTypes.string,
  iconPosition: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonSize: PropTypes.string,
  buttonClasses: PropTypes.string,
  anchorLink: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconButton;
