import React from "react";

// pulls in the markup of an experience fragment by selecting the ID, then renders the markup
export const XFDisplay = (props) => {
  const {xfid} = props;
  const el = document.getElementById(xfid)?.cloneNode(true);
  
  if (!el) {
    return;
  }
  if (el.querySelectorAll) {
    // remove ID to prevent duplicate IDs
    el.setAttribute("id", "");
  }
  
  const xfDisplay = (<div dangerouslySetInnerHTML={ {__html: el.innerHTML} } />);
  
  return xfDisplay;
}