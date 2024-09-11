import React, { useState, useEffect } from "react";

const UnconvertedNonDoFooter = props => {
  let { switchToDigitalDisclaimer } = props;

 
  return (
    <>
      <div>
        <div className="non-do-footer" dangerouslySetInnerHTML={{ __html: switchToDigitalDisclaimer }}></div>
      </div>
    </>
  );
};

export default UnconvertedNonDoFooter;