import React, { useState, useEffect } from "react";

const UnconvertedNonDo = props => {
  let { switchToDigitalTitle, switchToDigitalDesc, switchToDigitalBtn } = props;

  return (
    <>
      <div className="non-do-with-no-offer">
        <div className="non-do-header">{switchToDigitalTitle}</div>
        <div className="non-do-para-one" dangerouslySetInnerHTML={{ __html: switchToDigitalDesc }}></div>
        <div className="non-do-btn">
          <button type="button" className="btn btn-primary col-10 col-lg-8 non-do-btn" data-gtm="rewards|click|pwa_switch-to-digital_go-digital" onClick={() => props.confirmCouponPopup()} >{switchToDigitalBtn}</button>
        </div>
      </div>
    </>
  );
};

export default UnconvertedNonDo;

