import React from "react";

const RtfDisplay = ({
  html="",
  className=""
}) => (
  <fieldset className={`form-group similac-form-group ${className}`} dangerouslySetInnerHTML={{__html:html}} />
);

export default RtfDisplay;
