import React, { useState, useEffect } from "react";

const ConvertedDo = props => {
  let { congratsTitle, congratsDesc1, congratsDesc2, congratsDisclaimer } = props;

  return (
    <>
    <div className="non-do-with-no-offer">
            <div className="non-do-header">{congratsTitle}</div>
            <div className="non-do-para-one-congrats" dangerouslySetInnerHTML={{ __html: congratsDesc1 }}></div>
            <div className="non-do-para-two-congrats" dangerouslySetInnerHTML={{ __html: congratsDesc2 }}></div>
            <div className="non-do-footer" dangerouslySetInnerHTML={{ __html: congratsDisclaimer }}></div>
          </div>
    </>
  );
};

export default ConvertedDo;

