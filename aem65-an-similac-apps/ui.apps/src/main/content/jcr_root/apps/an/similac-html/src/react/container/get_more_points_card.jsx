import React, { useState, useEffect } from "react";
import QRcodeScanner from "../components/QRcodeScanner";

const GetMorePointsCard = props => {
  let { scanModuleHeading, scanModuleDesc, scanModuleImage, scanButtonLabel, scanButtonClass, scanFacingMode, scanGtm } = props;

  return (
    <>
      <div className="row mx-0 offer-cards-wrapper">
        <div className="card-offer-wrap col-12 col-lg-4 ">
          <div className="pwa-get-more-offer-container">
            <div className="pwa-get-more-offer-card-left col-7">
              <div>
                <h4 className="pwa-get-more-offer-card-heading" dangerouslySetInnerHTML={{ __html: scanModuleHeading }}>
                </h4>
              </div>
              <div className="pwa-get-more-offer-card-para" dangerouslySetInnerHTML={{ __html: scanModuleDesc }}>
              </div>
              <div className="qr-camera"><QRcodeScanner scanButtonLabel = {scanButtonLabel} scanButtonClass = {scanButtonClass} scanFacingMode={scanFacingMode} scanGtm={scanGtm}/></div>
            </div>
            <div className="pwa-offer-card-right" >
              <img src={scanModuleImage} className="product-img get-more-point-img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetMorePointsCard;

