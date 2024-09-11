import React, { useState,useRef } from "react";
import PropTypes from "prop-types";

export const Accordion = (props) => {
  const {
    text,
    anchorLink,
    onClick,
    className,
    startOpen,
    controlType,
    items,
    ...rest
  } = props;

  const [clicked,setClicked] = useState(startOpen);
  const {content} = useRef();
  const handleToggle = () => {
    setClicked((prev)=> !prev);
  };

  const renderControl = () => {
      if (controlType == "arrow") {
          return <em className={`abt-icon abt-icon-${clicked ? "down" : "up"}-arrow`} aria-hidden="true">
          </em>
      } else {
          return clicked ? "-" : "+";
      }
  };

  return (
    
      <div
      className={`hide-show ${className}`}

     

      >
          <div className="accordion_button" onClick={handleToggle}>
                <span className="heading">
                    {text}
                </span>
                <span className="control">
                    {renderControl()}
                </span>
          </div>

          <div
              className={`items_wrapper ${clicked ? '' : 'd-none'}`}
              ref={content}>
              <div className="items">{items}</div>
          </div>

      </div>    
  );
};

Accordion.defaultProps = {
  onClick: null,
  className: null,
  controlType: "plus",
  startOpen: false,
  text: "",
};

Accordion.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  controlType: PropTypes.string,
  startOpen: PropTypes.bool,
  items: PropTypes.element,
  onClick: PropTypes.func,
};

export default Accordion;
