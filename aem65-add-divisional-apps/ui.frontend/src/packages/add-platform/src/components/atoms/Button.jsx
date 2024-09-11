import React from "react";
import PropTypes from "prop-types";

export const Button = (props) => {
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
      className={`${className} a-button a-button--${buttonSize} a-button--${buttonStyle} button a-button--icon-${iconPosition}`}
    >
      {anchorLink && (
        <a className={`btn ${buttonClasses}`} href={anchorLink} {...rest}>
          {iconClass && <i className={`abt-icon abt-icon-${iconClass}`} />}
          <span>{text}</span>
        </a>
      )}
      {!anchorLink && (
        <button
          className={`btn ${buttonClasses}`}
          type="button"
          onClick={onClick}
          disabled={buttonClasses.split(" ").pop() === "disabled" ? true : false}
          {...rest}
        >
          {iconClass && <i className={`abt-icon abt-icon-${iconClass}`} />}
          <span>{text}</span>
        </button>
      )}
    </div>
  );
};

Button.defaultProps = {
  iconClass: null,
  iconPosition: null,
  buttonStyle: "primary",
  buttonSize: "md",
  buttonClasses: "",
  anchorLink: null,
  onClick: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  iconPosition: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonSize: PropTypes.string,
  buttonClasses: PropTypes.string,
  anchorLink: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
